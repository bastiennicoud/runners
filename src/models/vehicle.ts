export class Vehicle {
  id: number;
  name: string;
  plate_number: string;
  nb_place: number;

  constructor(data: any) {
    this.id = data.id || data._id || null;
    this.name = data.name || null;
    this.plate_number = data.plate_number || null;
    this.nb_place = data.nb_place || null;
  }
}
