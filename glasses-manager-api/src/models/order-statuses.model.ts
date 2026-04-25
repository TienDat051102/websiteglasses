import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderStatuses extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  orderId: number;

  @property({
    type: 'string',
    jsonSchema: {
      enum: [
        'pending',
        'confirmed',
        'shipping',
        'delivered',
        'completed',
        'cancelled',
      ],
    },
    required: true,
  })
  status: string;

  @property({
    type: 'string',
  })
  actor?: string; // system | admin | shipper

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  constructor(data?: Partial<OrderStatuses>) {
    super(data);
  }
}

export interface OrderstatusesRelations {}

export type OrderStatusesWithRelations = OrderStatuses & OrderstatusesRelations;
