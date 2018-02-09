import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {InternetStatusProvider} from "../../providers/internet-status/internet-status";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Observable";

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
    height: 'parent',
    fixedWeekCount : false,
    defaultDate: '2018-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events:[]
    // events: [
    //   {
    //     title: 'All Day Event',
    //     start: '2018-09-01'
    //   },
    //   {
    //     title: 'Long Event',
    //     start: '2018-09-07',
    //     end: '2018-09-10'
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2018-09-09T16:00:00'
    //   },
    //   {
    //     id: 999,
    //     title: 'Repeating Event',
    //     start: '2018-09-16T16:00:00'
    //   },
    //   {
    //     title: 'Conference',
    //     start: '2016-09-11',
    //     end: '2018-09-13'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2016-09-12T10:30:00',
    //     end: '2018-09-12T12:30:00'
    //   },
    //   {
    //     title: 'Lunch',
    //     start: '2018-09-12T12:00:00'
    //   },
    //   {
    //     title: 'Meeting',
    //     start: '2018-09-12T14:30:00'
    //   },
    //   {
    //     title: 'Happy Hour',
    //     start: '2018-09-12T17:30:00'
    //   },
    //   {
    //     title: 'Dinner',
    //     start: '2018-09-12T20:00:00'
    //   },
    //   {
    //     title: 'Birthday Party',
    //     start: '2018-09-13T07:00:00'
    //   },
    //   {
    //     title: 'Click for Google',
    //     url: 'http://google.com/',
    //     start: '2016-09-28'
    //   }
    // ]
  };
  events : any[] = [];
  @ViewChild('calendar') calendar;
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController, public navParams: NavParams, public InternetStatus : InternetStatusProvider, private userService : UserService) {
  }

  ionViewWillLoad() {
    const loader = this.loadingCtrl.create({ content: 'Chargement ...' })
    loader.present().then(() => {
      this.loadCalendar().subscribe(
        () => loader.dismiss().catch(err => console.log(err)), //TODO temporary dismiss
        err => err.status != 401 && loader.dismiss().catch(err => console.log(err)),
        ()=>{
          this.calendarOptions.events = this.events
          this.calendar.fullCalendar( 'refresh' )
          console.log("FINISHED")
        }
      )
    })

  }
  loadCalendar(){
    return Observable.merge(
      this.userService.myRuns().map(runs => runs.map(run => ({title:run.title, start: run.beginAt, end: run.finishAt}))),
      this.userService.myWorkingHours().map(schedules => schedules.map(sched => ({title:"",start:sched.start_at, end: sched.end_at})))
    )
    .do(data => console.log(data))
    .do(data => this.events.push(data))
  }

}
