import {Entity, hasMany, model, property} from '@loopback/repository';
import {Appointments} from './appointments.model';
import {EyeExams} from './eye-exams.model';
import {Orders} from './orders.model';

@model()
export class Customers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({type: 'string', required: true})
  name: string;

  @property({
    type: 'string',
    index: {unique: true},
  })
  email?: string;

  @property({
    type: 'string',
    index: {unique: true},
  })
  phone_number?: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  address?: object;

  @property({type: 'string'})
  avatar?: string;

  @property({type: 'string', required: true})
  password: string;

  @property({type: 'string'})
  phone_delivery?: string;

  // 🔐 OTP LOGIN
  @property({type: 'string'})
  otp_code?: string;

  @property({type: 'date'})
  otp_expired?: Date;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['new', 'normal', 'vip'],
    },
    default: 'new',
  })
  customer_type?: string;

  @property({type: 'string'})
  note?: string;

  @property({type: 'date'})
  last_login_at?: Date;

  @property({type: 'number'})
  login_attempts?: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: Date;

  // RELATIONS
  @hasMany(() => Orders, {keyTo: 'customerId'})
  orders: Orders[];

  @hasMany(() => Appointments, {keyTo: 'customerId'})
  appointments: Appointments[];

  @hasMany(() => EyeExams, {keyTo: 'customerId'})
  eyeExams: EyeExams[];
}

export interface CustomersRelations {}

export type CustomersWithRelations = Customers & CustomersRelations;
