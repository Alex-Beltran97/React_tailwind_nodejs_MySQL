import { createPool } from 'mysql2';
import 'dotenv/config'

export const pool = createPool({
  host:'localhost',
  database:'prueba_node',
  user:process.env.USER,
  password:process.env.PASSWORD
}).promise();



