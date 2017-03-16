import { Run } from './run';

export class User {

  public id: string;
  public firstname: string;
  public lastname: string;
  public phoneNumber: string;
  public image_profile: string;

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }

  static build(data: any): User {
    if (!data) return null;

    let u = new User;
    u.id = data._id || data.id;
    u.firstname = data.firstname || null;
    u.lastname = data.lastname || null;
    u.phoneNumber = data.phone_number || null;
    u.image_profile = data.image_profile || "assets/user.jpg";

    return u;
  }

  belongsToRun(run: Run): boolean {
    return !!run.runners.filter(runner => runner.user && runner.user.id == this.id).length;
  }

}
