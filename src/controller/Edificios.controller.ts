import { start } from "repl";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Edificios } from "../entity/Edificios";

export const getListED = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Edificios); 
        
        const edificios = await Repository.find({
            relations: {
                asentamiento: true,
            },
            order: {
                oid: 'DESC'
            }}
        );
        //console.log(users[0])

        res.status(200).json({ edificios })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}
export const getListEdsinAsent = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Edificios); 
        
        const edificios = await Repository.find({
            relations: {
                asentamiento: false,
            },
            order: {
                oid: 'DESC'
            }}
        );
        //console.log(users[0])

        res.status(200).json({ edificios })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getbyIdED = async (req, res) => {
    try {
        const id = req.params.id
        const Repository = AppDataSource.getRepository(Edificios);
        const edificio = await Repository.findOneBy({ oid: id });

        res.status(200).json({ edificio })
    } catch (error) {
        console.error("Error al buscar un edificio", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const CreateED = async (req, res) => {
    try {
        //console.clear()r()
        const {data} = req.body;
        //console.clear()r()
        console.log('EDIFICIO: ',data);
        //return
        const Repository = AppDataSource.getRepository(Edificios);
        const edificio = await Repository.findOneBy({ edificio: data.edificio });
        
        if(edificio !== null) return res.status(500).json({ message: "Edificio ya existe" });

        await Repository.save(data);

        res.status(200).json({correcto: true, message: 'Edificio creado correctamente'})
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear edificio" });
    }
}

export const UpdateED = async (req, res) => {
    try {
        const {data} = req.body;
        const oid = req.params.id;
        console.log("oid", oid, "datos", data)
        //return
        await AppDataSource.createQueryBuilder().update(Edificios).set(data).where("oid = :oid", {oid: oid}).execute();
        //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})

        //EdittoEmpleado = data
        res.status(200).json({correcto: true, message: 'Edificio actualizado correctamente'})


    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeleteED = async (req, res) =>{

    try {
        const oid = req.params.id;
        console.log(oid);

        const Repositorio = AppDataSource.getRepository(Edificios);
        const EmpDelete = await Repositorio.findOneBy({oid: oid})

        await Repositorio.remove(EmpDelete);

        res.status(200).json({correcto: true, message: 'Edificio eliminado correctamente'})

        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}