import { NgModule } from '@angular/core';
import { GroupVehicleTypePipe } from './group-vehicle-type/group-vehicle-type';
import { RelativeTimePipe } from './relative-time/relative-time';
@NgModule({
	declarations: [GroupVehicleTypePipe,
    RelativeTimePipe],
	imports: [],
	exports: [GroupVehicleTypePipe,
    RelativeTimePipe]
})
export class PipesModule {}
