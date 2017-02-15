export class User {
  id: number;
  firstname: string;
  lastname: string;
  phone_number: string;

  constructor(data:any) {
    this.id = data.id || data._id || null;
    this.firstname = data.firstname || null;
    this.lastname = data.lastname || null;
    this.phone_number = data.phone_number || null;
  }
}
