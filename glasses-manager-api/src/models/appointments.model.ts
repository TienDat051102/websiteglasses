import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customers, CustomersWithRelations} from './index';

@model()
export class Appointments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Customers, {name: 'customerInfo'})
  customerId?: number;

  @property({type: 'string'})
  name?: string;

  @property({type: 'string'})
  phone?: string;

  @property({type: 'string'})
  email?: string;

  @property({
    type: 'date',
    required: true,
  })
  appointment_time: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['eye_test', 'try_glasses'],
    },
    default: 'eye_test',
  })
  service_type: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
    },
    default: 'pending',
  })
  status: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  constructor(data?: Partial<Appointments>) {
    super(data);
  }
}

export interface AppointmentsRelations {
  customerInfo?: CustomersWithRelations;
}

export type AppointmentsWithRelations =
  Appointments & AppointmentsRelations;
