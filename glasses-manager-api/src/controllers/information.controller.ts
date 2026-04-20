import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {InformationRepository} from '../repositories';
import {JWTService} from '../services/jwt.service';

export class InformationController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(InformationRepository)
    private repo: InformationRepository,
  ) { }

  @get('/information')
  async getInformation(): Promise<any> {
    try {
      const data = await this.repo.findOne({
        where: {id: 1},
      });

      if (!data) {
        return {
          message: 'Không có dữ liệu',
          data: null,
        };
      }

      return {
        message: 'Lấy dữ liệu thành công',
        data: data.menu,
      };
    } catch (e) {
      return {
        message: 'Lỗi server',
        error: e,
      };
    }
  }


  @post('/information')
  async createInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              menu: {type: 'object'},
            },
          },
        },
      },
    })
    body: {menu: object},
  ): Promise<any> {
    try {
      const existing = await this.repo.findOne({
        where: {id: 1},
      });

      if (existing) {
        return {
          message: 'Dữ liệu đã tồn tại (id = 1)',
        };
      }

      const data = await this.repo.create({
        id: 1,
        menu: body.menu,
      });

      return {
        message: 'Tạo dữ liệu thành công',
        data,
      };
    } catch (e) {
      return {
        message: 'Lỗi tạo dữ liệu',
        error: e,
      };
    }
  }


  @put('/information')
  async updateInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              menu: {type: 'object'},
            },
            required: ['menu'],
          },
        },
      },
    })
    body: {menu: object},
  ): Promise<any> {
    try {
      await this.repo.updateById(1, {
        menu: body.menu,
      });

      return {
        message: 'Cập nhật toàn bộ thành công',
      };
    } catch (e) {
      return {
        message: 'Lỗi cập nhật',
        error: e,
      };
    }
  }


  @patch('/information')
  async patchInformation(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    })
    body: object,
  ): Promise<any> {
    try {
      const existing = await this.repo.findById(1);

      if (!existing) {
        return {
          message: 'Không tìm thấy dữ liệu',
        };
      }

      const updatedMenu = {
        ...existing.menu,
        ...body,
      };

      await this.repo.updateById(1, {
        menu: updatedMenu,
      });

      return {
        message: 'Cập nhật từng phần thành công',
        data: updatedMenu,
      };
    } catch (e) {
      return {
        message: 'Lỗi patch',
        error: e,
      };
    }
  }
}
