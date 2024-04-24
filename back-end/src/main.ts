import  express,{ Request, Response,Application } from "express";
import dotenv from "dotenv"
import cors from "cors";
import  bodyParser  from "body-parser";
import pool from "./config/connexion-db";
import {userRouter} from "./Routes/users.route";
dotenv.config();

const {API_PORT} = process.env;


const app : Application = express();

app.use(cors());

app.get('/', (req:Request, res:Response) :void => {
    res.json({
        message: "good path "
    })
})

app.listen(API_PORT, (): void => {
    console.log("lapllication tourne sur le port "+ API_PORT)
    
})
app.use(bodyParser.json());
app.use("/user", userRouter);

