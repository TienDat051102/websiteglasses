import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Orders} from './orders.model'; // Giả sử bạn đã có model cho bảng Orders

@model()
export class Payments extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Orders)
  orderId: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['cod', 'vnpay', 'momo'],
    },
    required: true,
  })
  payment_method: string;

  @property({
    type: 'string',
  })
  transaction_id?: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['pending', 'success', 'failed', 'cancel'],
    },
    default: 'pending',
  })
  status: string;

  @property({
    type: 'string',
  })
  payment_url?: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    },
  })
  response_data?: object;

  @property({
    type: 'string',
  })
  provider_code?: string;

  @property({
    type: 'date',
  })
  paid_at?: string;

  constructor(data?: Partial<Payments>) {
    super(data);
  }
}
export interface PaymentsRelations {}

export type PaymentsWithRelations = Payments & PaymentsRelations;
