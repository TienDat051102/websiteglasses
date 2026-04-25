import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {api, get, param, post, requestBody} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {CustomersRepository} from '../repositories';
import {CustomerJWTService, JWTService} from '../services';

@api({
  components: {
    securitySchemes: {
      'customer-jwt': {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
})
export class CustomerController {
  constructor(
    @inject('services.CustomerJWTService')
    private customerJWTService: CustomerJWTService,
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(CustomersRepository)
    private customerRepo: CustomersRepository,
  ) {}

  private saveBase64Image(base64: string): string {
    if (!base64) return '';

    const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);

    if (!matches) return base64;

    const ext = matches[1].split('/')[1];
    const data = matches[2];

    const buffer = Buffer.from(data, 'base64');

    const fileName = `${uuidv4()}.${ext}`;

    const filePath = path.resolve(__dirname, '../../public/uploads', fileName);

    fs.writeFileSync(filePath, new Uint8Array(buffer));

    return `/uploads/${fileName}`;
  }

  @post('/customer/create')
  async create(@requestBody() body: any): Promise<any> {
    const {name, email, phone_number, password, address, avatar, note} = body;

    try {
      const exists = await this.customerRepo.findOne({
        where: {
          or: [
            ...(email ? [{email}] : []),
            ...(phone_number ? [{phone_number}] : []),
          ],
        },
      });

      if (exists) {
        return {
          error: 'Email hoặc số điện thoại đã tồn tại',
        };
      }

      const customer = await this.customerRepo.create({
        name,
        email,
        phone_number,
        password: await bcrypt.hash(password, 10),
        address,
        avatar: this.saveBase64Image(avatar),
        note,
        customer_type: 'new',
        login_attempts: 0,
        created_at: new Date(),
      });

      return {
        message: 'Tạo tài khoản khách hàng thành công',
        data: customer,
      };
    } catch (e: any) {
      return {
        error: e.message || 'Lỗi server',
      };
    }
  }

  @post('/customer/update-profile', {
    security: [{'customer-jwt': []}],
    responses: {
      '200': {
        description: 'Update profile success',
      },
    },
  })
  @authenticate('customer-jwt')
  async updateProfile(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @requestBody() body: any,
  ): Promise<any> {
    try {
      console.log('Current user profile:', currentUserProfile);
      const customerId = currentUserProfile.id;

      const {name, email, phone_number, avatar, address, phone_delivery} = body;

      console.log('Received update profile request:', body);

      if (email || phone_number) {
        const exists = await this.customerRepo.findOne({
          where: {
            and: [
              {
                or: [
                  ...(email ? [{email}] : []),
                  ...(phone_number ? [{phone_number}] : []),
                ],
              },
              {id: {neq: customerId}},
            ],
          },
        });

        if (exists) {
          return {
            error: 'Email hoặc số điện thoại đã tồn tại',
          };
        }
      }

      await this.customerRepo.updateById(customerId, {
        name,
        email,
        avatar: avatar ? this.saveBase64Image(avatar) : undefined,
        address,
        phone_delivery,
      });

      const updated = await this.customerRepo.findById(customerId);

      const {password, ...safeData} = updated;

      return {
        message: 'Cập nhật thông tin thành công',
        data: safeData,
      };
    } catch (e: any) {
      return {
        error: e.message || 'Lỗi server',
      };
    }
  }

  @post('/customer/login')
  async login(@requestBody() body: any) {
    const {phone_number, email, password, otp} = body;

    let where: any = {};
    if (phone_number) {
      where.phone_number = phone_number;
    } else if (email) {
      where.email = email;
    }

    const customer = await this.customerRepo.findOne({
      where: where,
    });

    if (!customer) {
      return {error: 'Không tồn tại tài khoản khách hàng'};
    } else {
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return {error: 'Sai mật khẩu'};
      }
      const payload = {
        id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number,
      };

      const token = this.customerJWTService.generateToken(payload);
      console.log('Generated JWT token for customer:', token);
      return {
        token,
        customer,
      };
    }
  }

  @get('/customer/list')
  @authenticate('jwt')
  async listCustomer(
    @param.query.number('skip') skip = 0,
    @param.query.number('limit') limit = 20,
    @param.query.string('phone_number') phone_number?: string,
  ): Promise<any> {
    try {
      const where: any = {};

      if (phone_number) {
        where.phone_number = {
          ilike: `%${phone_number}%`,
        };
      }

      const filter = {
        skip,
        limit,
        where,
        order: ['created_at DESC'],
      };

      const data = await this.customerRepo.find(filter);
      const count = await this.customerRepo.count(where);

      return {
        message: 'Danh sách khách hàng',
        data,
        count: count.count,
      };
    } catch (e) {
      return {error: e.message};
    }
  }

  @post('/customer/save')
  @authenticate('jwt')
  async saveCustomer(@requestBody() body: any): Promise<any> {
    const {id, name, email, phone_number, address, note, customer_type} = body;

    try {
      if (!id) {
        const exists = await this.customerRepo.findOne({
          where: {
            or: [...(email ? [{email}] : []), {phone_number}],
          },
        });

        if (exists) {
          return {
            error: 'Email hoặc số điện thoại đã tồn tại',
          };
        }

        const customer = await this.customerRepo.create({
          name,
          email,
          phone_number,
          address,
          note,
          customer_type: customer_type || 'new',
          created_at: new Date(),
        });

        return {
          message: 'Tạo khách hàng thành công',
          data: customer,
        };
      }

      // ======================
      // UPDATE CUSTOMER
      // ======================
      const customer = await this.customerRepo.findById(id);

      if (!customer) {
        return {error: 'Không tìm thấy khách hàng'};
      }

      await this.customerRepo.updateById(id, {
        name,
        email,
        phone_number,
        address,
        note,
        customer_type,
      });

      return {
        message: 'Cập nhật khách hàng thành công',
      };
    } catch (e) {
      return {error: e.message};
    }
  }

  @get('/customer/{id}')
  @authenticate('jwt')
  async getCustomer(@param.path.number('id') id: number): Promise<any> {
    try {
      const data = await this.customerRepo.findById(id, {
        include: ['orders', 'eyeExams', 'appointments'],
      });

      return {data};
    } catch (e) {
      return {error: 'Không tìm thấy khách hàng'};
    }
  }

  @post('/customer/delete')
  @authenticate('jwt')
  async deleteCustomer(@requestBody() body: {id: number}): Promise<any> {
    try {
      await this.customerRepo.deleteById(body.id);

      return {message: 'Xóa khách hàng thành công'};
    } catch (e) {
      return {error: e.message};
    }
  }
}
