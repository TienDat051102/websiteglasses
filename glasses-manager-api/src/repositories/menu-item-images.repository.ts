import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';

import {PgdbDataSource} from '../datasources';
import {MenuItemImages, MenuItemImagesRelations} from '../models';

export class MenuItemImagesRepository extends DefaultCrudRepository<
  MenuItemImages,
  typeof MenuItemImages.prototype.id,
  MenuItemImagesRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(MenuItemImages, dataSource);
  }
}
