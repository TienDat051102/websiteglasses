import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {
  MenuItems,
  ProductInventory,
  ProductInventoryRelations,
} from '../models';
import {MenuItemsRepository} from './menu-items.repository';

export class ProductInventoryRepository extends DefaultCrudRepository<
  ProductInventory,
  typeof ProductInventory.prototype.id,
  ProductInventoryRelations
> {
  public readonly product: BelongsToAccessor<
    MenuItems,
    typeof ProductInventory.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('MenuItemsRepository')
    protected menuItemsRepositoryGetter: Getter<MenuItemsRepository>,
  ) {
    super(ProductInventory, dataSource);

    this.product = this.createBelongsToAccessorFor(
      'product',
      menuItemsRepositoryGetter,
    );

    this.registerInclusionResolver(
      'product',
      this.product.inclusionResolver,
    );
  }
}
