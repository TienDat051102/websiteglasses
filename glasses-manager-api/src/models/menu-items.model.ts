import {Entity, model, property} from '@loopback/repository';

@model()
export class MenuItems extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  image: string;

  @property({
    type: 'number',
    postgresql: {
      dataType: 'decimal',
    },
  })
  price: number;

  @property({
    type: 'number',
  })
  import_price?: number;

  @property({
    type: 'number',
    default: 0,
  })
  stock: number;

  @property({
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  status?: boolean;

  @property({
    type: 'number',
  })
  category_id: number;

  @property({
    type: 'boolean',
    default: false,
  })
  is_featured?: boolean;


  constructor(data?: Partial<MenuItems>) {
    super(data);
  }
}

export interface MenuItemsRelations { }

export type MenuItemsWithRelations = MenuItems & MenuItemsRelations;
