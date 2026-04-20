import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody} from '@loopback/rest';
import {
  MenuItemsRepository,
  OrderitemsRepository,
  OrdersRepository,
  OrderstatusesRepository,
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
    @repository(MenuItemsRepository)
    private menuItemsRepo: MenuItemsRepository,
  ) { }

  @post('/order/createorders')
  @authenticate('jwt')
  async createorders(@requestBody() body: any = {}): Promise<any> {
    const {ordersItem, customerId} = body;

    if (!ordersItem || !Array.isArray(ordersItem)) {
      return {error: 'Danh sách sản phẩm không hợp lệ'};
    }

    try {
      const order = await this.orderRepo.create({
        customerId: customerId,
      });

      for (const item of ordersItem) {
        const product = await this.menuItemsRepo.findById(item.id);

        if (!product) {
          throw new Error(`Không tìm thấy sản phẩm ID ${item.id}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Sản phẩm ${product.name} không đủ hàng`);
        }

        product.stock -= item.quantity;
        await this.menuItemsRepo.updateById(product.id, product);
      }

      await this.orderItemRepo.create({
        orderId: order.id,
        menu_items: ordersItem,
      });

      await this.orderStatusRepo.create({
        orderId: order.id,
        status: 'pending',
      });

      return {message: 'Đặt hàng thành công'};
    } catch (e: any) {
      return {error: e.message};
    }
  }

  @post('/order/updateorders')
  @authenticate('jwt')
  async updateorders(@requestBody() body: any = {}): Promise<any> {
    const {ordersItem, orderId} = body;

    if (!ordersItem || !orderId) {
      return {error: 'Thiếu dữ liệu'};
    }

    try {
      await this.orderItemRepo.create({
        orderId: orderId,
        menu_items: ordersItem,
      });

      return {message: 'Cập nhật thành công'};
    } catch (e: any) {
      return {error: e.message};
    }
  }

  @get('/order/listorders')
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
}
