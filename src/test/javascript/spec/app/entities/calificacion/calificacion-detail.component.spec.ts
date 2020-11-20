import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StoreTestModule } from '../../../test.module';
import { CalificacionDetailComponent } from 'app/entities/calificacion/calificacion-detail.component';
import { Calificacion } from 'app/shared/model/calificacion.model';

describe('Component Tests', () => {
  describe('Calificacion Management Detail Component', () => {
    let comp: CalificacionDetailComponent;
    let fixture: ComponentFixture<CalificacionDetailComponent>;
    const route = ({ data: of({ calificacion: new Calificacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [CalificacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CalificacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CalificacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load calificacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.calificacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
