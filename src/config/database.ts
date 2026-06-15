import mysql from "mysql2/promise";
import { config } from "./config";

const db = mysql.createPool({
  host: config.db.host,
  port: Number(config.db.port) || 3306,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
