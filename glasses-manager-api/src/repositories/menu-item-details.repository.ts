import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';

import {PgdbDataSource} from '../datasources';
import {MenuItemDetails, MenuItemDetailsRelations} from '../models';

export class MenuItemDetailsRepository extends DefaultCrudRepository<
  MenuItemDetails,
  typeof MenuItemDetails.prototype.id,
  MenuItemDetailsRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(MenuItemDetails, dataSource);
  }
}
