import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {
  Appointments,
  Customers,
  CustomersRelations,
  EyeExams,
  Orders,
} from '../models';
import {
  AppointmentsRepository,
  EyeExamsRepository,
  OrdersRepository,
} from './index';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {
  public readonly orders: HasManyRepositoryFactory<
    Orders,
    typeof Customers.prototype.id
  >;

  public readonly eyeExams: HasManyRepositoryFactory<
    EyeExams,
    typeof Customers.prototype.id
  >;

  public readonly appointments: HasManyRepositoryFactory<
    Appointments,
    typeof Customers.prototype.id
  >;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
    @repository.getter('OrdersRepository')
    protected ordersRepositoryGetter: Getter<OrdersRepository>,
    @repository.getter('EyeExamsRepository')
    protected eyeExamsRepositoryGetter: Getter<EyeExamsRepository>,
    @repository.getter('AppointmentsRepository')
    protected appointmentsRepositoryGetter: Getter<AppointmentsRepository>,
  ) {
    super(Customers, dataSource);

    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      ordersRepositoryGetter,
    );
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);

    this.eyeExams = this.createHasManyRepositoryFactoryFor(
      'eyeExams',
      eyeExamsRepositoryGetter,
    );
    this.registerInclusionResolver('eyeExams', this.eyeExams.inclusionResolver);

    this.appointments = this.createHasManyRepositoryFactoryFor(
      'appointments',
      appointmentsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'appointments',
      this.appointments.inclusionResolver,
    );
  }
}
