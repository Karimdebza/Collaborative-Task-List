import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Taskpwd',
    database: 'Task-list',
    port: 3306, //
    waitForConnections: true,
})
export default pool;