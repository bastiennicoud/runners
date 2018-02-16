import { Pipe, PipeTransform } from '@angular/core'
import { Vehicle } from '../../models/vehicle'

@Pipe({
  name: 'groupVehicleType',
})
export class GroupVehicleTypePipe implements PipeTransform {
  transform(vehicles: Vehicle[]): any[] {
    const groupedVehicleType = vehicles.reduce((prev: any[], cur: Vehicle) => {
      const key = cur.type.type
      if (!prev[key]) prev[key] = { type: cur.type, vehicles: [cur] }
      else prev[key].vehicles.push(cur)
      return prev
    }, [])
    return Object.keys(groupedVehicleType).map(key => {
      const { type, vehicles } = groupedVehicleType[key]
      return { type, vehicles }
    })
  }
}
