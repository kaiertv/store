import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { Evaluar } from 'app/shared/model/enumerations/evaluar.model';

export interface ICalificacion {
  id?: number;
  date?: Moment;
  evaluacion?: Evaluar;
  product?: IProduct;
}

export class Calificacion implements ICalificacion {
  constructor(public id?: number, public date?: Moment, public evaluacion?: Evaluar, public product?: IProduct) {}
}
