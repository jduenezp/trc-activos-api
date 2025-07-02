import "reflect-metadata"
import * as express from 'express'
import * as cors from 'cors'
import { AppDataSource } from "./conexion/DB_Conexion"
import ActivoRouter from './routes/index.routes'
import * as cookieParse from 'cookie-parser'
import  'dotenv/config';

const app = express();
app.use(cors({origin: `http://${process.env.IP_L}:${process.env.CLIENTE_PORT}`, credentials: true}));
app.use(express.json());
app.use(cookieParse());

app.use('/api', ActivoRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");
    app.listen(process.env.PORT || 3001, () => console.log(`🚀 Servidor en http://${process.env.IP_L}:${process.env.PORT}`));
  })
  .catch((error) => console.log("Error conectando la BD:", error));

/*app.listen(port, () =>{
    console.log("Servidor prendido", port)
})
*/