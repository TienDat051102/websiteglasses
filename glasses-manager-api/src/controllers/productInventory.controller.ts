import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  param,
  post,
  requestBody
} from '@loopback/rest';

import {
  MenuItemsRepository,
  ProductInventoryRepository,
} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class ProductInventoryController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,

    @repository(ProductInventoryRepository)
    private inventoryRepo: ProductInventoryRepository,

    @repository(MenuItemsRepository)
    private productRepo: MenuItemsRepository,
  ) { }

  @get('/inventory/list')
  @authenticate('jwt')
  async list(
    @param.query.number('skip') skip: number,
    @param.query.number('limit') limit: number,
  ): Promise<any> {
    const filter: any = {
      include: [{relation: 'product'}],
      skip: skip >= 0 ? skip : undefined,
      limit: limit >= 0 ? limit : undefined,
      order: ['transaction_date DESC'],
    };

    const data = await this.inventoryRepo.find(filter);
    return {message: 'OK', data};
  }

  @get('/inventory/count')
  @authenticate('jwt')
  async count(): Promise<any> {
    const count = await this.inventoryRepo.count();
    return {count: count.count};
  }

  @post('/inventory/import')
  @authenticate('jwt')
  async importProduct(
    @requestBody() body: any,
  ): Promise<any> {
    const {productId, quantity, import_price, notes} = body;

    if (!productId || !quantity) {
      return {message: 'Thiếu dữ liệu'};
    }

    const product = await this.productRepo.findById(productId);
    if (!product) {
      return {message: 'Không tìm thấy sản phẩm'};
    }

    const data = await this.inventoryRepo.create({
      productId,
      quantity,
      transaction_type: 'import',
      import_price,
      notes,
      transaction_date: new Date(),
    });

    return {message: 'Nhập kho thành công', data};
  }

  @post('/inventory/export')
  @authenticate('jwt')
  async exportProduct(
    @requestBody() body: any,
  ): Promise<any> {
    const {productId, quantity, notes} = body;

    if (!productId || !quantity) {
      return {message: 'Thiếu dữ liệu'};
    }

    const currentStock = await this.getStock(productId);

    if (currentStock < quantity) {
      return {message: 'Không đủ hàng trong kho'};
    }

    const data = await this.inventoryRepo.create({
      productId,
      quantity,
      transaction_type: 'export',
      notes,
      transaction_date: new Date(),
    });

    return {message: 'Xuất kho thành công', data};
  }

  // 🔥 TÍNH TỒN KHO
  @get('/inventory/stock/{productId}')
  @authenticate('jwt')
  async getStockByProduct(
    @param.path.number('productId') productId: number,
  ): Promise<any> {
    const stock = await this.getStock(productId);
    return {productId, stock};
  }

  async getStock(productId: number): Promise<number> {
    const transactions = await this.inventoryRepo.find({
      where: {productId},
    });

    let stock = 0;

    for (const item of transactions) {
      if (item.transaction_type === 'import') {
        stock += item.quantity;
      } else if (item.transaction_type === 'export') {
        stock -= item.quantity;
      }
    }

    return stock;
  }
}
