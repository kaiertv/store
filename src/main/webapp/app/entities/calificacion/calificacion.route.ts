import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICalificacion, Calificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';
import { CalificacionComponent } from './calificacion.component';
import { CalificacionDetailComponent } from './calificacion-detail.component';
import { CalificacionUpdateComponent } from './calificacion-update.component';

@Injectable({ providedIn: 'root' })
export class CalificacionResolve implements Resolve<ICalificacion> {
  constructor(private service: CalificacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalificacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((calificacion: HttpResponse<Calificacion>) => {
          if (calificacion.body) {
            return of(calificacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Calificacion());
  }
}

export const calificacionRoute: Routes = [
  {
    path: '',
    component: CalificacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.calificacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CalificacionDetailComponent,
    resolve: {
      calificacion: CalificacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.calificacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CalificacionUpdateComponent,
    resolve: {
      calificacion: CalificacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.calificacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CalificacionUpdateComponent,
    resolve: {
      calificacion: CalificacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'storeApp.calificacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
