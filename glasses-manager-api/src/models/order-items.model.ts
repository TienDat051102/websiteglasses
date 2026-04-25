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
    required: true,
  })
  orderId: number;

  @property({
    type: 'number',
    required: true,
  })
  productId: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number; // giá tại thời điểm mua

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: string;

  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderitemsRelations {}

export type OrderItemsWithRelations = OrderItems & OrderitemsRelations;
