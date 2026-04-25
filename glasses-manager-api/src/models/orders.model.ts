import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Customers, OrderItems, OrderStatuses} from './index';

@model()
export class Orders extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Customers)
  customerId: number;

  @property({
    type: 'number',
  })
  totalPrice?: number;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['pending', 'confirmed', 'shipping', 'completed', 'canceled'],
    },
    default: 'pending',
  })
  status?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['unpaid', 'paid', 'failed'],
    },
    default: 'unpaid',
  })
  payment_status?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['cod', 'vnpay', 'momo'],
    },
  })
  payment_method?: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  shipping_address?: object;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'string',
  })
  order_code?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @hasMany(() => OrderItems, {keyTo: 'orderId'})
  orderItems: OrderItems[];

  @hasMany(() => OrderStatuses, {keyTo: 'orderId'})
  orderStatuses: OrderStatuses[];

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {}

export type OrdersWithRelations = Orders & OrdersRelations;
