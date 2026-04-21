import {Entity, model, property} from '@loopback/repository';

@model()
export class MenuItemImages extends Entity {
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
    required: true,
  })
  image_url: string;

  @property({
    type: 'boolean',
    default: false,
  })
  is_main?: boolean;

  constructor(data?: Partial<MenuItemImages>) {
    super(data);
  }
}
export interface MenuItemImagesRelations {}

export type MenuItemImagesWithRelations = MenuItemImages &
  MenuItemImagesRelations;
