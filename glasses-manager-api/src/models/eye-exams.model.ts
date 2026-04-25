import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customers} from './customers.model';

@model()
export class EyeExams extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Customers)
  customerId: number;

  @property({type: 'number', required: true})
  left_eye_degree: number;

  @property({type: 'number', required: true})
  right_eye_degree: number;

  // loạn thị
  @property({type: 'number'})
  astigmatism_left?: number;

  @property({type: 'number'})
  astigmatism_right?: number;

  // khoảng cách đồng tử
  @property({type: 'number'})
  pupil_distance?: number;

  // ghi chú bác sĩ / nhân viên
  @property({type: 'string'})
  note?: string;

  // nơi đo mắt (shop / bệnh viện / online)
  @property({
    type: 'string',
    jsonSchema: {
      enum: ['shop', 'hospital', 'online'],
    },
    default: 'shop',
  })
  source?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created_at?: Date;

  constructor(data?: Partial<EyeExams>) {
    super(data);
  }
}

export interface EyeExamsRelations {}

export type EyeExamsWithRelations = EyeExams & EyeExamsRelations;
