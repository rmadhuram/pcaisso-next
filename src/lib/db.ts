import mysql from "mysql2/promise";

let pool: mysql.Pool;

export default async function getPool(): Promise<mysql.Pool> {
  if (pool) {
    return pool;
  }

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
      connectionLimit: 10
    });
    return pool;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function executeQuery(query: string, params: any[]): Promise<any> {
  const pool = await getPool();
  const connection = await pool.getConnection();
  const results = await connection.execute(query, params);
  connection.release();
  return results;
}