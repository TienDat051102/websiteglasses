import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Customers} from './customers.model';
import {OrderItems} from './order-items.model';
import {OrderStatuses} from './order-statuses.model';

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
    postgresql: {
      dataType: 'decimal',
    },
  })
  total_price?: number;

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
  })
  shipping_address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  @hasMany(() => OrderStatuses, {keyTo: 'orderId'})
  orderStatuses: OrderStatuses[];

  @hasMany(() => OrderItems, {keyTo: 'orderId'})
  orderItems: OrderItems[];

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations { }

export type OrdersWithRelations = Orders & OrdersRelations;
