import { start } from "repl";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Proveedores } from "../entity/Proveedores";

export const getListPROV = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Proveedores); 
        
        const proveedores = await Repository.find({ order: { proveedor: 'ASC' }});
        //console.log(proveedores)

        res.status(200).json({ proveedores })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getbyIdPROV = async (req, res) => {
    try {
        const id = req.params.id
        const Repository = AppDataSource.getRepository(Proveedores);
        const proveedor = await Repository.findOneBy({ oid: id });

        res.status(200).json({ proveedor })
    } catch (error) {
        console.error("Error al buscar un proveedor", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const CreatePROV = async (req, res) => {
    try {
        const {data} = req.body;
        //console.log(data);

        const Repository = AppDataSource.getRepository(Proveedores);
        const proveedor = await Repository.findOneBy({ proveedor: data.proveedor });
        
        if(proveedor !== null) return res.status(500).json({ message: "proveedor ya existe" });

        await Repository.save(data);

        res.status(200).json({correcto: true, message: 'proveedor creado correctamente'})
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear proveedor" });
    }
}

export const UpdatePROV = async (req, res) => {
    try {
        const {data} = req.body;
        const oid = req.params.id;
        console.log("oid", oid, "datos", data)
        //return
        await AppDataSource.createQueryBuilder().update(Proveedores).set(data).where("oid = :oid", {oid: oid}).execute();
        //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})

        //EdittoEmpleado = data
        res.status(200).json({correcto: true, message: 'proveedor actualizada correctamente'})


    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeletePROV = async (req, res) =>{

    try {
        const oid = req.params.id;
        console.log(oid);

        const Repositorio = AppDataSource.getRepository(Proveedores);
        const proveedor = await Repositorio.findOneBy({oid: oid})

        await Repositorio.remove(proveedor);

        res.status(200).json({correcto: true, message: 'proveedor eliminado correctamente'})

        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}