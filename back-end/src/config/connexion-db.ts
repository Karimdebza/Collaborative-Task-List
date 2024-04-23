import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Taskpwd',
    database: 'TaskList',
    port: 3307, //
    waitForConnections: true,
})
export default pool;