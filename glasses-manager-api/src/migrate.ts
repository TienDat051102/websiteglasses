import * as bcrypt from 'bcryptjs';
import {readFileSync} from 'fs';
import {join} from 'path';
import {
  DiscountsRepository,
  InformationRepository,
  MenucategoriesRepository,
  MenuItemsRepository,
  NavMenuRepository,
  UsersRepository,
} from './repositories';

export const APP_MODELS = [
  'Customers',
  'Users',
  'Appointments',
  'Information',
  'Orders',
  'OrderStatuses',
  'OrderItems',
  'NavMenu',
  'NavMenuItems',
  'MenuItems',
  'MenuCategories',
  'ProductInventory',
  'Payments',
  'Discounts',
  'MenuItemDetails',
  'MenuItemImages',
];

export async function migrate(app: any, args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  await app.boot();
  await app.migrateSchema({existingSchema, models: APP_MODELS});

  try {
    await createUserData(app);
    await createData(app);
  } catch (e) {
    console.log('Lỗi seed:', e);
  }

  process.exit(0);
}

async function createUserData(app: any) {
  const userRepo = await app.getRepository(UsersRepository);

  const existingUsers = await userRepo.find();
  if (existingUsers.length === 0) {
    const users = [
      {
        username: 'admin',
        password: 'pass123',
        email: 'test@gmail.com',
        first_name: 'Tiến',
        last_name: 'Đạt',
        role: 'admin',
      },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      await userRepo.create(user);
    }

    console.log('✅ Tạo user thành công');
  } else {
    console.log('⚠️ User đã tồn tại');
  }
}

async function createData(app: any) {
  const informationRepo = await app.getRepository(InformationRepository);
  const informationdata = JSON.parse(
    readFileSync(join(__dirname, '../src/data/information.json'), 'utf-8'),
  );

  for (const record of informationdata) {
    const exists = await informationRepo.findOne({where: {id: record.id}});
    if (!exists) {
      const {id, ...data} = record;
      await informationRepo.create(data);
    }
  }
  console.log('✅ Information OK');

  const navmenuRepo = await app.getRepository(NavMenuRepository);
  const navmenudata = JSON.parse(
    readFileSync(join(__dirname, '../src/data/nav-menu.json'), 'utf-8'),
  );

  for (const record of navmenudata) {
    const exists = await navmenuRepo.findOne({where: {id: record.id}});
    if (!exists) {
      const {id, ...data} = record;
      await navmenuRepo.create(data);
    }
  }
  console.log('✅ NavMenu OK');

  const categoryRepo = await app.getRepository(MenucategoriesRepository);
  const categoryData = JSON.parse(
    readFileSync(join(__dirname, '../src/data/menu-categories.json'), 'utf-8'),
  );

  for (const record of categoryData) {
    const exists = await categoryRepo.findOne({where: {id: record.id}});
    if (!exists) {
      const {id, ...data} = record;
      await categoryRepo.create(data);
    }
  }
  console.log('✅ Categories OK');

  const menuitemRepo = await app.getRepository(MenuItemsRepository);
  const menuitemdata = JSON.parse(
    readFileSync(join(__dirname, '../src/data/menu-item.json'), 'utf-8'),
  );

  for (const record of menuitemdata) {
    const exists = await menuitemRepo.findOne({where: {id: record.id}});
    if (!exists) {
      const {id, ...data} = record;

      const payload = {
        ...data,
        stock: data.stock || 0,
        import_price: data.import_price || 0,
      };

      await menuitemRepo.create(payload);
    }
  }
  console.log('✅ MenuItems OK');

  const discountsRepo = await app.getRepository(DiscountsRepository);
  const discountsData = JSON.parse(
    readFileSync(join(__dirname, '../src/data/discounts.json'), 'utf-8'), // ✅ FIX tên file
  );

  for (const record of discountsData) {
    const exists = await discountsRepo.findOne({where: {id: record.id}});
    if (!exists) {
      const {id, ...data} = record;
      await discountsRepo.create(data);
    }
  }
  console.log('✅ Discounts OK');
}
