import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {
  MenuItemsRepository,
  OrderitemsRepository,
  OrdersRepository,
  OrderstatusesRepository,
  PaymentsRepository,
} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class OrdersController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(OrdersRepository) private orderRepo: OrdersRepository,
    @repository(OrderitemsRepository)
    private orderItemRepo: OrderitemsRepository,
    @repository(OrderstatusesRepository)
    private orderStatusRepo: OrderstatusesRepository,
    @repository(PaymentsRepository)
    private paymentsRepo: PaymentsRepository,
    @repository(MenuItemsRepository)
    private menuItemsRepo: MenuItemsRepository,
  ) {}

  @get('/order/listorders')
  @authenticate('jwt')
  async listorders(): Promise<any> {
    try {
      const filter: any = {
        include: [
          {relation: 'orderItems'},
          {
            relation: 'orderStatuses',
            scope: {
              order: ['updated_at DESC'],
            },
          },
        ],
        order: ['created_at DESC'],
      };

      const data = await this.orderRepo.find(filter);
      const count = await this.orderRepo.count();

      return {data, count: count.count};
    } catch (e) {
      return {error: 'Server error'};
    }
  }

  @get('/order/gettorderId/{id}')
  @authenticate('jwt')
  async gettorderId(@param.path.number('id') id: number): Promise<any> {
    try {
      const data = await this.orderRepo.findById(id, {
        include: [{relation: 'orderItems'}],
      });

      return {data};
    } catch (e) {
      return {error: 'Không tìm thấy đơn'};
    }
  }

  @post('/order/updateorderstatus')
  @authenticate('jwt')
  async updateorderstatus(@requestBody() body: any = {}): Promise<any> {
    const {orderId, status} = body;

    if (!orderId || !status) {
      return {error: 'Thiếu dữ liệu'};
    }

    try {
      const exists = await this.orderStatusRepo.findOne({
        where: {orderId, status},
      });

      if (exists) {
        return {error: 'Trạng thái đã tồn tại'};
      }

      await this.orderStatusRepo.create({
        orderId,
        status,
      });

      return {message: 'Cập nhật trạng thái thành công'};
    } catch (e: any) {
      return {error: e.message};
    }
  }

  @get('/me/orders')
  @authenticate('customer-jwt')
  async myOrders(
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<any> {
    if (!currentUser?.id) {
      throw new HttpErrors.Unauthorized('Invalid user');
    }

    const orders = await this.orderRepo.find({
      where: {
        customerId: currentUser.id,
      },
      include: [
        {
          relation: 'orderItems',
        },
        {
          relation: 'orderStatuses',
        },
      ],
      order: ['created_at DESC'],
    });

    return {
      data: orders,
    };
  }

  @post('/me/orders')
  @authenticate('customer-jwt')
  async createFromCustomer(
    @inject(SecurityBindings.USER) currentUser: UserProfile,
    @requestBody({
      description: 'Order payload',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: {type: 'number'},
                    price: {type: 'number'},
                    quantity: {type: 'number'},
                  },
                  required: ['productId', 'price', 'quantity'],
                },
              },
              shipping_address: {type: 'object'},
              phone: {type: 'string'},
              note: {type: 'string'},
              payment_method: {type: 'string'},
            },
            required: ['items'],
          },
        },
      },
    })
    body: any,
  ): Promise<any> {
    if (!currentUser?.id) {
      throw new HttpErrors.Unauthorized('Invalid user');
    }

    const {items, shipping_address, phone, note, payment_method} = body;
    console.log('body', body);
    if (!items || items.length === 0) {
      throw new HttpErrors.BadRequest('Cart is empty');
    }

    const totalPrice = items.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0,
    );

    const orderCode = 'OD' + Date.now();

    const order = await this.orderRepo.create({
      customerId: currentUser.id,
      totalPrice,
      status: 'pending',
      payment_status: 'unpaid',
      payment_method: payment_method || 'cod',
      shipping_address,
      phone,
      note,
      order_code: orderCode,
    });

    for (const item of items) {
      await this.orderItemRepo.create({
        orderId: order.id,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
      });
    }
    await this.orderStatusRepo.create({
      orderId: order.id,
      status: 'pending',
    });
    //   const payload = {
    //     orderId: order.id,
    //     amount: totalPrice,
    //     payment_method: 'online',
    //     status: 'pending',
    //     transaction_id: transaction_id,
    //   };
    // await this.paymentsRepo.create(payload);

    return {
      message: 'Order created successfully',
      data: order,
    };
  }
}
