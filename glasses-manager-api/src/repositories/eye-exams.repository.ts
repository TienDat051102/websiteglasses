import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgdbDataSource} from '../datasources';
import {EyeExams, EyeExamsRelations} from '../models';

export class EyeExamsRepository extends DefaultCrudRepository<
  EyeExams,
  typeof EyeExams.prototype.id,
  EyeExamsRelations
> {
  constructor(@inject('datasources.pgdb') dataSource: PgdbDataSource) {
    super(EyeExams, dataSource);
  }

  async findByCustomerId(customerId: number) {
    const data = await this.find({
      where: {customerId},
      order: ['created_at DESC'],
    });

    return data.map(item => this.toResponse(item));
  }

  toResponse(item: EyeExams) {
    return {
      id: item.id,
      customerId: item.customerId,

      leftEyeDegree: item.left_eye_degree,
      rightEyeDegree: item.right_eye_degree,

      astigmatismLeft: item.astigmatism_left,
      astigmatismRight: item.astigmatism_right,

      pupilDistance: item.pupil_distance,

      note: item.note,

      source: {
        key: item.source,
        label: this.getSourceLabel(item.source),
      },

      createdAt: item.created_at,
    };
  }

  private getSourceLabel(source?: string) {
    switch (source) {
      case 'shop':
        return 'Đo tại cửa hàng';
      case 'hospital':
        return 'Bệnh viện';
      case 'online':
        return 'Đo online';
      default:
        return 'Không xác định';
    }
  }
}
