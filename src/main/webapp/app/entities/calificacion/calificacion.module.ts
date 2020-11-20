import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreSharedModule } from 'app/shared/shared.module';
import { CalificacionComponent } from './calificacion.component';
import { CalificacionDetailComponent } from './calificacion-detail.component';
import { CalificacionUpdateComponent } from './calificacion-update.component';
import { CalificacionDeleteDialogComponent } from './calificacion-delete-dialog.component';
import { calificacionRoute } from './calificacion.route';

@NgModule({
  imports: [StoreSharedModule, RouterModule.forChild(calificacionRoute)],
  declarations: [CalificacionComponent, CalificacionDetailComponent, CalificacionUpdateComponent, CalificacionDeleteDialogComponent],
  entryComponents: [CalificacionDeleteDialogComponent],
})
export class StoreCalificacionModule {}
