import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {InternetStatusProvider} from "../../providers/internet-status/internet-status";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Observable";
import { filter, map, reduce,  } from 'rxjs/operators'
import {RunPage} from "../run/run";
import {Schedule} from "../../models/schedule";

import debug from 'debug'

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
  @ViewChild('calendar') calendar;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams: NavParams, public InternetStatus : InternetStatusProvider, private userService : UserService) {
  }

  ionViewWillLoad() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadCalendar().subscribe(
        null,
        err => err.status != 401 && loader.dismiss().catch(err => console.error(err)),
        ()=>{
          loader.dismiss().catch(err => console.error(err))

          debug('calendar')('loaded')
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
    debug('calendar')(this)
    const mapRuns = (runs) => {
      return runs.map(run => ({
        title:run.title,
        start: run.beginAt,//run.startAt ? run.startAt : run.beginAt, //TODO ASk carrel
        end: run.endAt ? run.endAt : run.finishAt,
        url:run.id,
        color:"#3d3d3d"
      }))
    }
    const mapWorkingHours = (schedules) => {
      return schedules/*.sort((a:Schedule,b:Schedule)=>{
        return a.start_at < b.start_at && a.end_at < b.end_at ? -1 : 1
      })*/.map(sched => ({title:"",start:sched.startAt, end: sched.endAt, color:"#bebebe"}))
    }

    const mergeRequests = reduce((acc, next) => {
      return acc.concat(next)
    }, [])
    //get from cache
    let r1 = this.userService.myRuns().first().map(mapRuns);
    let r2 = this.userService.myWorkingHours().first().map(mapWorkingHours)
    //get from network
    let r3 = this.userService.myRuns().last().map(mapRuns);
    let r4 = this.userService.myWorkingHours().last().map(mapWorkingHours)

    let mergedFromCache = Observable.merge(r1,r2).pipe(mergeRequests)

    let mergedFromNetwork = Observable.merge(r3,r4).pipe(mergeRequests)

    // return mergedFromCache;
    return Observable.merge(mergedFromCache, mergedFromNetwork)/*.distinct((x)=>x.start.toISOString())*/.do(data => this.events = data).do(data => this.refreshCalendar())

  }

}
