import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Vehicle } from '../models/vehicle'
import { VehicleStatus } from '../models/vehicle-status'
import { HttpClient } from '@angular/common/http'
import { Comment } from '../models/comment'

export { Vehicle, VehicleStatus }

/**
 * Retrive one or all Vehicle.
 *
 * @export
 * @class VehicleService
 */
@Injectable()
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  all(): Observable<Vehicle[]> {
    return this.httpClient
      .get<any[]>('/vehicles')
      .map(array => array.map(data => Vehicle.build(data)))
  }

  get(id: string): Observable<Vehicle> {
    return this.httpClient
      .get(`/vehicles/${id}`)
      .map(data => Vehicle.build(data))
  }

  status(): Observable<VehicleStatus[]> {
    return this.httpClient
      .get<any[]>(`/vehicles`)
      .map(data => data.map(d => VehicleStatus.build(d)))
  }
  getComments(id:string) : Observable<Comment[]>{
    return this.httpClient.get<any[]>(`/vehicles/${id}/comments`)
      .map(d => d.map(r => Comment.build(r)))
  }
  addComment(id: string, data:string ): Observable<Comment> {
    return this.httpClient
      .post(`/vehicles/${id}/comments`,{
        content: data
      })
      .map(data => Comment.build(data))
  }
  deleteComment(vehicleId:string, commentId:string){
    return this.httpClient
      .delete(`/vehicles/${vehicleId}/comments/${commentId}`)
  }

}
