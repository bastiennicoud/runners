import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { X_ACCESS_TOKEN } from "./http.service";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { HttpService } from './http.service'

export { User }
export let USER_PROFILE = "profile";


@Injectable()
export class AuthService {

  static redirectCallback:any = null

  constructor(public userService: UserService, public http: HttpService) {

  }

  /**
   *
   * @param key QrCode key
   */
  login(key: string): Observable<User> {
    localStorage.setItem(X_ACCESS_TOKEN, key);

    return new Observable<User>(observer => {

      this.userService.me().subscribe(user => {
        if (user) {
          observer.next(user);
          localStorage.setItem(USER_PROFILE, JSON.stringify(user));
        } else {
          observer.error("Authentification failed");
        }
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }

  static logout() {
    localStorage.removeItem(USER_PROFILE);
    localStorage.removeItem(X_ACCESS_TOKEN);
  }

  static setRedirect(callback:any){
    if(callback != null){
      AuthService.redirectCallback = callback;
    }
  }

   static redirect(){
    if(AuthService.redirectCallback != null){
      AuthService.redirectCallback();
    }
  }

  static logOutAndRedirect(){
    AuthService.logout();
    AuthService.redirect();
  }

  static isAuthenticated(): boolean {
    let user = localStorage.getItem(USER_PROFILE);
    return user != null;
  }
}