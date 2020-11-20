import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICalificacion, Calificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-calificacion-update',
  templateUrl: './calificacion-update.component.html',
})
export class CalificacionUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    evaluacion: [null, [Validators.required]],
    product: [],
  });

  constructor(
    protected calificacionService: CalificacionService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ calificacion }) => {
      if (!calificacion.id) {
        const today = moment().startOf('day');
        calificacion.date = today;
      }

      this.updateForm(calificacion);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(calificacion: ICalificacion): void {
    this.editForm.patchValue({
      id: calificacion.id,
      date: calificacion.date ? calificacion.date.format(DATE_TIME_FORMAT) : null,
      evaluacion: calificacion.evaluacion,
      product: calificacion.product,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const calificacion = this.createFromForm();
    if (calificacion.id !== undefined) {
      this.subscribeToSaveResponse(this.calificacionService.update(calificacion));
    } else {
      this.subscribeToSaveResponse(this.calificacionService.create(calificacion));
    }
  }

  private createFromForm(): ICalificacion {
    return {
      ...new Calificacion(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      evaluacion: this.editForm.get(['evaluacion'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalificacion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProduct): any {
    return item.id;
  }
}
