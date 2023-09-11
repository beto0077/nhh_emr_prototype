//import { createConnection } from 'mysql2/promise';
import { createPool } from 'mysql2/promise';
import * as dotenv from "dotenv"

dotenv.config();

export const db = createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
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