import {repository} from '@loopback/repository';
import {
  del,
  get,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {NavMenu} from '../models';
import {MenuItemsRepository, NavMenuRepository} from '../repositories';

export class NavMenuController {
  constructor(
    // @inject('services.JWTService') private jwtService: JWTService,
    @repository(NavMenuRepository)
    private navmenurepo: NavMenuRepository,
    @repository(MenuItemsRepository)
    private menuitemrepo: MenuItemsRepository,
  ) { }

  // =========================
  // API CŨ (GIỮ NGUYÊN)
  // =========================
  @get('/navmenu/listnavmenu')
  async listnavmenu(
    @param.query.number('skip') skip: number,
    @param.query.number('limit') limit: number,
    @param.query.string('search') search: string,
  ): Promise<any> {
    let searchWord = (search || '').toLowerCase();

    const filter: any = {
      skip: skip >= 0 ? skip : undefined,
      limit: limit >= 0 ? limit : undefined,
      where: {
        title: {ilike: `%${searchWord}%`},
        is_visible: true,
      },
      include: [
        {
          relation: 'navmenuitems',
          scope: {
            where: {is_visible: true},
          },
        },
      ],
    };

    try {
      let data = await this.navmenurepo.find(filter);

      const adminData = data.filter(item => item.static === 'admin');
      const customerData = data.filter(item => item.static === 'customer');

      return {
        message: 'Xuất dữ liệu thành công',
        adminData,
        customerData,
      };
    } catch (e) {
      return {message: 'Error', e};
    }
  }
  @get('/navmenu/list')
  async listAdmin(
    @param.query.number('skip') skip: number = 0,
    @param.query.number('limit') limit: number = 10,
  ): Promise<any> {
    try {
      const [data, count] = await Promise.all([
        this.navmenurepo.find({
          skip,
          limit,
          order: ['id DESC'],
        }),
        this.navmenurepo.count(),
      ]);
      console.log('data', data);

      return {
        data,
        count: count.count,
      };
    } catch (e) {
      return {message: 'Error', e};
    }
  }

  @post('/navmenu/save')
  async saveNavMenu(
    @requestBody() body: NavMenu,
  ): Promise<any> {
    try {
      if (body.id) {
        await this.navmenurepo.updateById(body.id, body);
        return {message: 'Update Success'};
      } else {
        console.log('body', body);
        await this.navmenurepo.create(body);
        return {message: 'Create Success'};
      }
    } catch (e) {
      return {message: 'Error', e};
    }
  }

  @del('/navmenu/{id}')
  async deleteNavMenu(
    @param.path.number('id') id: number,
  ): Promise<any> {
    try {
      await this.navmenurepo.deleteById(id);
      return {message: 'Delete Success'};
    } catch (e) {
      return {message: 'Error', e};
    }
  }
}
