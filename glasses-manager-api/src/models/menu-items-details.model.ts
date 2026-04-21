import {Entity, model, property} from '@loopback/repository';

@model()
export class MenuItemDetails extends Entity {
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
  menu_item_id: number;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  specifications?: string;

  constructor(data?: Partial<MenuItemDetails>) {
    super(data);
  }
}

export interface MenuItemDetailsRelations {}

export type MenuItemDetailsWithRelations = MenuItemDetails &
  MenuItemDetailsRelations;
