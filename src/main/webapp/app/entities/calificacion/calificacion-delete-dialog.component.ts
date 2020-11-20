import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICalificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';

@Component({
  templateUrl: './calificacion-delete-dialog.component.html',
})
export class CalificacionDeleteDialogComponent {
  calificacion?: ICalificacion;

  constructor(
    protected calificacionService: CalificacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.calificacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('calificacionListModification');
      this.activeModal.close();
    });
  }
}
