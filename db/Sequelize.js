import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  post: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  dialectOptions: {
    ssl: true,
  },
});

try {
  await sequelize.authenticate();
  console.log('Database connection successful');
} catch (error) {
  console.error(error);
  process.exit(1);
}

export default sequelize;
