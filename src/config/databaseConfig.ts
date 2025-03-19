import { registerAs } from "@nestjs/config";

import { DataSource, DataSourceOptions } from "typeorm";

import { config } from "dotenv";
import * as console from "node:console";
import * as process from "node:process";
// loading the environment variables
config();
// loading the environment variables according to the path of env
config({ path: `.env.${process.env.NODE_ENV}` });
//const prod = process.env.NODE_ENV === "production";
const prod = process.env.NODE_ENV === "production";

console.log(process.env.DATABASE_PORT);
const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port:  parseInt(process.env.DATABASE_PORT, 10) || 3370,
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  maxQueryExecutionTime: 1000,
  cache: false,
  logging: prod ? ["query", "error", "log"] : "all",
  logger: "advanced-console",
  //entities: [__dirname + "/../**/entities/*.{ts,js}"],
  entities: [__dirname + "/../**/*.entity.{ts,js}"],
  migrations: [__dirname + "/../**/migrations/**/*{.ts,.js}"],
  migrationsTableName: "typeorm_migrations",
  synchronize: true, // never use TRUE in production!
  // debug: true,
  //acquireTimeout: 3000, // 3 seconds
  connectTimeout: 10000,
};
export default registerAs("typeorm", () => dataSourceOptions);

export const connectionSource = new DataSource(dataSourceOptions);
