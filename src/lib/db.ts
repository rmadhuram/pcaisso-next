import mysql from "mysql2/promise";

let pool: any;

export default async function connectDB() {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT
        ? parseInt(process.env.MYSQL_PORT)
        : undefined,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  } catch (error) {
    console.log(error);
  }
  return pool;
}
