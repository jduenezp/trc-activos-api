import { AppDataSource } from "../conexion/DB_Conexion";
import { Asentamientos } from "../entity/Asentamientos";


export const getListAsentamientos = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Asentamientos); 
        
        const asentamientos = await Repository.find({});
        //console.log(users[0])

        res.status(200).json({ asentamientos })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getAsentamientosbyCP = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const { cp } : any = req.params;
        //console.log(cp)

        const Repository = await AppDataSource.getRepository(Asentamientos); 
        
        const asentamientos = await Repository.find({where: { d_codigo: cp }});
        

        res.status(200).json({ asentamientos })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}