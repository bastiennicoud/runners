import { Animation, PageTransition } from 'ionic-angular';

import debug from 'debug'

export class ModalScaleUpEnterTransition extends PageTransition {

  public init() {
    debug('transition')('entering data : %O',this.enteringView.data)
    const ele = this.enteringView.pageRef().nativeElement;
    var x = this.enteringView;
    const wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));

    wrapper.beforeStyles({ 'transform': 'scale(0)', 'opacity': 1 });
    wrapper.fromTo('transform', 'scale(0)', 'scale(1.0)');
    wrapper.fromTo('opacity', 1, 1);
    debug('transition')('offset y:%d x:%d',ele.offsetY,ele.offsetX)
    function swipedetect(el, callback){
      // if(el == null)return;
      var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 100, //required min distance traveled to be considered swipe
        restraint = 50, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 500, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        dist,
        handleswipe = callback || function(swipedir){}

      touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
      }, false)

      touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
      }, false)

      touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
            swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
            swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
        }
        handleswipe(swipedir)
        e.preventDefault()
      }, false)
    }

      swipedetect(ele.querySelector(".modal-wrapper ion-header"), (dir) => {
        if(dir == "down")
          x.dismiss()
      })

    this
      .element(this.enteringView.pageRef())
      .duration(500)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .add(wrapper);
  }
}
