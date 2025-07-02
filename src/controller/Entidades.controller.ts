import { start } from "repl";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Entidades } from "../entity/Entidades";
import { Asentamientos } from "../entity/Asentamientos";

export const getListEN = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const { edificio } = req.body;
        
        const valid: boolean = edificio;

        const Repository = await AppDataSource.getRepository(Entidades); 
        
        const entidades = await Repository.find({ relations: { edificio: valid, empleado: true }, order: { entidad: 'ASC' }});
        
        //console.log(entidades)
        //return 

        res.status(200).json({ entidades })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getListENxEd = async (req, res) => {
    try {

        //return 
        const oid = req.params.id;
        //console.log(oid)
        const entidades = await AppDataSource.getRepository(Entidades)
            .createQueryBuilder('entidades')
            .leftJoinAndSelect("entidades.edificio", "edificios")
            .leftJoinAndSelect("entidades.empleado", "empleados")
            .where("entidades.edificio_oid = :oid", {oid: oid}).getMany(); 
        
        //console.log(entidades)
        res.status(200).json({ entidades })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getbyIdEN = async (req, res) => {
    try {
        const id = req.params.id
        const Repository = AppDataSource.getRepository(Entidades);
        const entidad = await Repository.findOneBy({ oid: id });

        res.status(200).json({ entidad })
    } catch (error) {
        console.error("Error al buscar un entidad", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const CreateEN = async (req, res) => {
    try {
        const {data} = req.body;
        //console.log(data);

        const Repository = AppDataSource.getRepository(Entidades);
        const entidad = await Repository.findOneBy({ entidad: data.entidad });
        
        if(entidad !== null) return res.status(500).json({ message: "Entidad ya existe" });

        await Repository.save(data);

        res.status(200).json({correcto: true, message: 'Entidad creado correctamente'})
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear entidad" });
    }
}

export const UpdateEN = async (req, res) => {
    try {
        const {data} = req.body;
        const oid = req.params.id;
        console.log("oid", oid, "datos", data)
        //return
        await AppDataSource.createQueryBuilder().update(Entidades).set(data).where("oid = :oid", {oid: oid}).execute();
        //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})

        //EdittoEmpleado = data
        res.status(200).json({correcto: true, message: 'Entidad actualizada correctamente'})


    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeleteEN = async (req, res) =>{

    try {
        const oid = req.params.id;
        console.log(oid);

        const Repositorio = AppDataSource.getRepository(Entidades);
        const entidad = await Repositorio.findOneBy({oid: oid})

        await Repositorio.remove(entidad);

        res.status(200).json({correcto: true, message: 'Entidad eliminado correctamente'})

        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}