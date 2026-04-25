import {repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';

import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {EyeExams} from '../models';
import {EyeExamsRepository} from '../repositories';

export class EyeExamsController {
  constructor(
    @repository(EyeExamsRepository)
    public eyeRepo: EyeExamsRepository,
  ) {}

  @post('/eye-exams', {
    responses: {
      '200': {
        description: 'Eye exam created',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EyeExams),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EyeExams, {
            title: 'NewEyeExam',
            exclude: ['id'],
          }),
        },
      },
    })
    data: Omit<EyeExams, 'id'>,
  ): Promise<EyeExams> {
    return this.eyeRepo.create(data);
  }

  @get('/eye-exams', {
    responses: {
      '200': {
        description: 'List eye exams',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EyeExams),
            },
          },
        },
      },
    },
  })
  async find(): Promise<EyeExams[]> {
    return this.eyeRepo.find({
      order: ['created_at DESC'],
    });
  }

  @get('/me/eye-exams')
  @authenticate('customer-jwt')
  async findMyEyeExams(
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<EyeExams[]> {
    return this.eyeRepo.find({
      where: {customerId: currentUser.id},
      order: ['created_at DESC'],
    });
  }

  @get('/eye-exams/{id}')
  async findById(@param.path.number('id') id: number): Promise<EyeExams> {
    const exam = await this.eyeRepo.findById(id);

    if (!exam) {
      throw new HttpErrors.NotFound('Eye exam not found');
    }

    return exam;
  }

  @patch('/eye-exams/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() data: Partial<EyeExams>,
  ): Promise<void> {
    await this.eyeRepo.updateById(id, data);
  }

  @del('/eye-exams/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eyeRepo.deleteById(id);
  }
}
