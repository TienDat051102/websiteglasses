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
  AppointmentsRepository,
  CustomersRepository,
} from '../repositories';

import {EmailService} from '../services/email.service';
import {JWTService} from '../services/jwt.service';

export class AppointmentsController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,

    @repository(AppointmentsRepository)
    private appointmentRepo: AppointmentsRepository,

    @repository(CustomersRepository)
    private customerRepo: CustomersRepository,

    @inject('services.EmailService')
    private emailService: EmailService,
  ) { }

  @post('/appointments/create')
  async create(@requestBody() body: any = {}): Promise<any> {
    const {
      customerId,
      name,
      email,
      phone,
      appointment_time,
      service_type,
      note,
    } = body;

    try {
      if (!appointment_time) {
        return {error: 'Thiếu thời gian đặt lịch'};
      }

      if (!customerId && (!name || !phone)) {
        return {error: 'Thiếu thông tin khách hàng'};
      }
      if (new Date(appointment_time) < new Date()) {
        return {error: 'Không thể đặt lịch trong quá khứ'};
      }

      const existed = await this.appointmentRepo.findOne({
        where: {
          appointment_time,
          status: {inq: ['pending', 'confirmed']},
        },
      });

      if (existed) {
        return {error: 'Khung giờ này đã có người đặt'};
      }

      let finalCustomerId = customerId;

      if (!customerId) {
        const existedCustomer = await this.customerRepo.findOne({
          where: {or: [{email}, {phone_number: phone}]},
        });

        if (existedCustomer) {
          finalCustomerId = existedCustomer.id;
        } else {
          const newCustomer = await this.customerRepo.create({
            name,
            email,
            phone_number: phone,
          });
          finalCustomerId = newCustomer.id;
        }
      }

      const data = await this.appointmentRepo.create({
        customerId: finalCustomerId,
        appointment_time,
        service_type: service_type || 'eye_test',
        note,
        status: 'pending',
      });

      if (email) {
        await this.emailService.sendEmail(
          email,
          'Xác nhận đặt lịch',
          `Bạn đã đặt lịch thành công vào ${new Date(
            appointment_time,
          ).toLocaleString()}`,
        );
      }

      return {
        message: 'Đặt lịch thành công',
        data,
      };
    } catch (e) {
      return {error: e};
    }
  }

  @get('/appointments/list')
  @authenticate('jwt')
  async list(
    @param.query.string('date') date?: string,
  ): Promise<any> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const filterDate = date || today;

      const start = new Date(`${filterDate}T00:00:00`).toISOString();
      const end = new Date(`${filterDate}T23:59:59`).toISOString();

      const filter: any = {
        where: {
          appointment_time: {
            between: [start, end],
          },
        },
        order: ['appointment_time ASC'],
      };

      const data = await this.appointmentRepo.find(filter);
      const count = await this.appointmentRepo.count(filter.where);

      return {data, count: count.count};
    } catch (e) {
      return {error: e};
    }
  }

  @get('/appointments/{id}')
  @authenticate('jwt')
  async detail(@param.path.number('id') id: number) {
    try {
      const data = await this.appointmentRepo.findById(id, {
        include: [{relation: 'customerInfo'}],
      });
      return {data};
    } catch (e) {
      return {error: e};
    }
  }

  @post('/appointments/update')
  @authenticate('jwt')
  async update(@requestBody() body: any = {}) {
    const {id, status} = body;

    if (!id || !status) {
      return {error: 'Thiếu dữ liệu'};
    }

    try {
      const existed = await this.appointmentRepo.findById(id);

      if (!existed) {
        return {error: 'Không tìm thấy lịch'};
      }

      await this.appointmentRepo.updateById(id, {
        status,
      });

      return {message: 'Cập nhật thành công'};
    } catch (e) {
      return {error: e};
    }
  }

  @post('/appointments/handle')
  @authenticate('jwt')
  async handle(@requestBody() body: any = {}) {
    const {id, action} = body;

    try {
      const data = await this.appointmentRepo.findById(id, {
        include: [{relation: 'customerInfo'}],
      });

      if (!data) {
        return {error: 'Không tìm thấy'};
      }

      const email = data.customerInfo?.email;

      if (action === 'accept') {
        await this.appointmentRepo.updateById(id, {
          status: 'confirmed',
        });

        if (email) {
          await this.emailService.sendEmail(
            email,
            'Xác nhận lịch',
            `Lịch của bạn đã được xác nhận vào ${new Date(
              data.appointment_time,
            ).toLocaleString()}`,
          );
        }

        return {message: 'Đã xác nhận'};
      } else {
        await this.appointmentRepo.updateById(id, {
          status: 'canceled',
        });

        if (email) {
          await this.emailService.sendEmail(
            email,
            'Hủy lịch',
            'Rất tiếc lịch của bạn đã bị hủy',
          );
        }

        return {message: 'Đã hủy'};
      }
    } catch (e) {
      return {error: e};
    }
  }
}
