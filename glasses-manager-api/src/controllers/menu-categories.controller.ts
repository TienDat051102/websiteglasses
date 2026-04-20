import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody, response} from '@loopback/rest';
import {MenucategoriesRepository, MenuItemsRepository} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class MenuCategoriesController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(MenucategoriesRepository)
    private menucategoriesrepo: MenucategoriesRepository,
    @repository(MenuItemsRepository)
    private menuitemrepo: MenuItemsRepository,
  ) { }

  @get('/menucategories/listmenucategories')
  async listmenucategories(
    @param.query.number('id') id: number,
  ): Promise<any> {
    const filter: any = {
      include: [
        {
          relation: 'menuitems',
          scope: {
            where: {status: true},
          },
        },
      ],
    };
    if (id) {
      filter.where = {
        id: id,
      };
    }
    try {
      const data = await this.menucategoriesrepo.find(filter);
      const datacount = await this.menucategoriesrepo.count(filter.where);
      return {
        message: `Xuất dữ liệu thành công`,
        data: data,
        datacount: datacount,
      };
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @get('/menucategories/getmenucategories')
  @authenticate('jwt')
  @response(200, {
    description: 'Protected resource',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async getmenucategories(
    // @inject(RestBindings.Http.REQUEST) request: ClientRequest,
    @param.query.number('skip') skip: number,
    @param.query.number('limit') limit: number,
    @param.query.string('search') search: string,
  ): Promise<any> {
    const searchWord = (search || '').toLowerCase();
    const filter: any = {
      skip: skip >= 0 ? skip : undefined,
      limit: limit >= 0 ? limit : undefined,
      include: [
        {
          relation: 'menuitems',
        },
      ],
      where: {name: {ilike: `%${searchWord}%`}},
    };
    try {
      const data = await this.menucategoriesrepo.find(filter);
      const datacount = await this.menucategoriesrepo.count(filter.where);
      return {
        message: `Xuất dữ liệu thành công`,
        data: data,
        datacount: datacount,
      };
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @get('/menucategories/getMenuCategoriesCustomer')
  // @authenticate('jwt')
  @response(200, {
    description: 'Protected resource',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async getMenuCategoriesCustomer(
  ): Promise<any> {
    try {
      const data = await this.menucategoriesrepo.find({
        where: {
          status: true,
        }
      });
      return {
        message: `Xuất dữ liệu thành công`,
        data: data,
      };
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @post('/menucategories/createmenucategories')
  @authenticate('jwt')
  @response(200, {
    description: 'Protected resource',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async createmenucategories(
    // @inject(RestBindings.Http.REQUEST) request: ClientRequest,
    @requestBody() body: any = {},
  ): Promise<any> {
    const {name, icon, status} = body;
    try {
      const payload = {
        name: name,
        icon: icon,
        status: status,
      };
      const ktdata = await this.menucategoriesrepo.findOne({where: {name: name}});
      if (!ktdata) {
        return {message: 'Danh mục món ăn đã tồn tại'};
      }
      const data = await this.menucategoriesrepo.create(payload);
      return {message: 'Thêm danh mục món ăn thành công', data: data};
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @post('/menucategories/updatemenucategories')
  @authenticate('jwt')
  @response(200, {
    description: 'Protected resource',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async updatemenucategories(
    // @inject(RestBindings.Http.REQUEST) request: ClientRequest,
    @requestBody() body: any = {},
  ): Promise<any> {
    const {id, name, icon, status} = body;
    try {
      if (!id) {
        const ktdata = await this.menucategoriesrepo.find({where: {name: name}});
        if (!ktdata) {
          return {message: 'Tên danh mục món ăn đã tồn tại'};
        } else {
          const payload = {
            name: name,
            icon: icon,
            status: status,
          };
          await this.menucategoriesrepo.create(payload);
          return {message: 'Success'};
        }
      } else {
        const ktdata = await this.menucategoriesrepo.findById(id);
        if (!ktdata) {
          return {message: 'Danh mục món ăn bạn chọn không tồn tại'};
        }
        const payload = {
          name: name,
          icon: icon,
          status: status,
        };
        await this.menucategoriesrepo.updateById(id, payload);
        return {message: 'Success'};
      }
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }

  @post('/menucategories/deletemenucategories')
  @authenticate('jwt')
  @response(200, {
    description: 'Protected resource',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  async deletemenucategories(
    // @inject(RestBindings.Http.REQUEST) request: ClientRequest,
    @requestBody() body: any = {},
  ): Promise<any> {
    const {id} = body;
    try {
      const ktdata = await this.menucategoriesrepo.findById(id);
      if (!ktdata) {
        return {message: 'Danh mục món ăn bạn chọn không tồn tại'};
      }
      await this.menuitemrepo.updateAll({status: false}, {category_id: id});
      await this.menucategoriesrepo.deleteById(id);
      return {message: 'Success'};
    } catch (e) {
      return {message: `Internal server Error Occurred, Please try again`, e};
    }
  }
}
