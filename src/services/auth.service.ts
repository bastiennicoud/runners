import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { X_ACCESS_TOKEN } from "./http.service";
import { UserService } from "./user.service";
import { Observable } from "rxjs";


export let USER_PROFILE = "profile";

@Injectable()
export class AuthService {

  constructor(public userService: UserService) { }

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

  logout() {
    localStorage.removeItem(USER_PROFILE);
    localStorage.removeItem(X_ACCESS_TOKEN);
  }

  isAuthenticated(): boolean {
    let user = localStorage.getItem(USER_PROFILE);
    return user != null;
  }
}
