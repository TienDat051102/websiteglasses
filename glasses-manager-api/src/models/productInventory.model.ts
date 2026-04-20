import {belongsTo, Entity, model, property} from '@loopback/repository';
import {MenuItems} from './index';

@model()
export class ProductInventory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => MenuItems)
  productId: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'string',
    jsonSchema: {
      enum: ['import', 'export'],
    },
    default: 'import',
  })
  transaction_type: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  transaction_date?: Date;

  @property({
    type: 'number',
  })
  import_price?: number;

  @property({
    type: 'string',
  })
  notes?: string;

  constructor(data?: Partial<ProductInventory>) {
    super(data);
  }
}
export interface ProductInventoryRelations {

}

export type ProductInventoryWithRelations =
  ProductInventory & ProductInventoryRelations;
