import "reflect-metadata";
import { DataSource } from "typeorm";
import { TestData } from "./entity/testData";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  logging: true,
  replication: {
    master: {
      host: process.env.DB_MASTER_HOST,
      port: Number(process.env.DB_MASTER_PORT),
      username: process.env.DB_MASTER_USER,
      password: process.env.DB_MASTER_PASS,
      database: process.env.DB_MASTER_NAME,
    },
    slaves: [
      {
        host: process.env.DB_SLAVE1_HOST,
        port: Number(process.env.DB_SLAVE1_PORT),
        username: process.env.DB_SLAVE1_USER,
        password: process.env.DB_SLAVE1_PASS,
        database: process.env.DB_SLAVE1_NAME,
      },
      // Se quiser adicionar outro slave, basta descomentar:
      // {
      //   host: process.env.DB_SLAVE2_HOST,
      //   port: Number(process.env.DB_SLAVE2_PORT),
      //   username: process.env.DB_SLAVE2_USER,
      //   password: process.env.DB_SLAVE2_PASS,
      //   database: process.env.DB_SLAVE2_NAME,
      // },
    ],
  },
  entities: [TestData],
  synchronize: false, // nunca use true em produção
});
