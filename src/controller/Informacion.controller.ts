import { AppDataSource } from "../conexion/DB_Conexion";
import { Informacion } from "../entity/informacion";


export const getInfo = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Informacion); 
        
        const informacion = await Repository.find({
            order: {
                oid: 'DESC'
            }}
        );
        //console.log(users[0])

        res.status(200).json({ informacion })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const CreateInfo = async (req, res) => {
    try {
        ////console.clear()r()
        const {data} = req.body;
        console.log('info: ',data);
        //return
        const Repository = AppDataSource.getRepository(Informacion);
        //const activo = await Repository.findOneBy({ activo: data.oid });
        
        //if(activo !== null) return res.status(500).json({ message: "Activo ya existe" });

        await Repository.save(data);

        //console.log(Repository)

        res.status(200).json({correcto: true, message: 'Info creado correctamente'})
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear Info" });
    }
}

export const UpdateInfo = async (req, res) => {
    try {
        const {data} = req.body;
        const oid = req.params.id;
        //console.clear()r()
        console.log("oid", oid, "info", data)
        //return
        await AppDataSource.createQueryBuilder().update(Informacion).set(data).where("oid = :oid", {oid: oid}).execute();
        //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})

        //EdittoEmpleado = data
        res.status(200).json({correcto: true, message: 'Info actualizado correctamente'})


    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeleteInfo = async (req, res) =>{

    try {
        const oid = req.params.id;
        console.log(oid);

        const Repositorio = AppDataSource.getRepository(Informacion);
        const Delete = await Repositorio.findOneBy({oid: oid})

        await Repositorio.remove(Delete);

        res.status(200).json({correcto: true, message: 'Info eliminado correctamente'})

        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}
