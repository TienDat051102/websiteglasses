import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {MenuItemsRepository} from '../repositories';
import {MenuItemDetailsRepository} from '../repositories/menu-item-details.repository';
import {MenuItemImagesRepository} from '../repositories/menu-item-images.repository';
import {JWTService} from '../services/jwt.service';

export class MenuItemController {
  constructor(
    @inject('services.JWTService') private jwtService: JWTService,
    @repository(MenuItemsRepository) private menuRepo: MenuItemsRepository,
    @repository(MenuItemImagesRepository)
    private imageRepo: MenuItemImagesRepository,
    @repository(MenuItemDetailsRepository)
    private detailRepo: MenuItemDetailsRepository,
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

      include: [
        {
          relation: 'images',
        },
        {
          relation: 'details',
        },
      ],
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
      include: [
        {
          relation: 'images',
        },
        {
          relation: 'details',
        },
      ],
    };

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
      newImagesDetails = [],
      deletedImageIds = [],
      details = [],
    } = body;

    try {
      let imageUrl = image;

      if (image && image.startsWith('data:image')) {
        imageUrl = this.saveBase64Image(image);
      }

      const payload: any = {
        name,
        description,
        image: imageUrl,
        price,
        status,
        category_id,
        stock: stock || 0,
        import_price,
        brand,
        type,
        is_featured,
      };

      let productId = id;

      if (!id) {
        const exist = await this.menuRepo.findOne({
          where: {name},
        });

        if (exist) {
          return {message: 'Sản phẩm đã tồn tại'};
        }

        const created = await this.menuRepo.create(payload);
        productId = created.id;
      } else {
        const exist = await this.menuRepo.findById(id);

        if (!exist) {
          return {message: 'Không tìm thấy sản phẩm'};
        }

        await this.menuRepo.updateById(id, payload);

        const images = await this.imageRepo.find({
          where: {id: {inq: deletedImageIds}},
        });
        for (const img of images) {
          const filePath = path.join(__dirname, '../../public', img.image_url);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
        await this.imageRepo.deleteAll({
          id: {inq: deletedImageIds},
        });

        await this.detailRepo.deleteAll({
          menu_item_id: id,
        });
      }

      for (let i = 0; i < newImagesDetails.length; i++) {
        let img = newImagesDetails[i];

        let imgUrl = this.saveBase64Image(img);

        await this.imageRepo.create({
          menu_item_id: productId,
          image_url: imgUrl,
          is_main: true,
        });
      }

      if (details.length > 0) {
        const d = details[0];

        await this.detailRepo.create({
          menu_item_id: productId,
          description: d.description,
          specifications: d.specifications || '',
        });
      }

      return {
        message: id ? 'Cập nhật thành công' : 'Thêm thành công',
      };
    } catch (e) {
      return {
        error: 'Internal server error',
        detail: e,
      };
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
