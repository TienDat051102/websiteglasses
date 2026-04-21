import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';

import {PgdbDataSource} from '../datasources';
import {
  MenuItemDetails,
  MenuItemImages,
  MenuItems,
  MenuItemsRelations,
} from '../models';
import {MenuItemDetailsRepository} from './menu-item-details.repository';
import {MenuItemImagesRepository} from './menu-item-images.repository';

export class MenuItemsRepository extends DefaultCrudRepository<
  MenuItems,
  typeof MenuItems.prototype.id,
  MenuItemsRelations
> {
  public readonly images: HasManyRepositoryFactory<
    MenuItemImages,
    typeof MenuItems.prototype.id
  >;

  public readonly details: HasManyRepositoryFactory<
    MenuItemDetails,
    typeof MenuItems.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,

    @repository.getter('MenuItemImagesRepository')
    protected imagesRepositoryGetter: Getter<MenuItemImagesRepository>,

    @repository.getter('MenuItemDetailsRepository')
    protected detailsRepositoryGetter: Getter<MenuItemDetailsRepository>,
  ) {
    super(MenuItems, dataSource);

    this.images = this.createHasManyRepositoryFactoryFor(
      'images',
      imagesRepositoryGetter,
    );
    this.registerInclusionResolver('images', this.images.inclusionResolver);

    this.details = this.createHasManyRepositoryFactoryFor(
      'details',
      detailsRepositoryGetter,
    );
    this.registerInclusionResolver('details', this.details.inclusionResolver);
  }
}
