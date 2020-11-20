import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICalificacion } from 'app/shared/model/calificacion.model';

type EntityResponseType = HttpResponse<ICalificacion>;
type EntityArrayResponseType = HttpResponse<ICalificacion[]>;

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  public resourceUrl = SERVER_API_URL + 'api/calificacions';

  constructor(protected http: HttpClient) {}

  create(calificacion: ICalificacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calificacion);
    return this.http
      .post<ICalificacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(calificacion: ICalificacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calificacion);
    return this.http
      .put<ICalificacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICalificacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICalificacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(calificacion: ICalificacion): ICalificacion {
    const copy: ICalificacion = Object.assign({}, calificacion, {
      date: calificacion.date && calificacion.date.isValid() ? calificacion.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((calificacion: ICalificacion) => {
        calificacion.date = calificacion.date ? moment(calificacion.date) : undefined;
      });
    }
    return res;
  }
}
