import { start } from "repl";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Empleados } from "../entity/Empleados";
import { emit } from "process";
import { ILike } from "typeorm";

export const getUsers = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const userRepository = await AppDataSource.getRepository(Empleados);

        const users = await userRepository.find({
            relations: {
                puesto: true,
                entidad: true,
                asentamiento: true,

            },
            order: {
                clave: 'DESC'
            }
        });
        //console.log(users[0])

        // Convertir a UTF-8 si es necesario
        const empleadosUtf8 = users.map(user => {
            return Object.fromEntries(
                Object.entries(user).map(([key, value]) => {
                    if (typeof value === 'string') {
                        return [key, Buffer.from(value, 'utf-8').toString()];
                    }
                    return [key, value];
                })
            );
        });

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).json({ empleados: empleadosUtf8 })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getEmpleadoxClave = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        ////console.clear()r()
        const clave = req.params.clave
        //console.log(clave)

        const userRepository = await AppDataSource.getRepository(Empleados);

        const empleados = await userRepository.find({ where: { clave: ILike(`%${clave}%`) }, order: { clave: 'DESC' } })

        //const empleados = await AppDataSource.getRepository(Empleados)
        //    .createQueryBuilder('empleados')
        //    .where("empleados.clave = LIKE :clave", {clave: `${clave}`})
        //    .getMany()
        //    

        //console.log(empleados)



        //res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).json({ empleados })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}

export const getUserbyId = async (req, res) => {
    try {
        const id = req.params.id
        const userRepository = AppDataSource.getRepository(Empleados);
        const users = await userRepository.findOneBy({ clave: id });

        res.status(200).json({ users })
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const CreateUser = async (req, res) => {
    try {
        const { data } = req.body;
        //console.clear()r()
        console.log('----------------------------------------------------------------')
        console.log(data)
        
        //return

        const EmpRepository = AppDataSource.getRepository(Empleados);
        const user = await EmpRepository.findOneBy({ clave: data.clave });

        if (user !== null) return res.status(500).json({ message: "Empleado ya existe" });

        await EmpRepository.save(data);

        res.status(200).json({ correcto: true, message: 'Empleado creado correctamente' })
    }
    catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ message: "Error al momento de crear empleado" });
    }
}

export const EditEmpleado = async (req, res) => {
    try {
        const { data } = req.body;
        const oid = req.params.id;
        //console.clear()r()
        console.log('----------------------------------------------------------------')
        console.log("oid", oid, "datos", data)      

        //return
        await AppDataSource.createQueryBuilder().update(Empleados).set(data).where("clave = :clave", { clave: oid }).execute();
        //const EmpRepository = AppDataSource.getRepository(Empleados);
        //const Empleado = await EmpRepository.findOneBy({ oid: oid });

        //Empleado.

        //EdittoEmpleado = data
        res.status(200).json({ correcto: true, message: 'Empleado actualizado correctamente' })


    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeleteEmpleado = async (req, res) => {

    try {
        const oid = req.params.id;
        console.log(oid);

        const EmpleadoRepositorio = AppDataSource.getRepository(Empleados);
        const EmpDelete = await EmpleadoRepositorio.findOneBy({ clave: oid })

        await EmpleadoRepositorio.remove(EmpDelete);

        res.status(200).json({ correcto: true, message: 'Empleado eliminado correctamente' })


    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}

