import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody} from '@loopback/rest';
import {MenuItemsRepository} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class MenuItemController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(MenuItemsRepository) private menuRepo: MenuItemsRepository,
  ) {}

  @get('/menuitem/getmenuitems')
  @authenticate('jwt')
  async getmenuitems(
    @param.query.number('skip') skip: number,
    @param.query.number('limit') limit: number,
    @param.query.string('search') search: string,
  ): Promise<any> {
    const searchWord = (search || '').toLowerCase();

    const filter: any = {
      skip: skip >= 0 ? skip : undefined,
      limit: limit >= 0 ? limit : undefined,
      where: {
        name: {ilike: `%${searchWord}%`},
      },
      order: ['id DESC'],
    };

    try {
      const data = await this.menuRepo.find(filter);
      const dataCount = await this.menuRepo.count({
        name: {ilike: `%${searchWord}%`},
      });

      return {
        message: `Dữ liệu được xuất thành công`,
        data,
        count: dataCount.count,
      };
    } catch (e) {
      return {error: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @get('/menuitem/getmenuitemspagehome')
  async getmenuitemspagehome(
    @param.query.number('skip') skip?: number,
    @param.query.number('limit') limit?: number,
    @param.query.string('search') search?: string,
    @param.query.number('category') category?: number,
    @param.query.string('order') order?: string,
  ): Promise<any> {
    console.log('QUERY:', skip, limit, search, category, order);

    const searchWord = (search || '').toLowerCase();

    const where: any = {
      status: true,
      name: {ilike: `%${searchWord}%`},
    };

    if (category) {
      where.category_id = category;
    }

    let orderBy: string[] = ['id DESC'];

    if (order === 'price_asc') {
      orderBy = ['price ASC'];
    } else if (order === 'price_desc') {
      orderBy = ['price DESC'];
    }

    const filter: any = {
      skip: typeof skip === 'number' ? skip : 0,
      limit: typeof limit === 'number' ? limit : 10,
      where,
      order: orderBy,
    };

    console.log('filter', filter);

    try {
      const data = await this.menuRepo.find(filter);

      const dataCount = await this.menuRepo.count(where);

      return {
        data,
        count: dataCount.count,
      };
    } catch (e) {
      return {
        error: 'Internal server Error Occurred',
        e,
      };
    }
  }

  @post('/menuitem/updatemenuitems')
  @authenticate('jwt')
  async updatemenuitems(@requestBody() body: any = {}): Promise<any> {
    const {
      id,
      name,
      description,
      price,
      image,
      status,
      category_id,
      stock,
      import_price,
      brand,
      type,
      is_featured,
    } = body;

    try {
      const payload: any = {
        name,
        description,
        image,
        price,
        status,
        category_id,
        stock: stock || 0,
        import_price,
        brand,
        type,
        is_featured,
      };

      if (!id) {
        const exist = await this.menuRepo.findOne({
          where: {name: name},
        });

        if (exist) {
          return {message: 'Sản phẩm đã tồn tại, vui lòng chỉnh sửa!'};
        }

        await this.menuRepo.create(payload);

        return {message: `Thêm sản phẩm thành công`};
      }

      const exist = await this.menuRepo.findById(id);

      if (!exist) {
        return {message: `Không tìm thấy sản phẩm`};
      }

      await this.menuRepo.updateById(id, payload);

      return {message: 'Cập nhật sản phẩm thành công'};
    } catch (e) {
      return {error: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @get('/menuitem/menuitemsfeatured')
  async getFeatured(): Promise<any> {
    try {
      const data = await this.menuRepo.find({
        where: {
          status: true,
          is_featured: true,
        },
        order: ['id DESC'],
        limit: 10,
      });

      return {
        message: 'Lấy sản phẩm nổi bật thành công',
        data,
      };
    } catch (e) {
      return {error: 'Internal server error', e};
    }
  }
}
