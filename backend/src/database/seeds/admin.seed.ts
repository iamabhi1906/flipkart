import dataSource from '../../data-source';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/users/entities/user.entity';
import { UserProfile } from '../../modules/users/entities/user-profile.entity';
import { AdminProfile } from '../../modules/admins/entities/admin.entity';
import { UserRoleEnum, UserStatusEnum } from '../../modules/common/enums/erd.enums';

async function seedAdmin() {
  console.log('Initializing DataSource for Admin seeding...');
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const userRepository = dataSource.getRepository(User);
  const userProfileRepository = dataSource.getRepository(UserProfile);
  const adminProfileRepository = dataSource.getRepository(AdminProfile);

  const targetEmail = 'iamabhi1906@gmail.com';
  let user = await userRepository.findOne({ where: { email: targetEmail } });

  if (user) {
    console.log(`User with email ${targetEmail} exists. Updating to ADMIN role...`);
    user.role = UserRoleEnum.ADMIN;
    user.status = UserStatusEnum.ACTIVE;
    await userRepository.save(user);
  } else {
    console.log(`Creating new ADMIN user with email ${targetEmail}...`);
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    user = userRepository.create({
      email: targetEmail,
      password: hashedPassword,
      role: UserRoleEnum.ADMIN,
      status: UserStatusEnum.ACTIVE,
    });
    await userRepository.save(user);

    const profile = userProfileRepository.create({
      userId: user.id,
      firstName: 'Abhishek',
      lastName: 'Admin',
    });
    await userProfileRepository.save(profile);
  }

  let adminProfile = await adminProfileRepository.findOne({ where: { userId: user.id } });
  if (!adminProfile) {
    adminProfile = adminProfileRepository.create({ userId: user.id });
    await adminProfileRepository.save(adminProfile);
  }

  console.log(`Admin user ready: ${user.email} (Role: ${user.role})`);
  await dataSource.destroy();
}

seedAdmin()
  .then(() => {
    console.log('Admin seeding completed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  });
