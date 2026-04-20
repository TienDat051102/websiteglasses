import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderItems extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  orderId?: number;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  menu_items: object;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderitemsRelations { }

export type OrderItemsWithRelations = OrderItems & OrderitemsRelations;
