import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {InternetStatusProvider} from "../../providers/internet-status/internet-status";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Observable";
import { filter, map, reduce,  } from 'rxjs/operators'
import {RunPage} from "../run/run";
import {Schedule} from "../../models/schedule";
import {Calendar, CalendarOptions} from '@ionic-native/calendar';
import {Run} from "../../models/run";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  calendarOptions:any = {
    editable: false,
    height: 'parent',
    fixedWeekCount : false,
    defaultView: "agendaDay",
    defaultDate: new Date(),
    eventLimit: true, // allow "more" link when too many events
    events:[]

  };
  public events : any[] = [];
  public syncing : boolean = false
  protected mapRuns = (runs) => {
    return runs.map(run => ({
      title:run.title,
      start: run.beginAt,//run.startAt ? run.startAt : run.beginAt, //TODO ASk carrel
      end: run.endAt ? run.endAt : run.finishAt,
      url:run.id,
      color:"#3d3d3d"
    }))
  }
  @ViewChild("sync-btn") syncBtn;
  @ViewChild('calendar') calendar;
  constructor(public navCtrl: NavController, private internetStatusProvider : InternetStatusProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl : AlertController, public navParams: NavParams, public InternetStatus : InternetStatusProvider, private userService : UserService, private calendarService: Calendar) {
  }

  ionViewWillLoad() {
    this.calendarService.listEventsInRange(new Date("01-02-2018"), new Date()).then(console.log).catch(console.log);

    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadCalendar().subscribe(
        null,
        err => err.status != 401 && loader.dismiss().catch(err => console.log(err)),
        ()=>{
          loader.dismiss().catch(err => console.log(err))

          console.log("FINISHED")
        }
      )
    })


  }
  refreshCalendar(){
    this.calendarOptions.events = this.events
    this.calendarOptions.eventClick = (calEvent) => {
      if(calEvent.url) {
        this.navCtrl.push(RunPage, {id: calEvent.url})
        return false
      }
    }
    this.calendar.fullCalendar( 'rerenderEvents' )
  }

  loadCalendar(){
    console.log(this)

    const mapWorkingHours = (schedules) => {
      return schedules/*.sort((a:Schedule,b:Schedule)=>{
        return a.start_at < b.start_at && a.end_at < b.end_at ? -1 : 1
      })*/.map(sched => ({title:"",start:sched.startAt, end: sched.endAt, color:"#bebebe"}))
    }

    const mergeRequests = reduce((acc, next) => {
      return acc.concat(next)
    }, [])
    //get from cache
    let r1 = this.userService.myRuns().first().map(this.mapRuns);
    let r2 = this.userService.myWorkingHours().first().map(mapWorkingHours)
    //get from network
    let r3 = this.userService.myRuns().last().map(this.mapRuns);
    let r4 = this.userService.myWorkingHours().last().map(mapWorkingHours)

    let mergedFromCache = Observable.merge(r1,r2).pipe(mergeRequests)

    let mergedFromNetwork = Observable.merge(r3,r4).pipe(mergeRequests)

    // return mergedFromCache;
    return Observable.merge(mergedFromCache, mergedFromNetwork)/*.distinct((x)=>x.start.toISOString())*/.do(data => this.events = data).do(data => this.refreshCalendar())

  }
  syncWithNativeCalendar(){
    if(!this.internetStatusProvider.getConnectionStatus())
    {
      this.toastCtrl.create({message: "You need to be online to sync your calendar", duration: 1500}).present()
      return;
    }
    this.syncing = true;
    // TODO make aéé variables here as settable in settings
    const calendarName = "Mes Courses Paléo"
    let calendarOptions : CalendarOptions = {
      calendarName:calendarName,
      firstReminderMinutes:10,

    };
    const w = (r:Run) => r.waypoints.length ? r.waypoints[0].nickname : null
    this.calendarService.hasReadWritePermission()
      .then(has => has ? true : this.calendarService.requestReadWritePermission())
      .then(()=>this.calendarService.deleteCalendar(calendarOptions.calendarName))
      .then(()=>console.debug("deleted calendar successfully"))
      .then(()=>this.calendarService.createCalendar(calendarOptions))
      .then(()=>console.debug("created calendar successfully"))
      .then(()=>this.calendarService.listCalendars())
      .then(calendarList => {
        //build calendar options
        console.log(calendarList)
        const r = calendarList.filter( c => c.name == calendarName)
        console.log(r)
        if(!r.length)
        {
          throw new Error("no calendars available")
        }
        calendarOptions.calendarId = r.filter( c => c.name == calendarName)[0].id
        console.log(this.calendarService.getCalendarOptions())

        //first delete events that are in cache
        this.userService.myRuns().first().do(r => console.log("deleteing my runs",r)).subscribe(
          (runs:Run[])=>{
            Promise.all(runs.map(run => this.calendarService.deleteEvent(run.title, w(run), "Courses Paléo", run.beginAt, run.finishAt)))
          },
          (err) => console.log(err),
          ()=>{
            this.userService.myRuns().last().do((r)=> console.log("creating my runs ",r)).concatMap(x => x).subscribe(
              (run:Run)=>{
                this.calendarService.createEventWithOptions(run.title, w(run), "Courses Paléo", run.beginAt, run.finishAt, calendarOptions )
              },
              (err)=>console.error(err),
              ()=> {
                setTimeout(()=>{
                  this.syncing = false
                  this.toastCtrl.create({
                    duration:1000,
                    showCloseButton: true,
                    message: "Sync successfull",
                  }).present()
                  //this.calendarService.openCalendar(new Date())
                },1000)//wait 1 second before presenting calendar
              }
            )
          }
        )

      })
      .catch((error)=>this.alertCtrl.create({
        title:" Error",
        subTitle: error,
        message: "We're sorry, we couldn't save your runs to your personnal calendar",
      }).present())
  }

}
