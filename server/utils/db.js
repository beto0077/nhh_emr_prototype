//import { createConnection } from 'mysql2/promise';
import { createPool } from 'mysql2/promise';
import * as dotenv from "dotenv"

dotenv.config();

export const db = createPool({
  host: '127.0.0.1',
  //host: '192.168.10.122',
  port: 3306,
  user: 'renderuser',
  password: process.env.PSWD,
  database: 'hmsdb'
});

/*(async () => {
  try {
    await db.connect();
    console.log('MySQL connected');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
})();*/

//export default db;