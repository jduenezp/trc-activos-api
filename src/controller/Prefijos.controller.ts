import { start } from "repl";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Prefijos } from "../entity/Prefijos";

export const getListPREF = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Prefijos); 
        
        const prefijos = await Repository.find({ order: { oid: 'DESC' }});
        //console.log(prefijos)

        res.status(200).json({ prefijos })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}