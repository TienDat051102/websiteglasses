import {Entity, hasMany, model, property} from '@loopback/repository';
import {Appointments} from './appointments.model';
import {Orders} from './orders.model';

@model()
export class Customers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  phone_number: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: Date;

  @hasMany(() => Orders, {keyTo: 'customerId'})
  orders: Orders[];

  @hasMany(() => Appointments, {keyTo: 'customerId'})
  appointments: Appointments[];

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations { }

export type CustomersWithRelations = Customers & CustomersRelations;
