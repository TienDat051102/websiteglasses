import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {
  Appointments,
  AppointmentsRelations,
  Customers,
} from '../models';
import {CustomersRepository} from './customers.repository';

export class AppointmentsRepository extends DefaultCrudRepository<
  Appointments,
  typeof Appointments.prototype.id,
  AppointmentsRelations
> {
  public readonly customer: BelongsToAccessor<
    Customers,
    typeof Appointments.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('CustomersRepository')
    protected customersRepositoryGetter: Getter<CustomersRepository>,
  ) {
    super(Appointments, dataSource);

    this.customer = this.createBelongsToAccessorFor(
      'customerInfo',
      customersRepositoryGetter,
    );

    this.registerInclusionResolver(
      'customerInfo',
      this.customer.inclusionResolver,
    );
  }
}
