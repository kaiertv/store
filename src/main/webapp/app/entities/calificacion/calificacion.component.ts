import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICalificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';
import { CalificacionDeleteDialogComponent } from './calificacion-delete-dialog.component';

@Component({
  selector: 'jhi-calificacion',
  templateUrl: './calificacion.component.html',
})
export class CalificacionComponent implements OnInit, OnDestroy {
  calificacions?: ICalificacion[];
  eventSubscriber?: Subscription;

  constructor(
    protected calificacionService: CalificacionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.calificacionService.query().subscribe((res: HttpResponse<ICalificacion[]>) => (this.calificacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCalificacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICalificacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCalificacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('calificacionListModification', () => this.loadAll());
  }

  delete(calificacion: ICalificacion): void {
    const modalRef = this.modalService.open(CalificacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.calificacion = calificacion;
  }
}
