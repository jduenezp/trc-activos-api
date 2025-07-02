import { table } from "console";
import { AppDataSource } from "../conexion/DB_Conexion";
import { Activos_table } from "../entity/Activos";


/*export const getListAc = async (req, res) => {
    try {
        const { skip, take, objeto, departamento, empleado } = req.query;
        console.log(req.query)
        //const [activos, total] =  await AppDataSource.getRepository(Activos_table).createQueryBuilder("activos").orderBy("activo.oid", "DESC").take(1).getManyAndCount();
        // const Repository = await AppDataSource.getRepository(Activos_table); 
        const Repository = AppDataSource.getRepository(Activos_table);
        const [activos, total] = await Repository.findAndCount({
            relations: {
                empleado: true,
                prefijo: true,
                tipo: true,
                proveedor: true,
                entidad: { edificio: { asentamiento: false, empleado: true } },

            },

            order: {
                oid: 'DESC'
            },
            where: { activo: "true", objeto: objeto, entidad: {entidad: departamento},  empleado: {nombre_completo: empleado}},
            
            skip: Number(skip) || 0,  // <- Parámetro desde el front
            take: Number(take) || 10  // <- Parámetro desde el fronts

        },
        );
        //console.clear()
        //console.log('llego', 'skip:', Number(req.query.skip))

        //const total = await Repository.count({ where: {activo: 'true'}})


        // const activos = await AppDataSource.getRepository(Activos_table)
        //     .createQueryBuilder('activos')
        //     .leftJoinAndSelect("activos.entidad", "entidades")
        //     .leftJoinAndSelect("entidades.edificio", "edificios")
        //     .leftJoinAndSelect("edificios.asentamiento", "asentamientos")
        //     .leftJoinAndSelect("activos.prefijo", "prefijos")
        //     .leftJoinAndSelect("activos.tipo", "tipos")
        //     .leftJoinAndSelect("activos.proveedor", "proveedores")
        //     .innerJoinAndSelect("activos.empleado", "empleados")
        //     .orderBy("activos.oid", "DESC")
        //     .where("activos.activo = true")
        //     .take(100)
        //     .getMany()
        //console.log(req.query.skip, req.query.take, total )

        res.status(200).json({ activos, total })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }

}*/

export const getListAc = async (req, res) => {
    try {
        const { skip, take, label, dato } = req.query;
        //console.log(req.query)

        const repository = AppDataSource.getRepository(Activos_table);
        const query = repository.createQueryBuilder('activo')
            .leftJoinAndSelect('activo.empleado', 'empleado')
            .leftJoinAndSelect('activo.prefijo', 'prefijo')
            .leftJoinAndSelect('activo.tipo', 'tipo')
            .leftJoinAndSelect('activo.proveedor', 'proveedor')
            .leftJoinAndSelect('activo.entidad', 'entidad')
            .leftJoinAndSelect('entidad.edificio', 'edificio')
            .leftJoinAndSelect('entidad.empleado', 'empleados')
            .orderBy('activo.oid', 'DESC')
            .where('activo.activo = :activo', { activo: "true" });

        // Aplicar filtros dinámicos
        if (label.value === 'objeto') {
            query.andWhere('activo.objeto LIKE :objeto', { objeto: `%${dato}%` });
        }

        if (label.value === 'entidad.entidad') {
            query.andWhere('entidad.entidad LIKE :departamento', { 
                departamento: `%${dato}%` 
            });
        }

        if (label.value === 'empleado.nombre_completo') {
            query.andWhere('empleado.nombre_completo LIKE :empleado', {
                empleado: `%${dato}%`
            });
        }

        const [activos, total] = await query
            .skip(Number(skip) || 0)
            .take(Number(take) || 10)
            .getManyAndCount();
        //console.log(activos[0])
        res.status(200).json({ activos, total });
    } catch (error) {
        console.error('Error en getListAc:', error);
        res.status(500).json({ 
            error: "Error interno del servidor", 
            msg: error.message 
        });
    }
};

export const getActivobyOid = async (req, res) => {
    try {
        const oid = req.params.id;
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        // const Repository = await AppDataSource.getRepository(Activos_table); 

        /*const activos = await Repository.find({
            relations:{
                empleado: true,
                prefijo: true,
                tipo: true,
                proveedor: true,
                edificio: true,
                entidad: true,
            },
            order: {
                oid: 'DESC'
            }}
        );*/
        //console.log('llego')
        const activo = await AppDataSource.getRepository(Activos_table)
            .createQueryBuilder('activos')
            .leftJoinAndSelect("activos.entidad", "entidades")
            .leftJoinAndSelect("entidades.edificio", "edificios")
            .leftJoinAndSelect("edificios.asentamiento", "asentamientos")
            .leftJoinAndSelect("activos.prefijo", "prefijos")
            .leftJoinAndSelect("activos.tipo", "tipos")
            .leftJoinAndSelect("activos.proveedor", "proveedores")
            .leftJoinAndSelect("activos.empleado", "empleados")
            .orderBy("activos.oid", "DESC")
            .where("activos.oid = :oid", { oid })
            .getOne()
        //console.log(activos)

        res.status(200).json({ activo })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error interno del servidor", msg: error });
    }
}


export const CreateAC = async (req, res) => {
    try {
        //console.clear()
        const { data } = req.body;
        //console.log('Activo: ', data);
        //return
        const Repository = AppDataSource.getRepository(Activos_table);
        //const activo = await Repository.findOneBy({ activo: data.oid });

        //if(activo !== null) return res.status(500).json({ message: "Activo ya existe" });

        const activo = await Repository.save({ ...data, creacion_fecha: Date() });

        //console.log(Repository)

        res.status(200).json({ correcto: true, oid: activo.oid, message: 'Activo creado correctamente' })
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear activo" });
    }
}

export const UpdateAC = async (req, res) => {
    try {
        const { data } = req.body;
        const oid = req.params.id;
        //console.clear()
        //console.log("oid", oid, "datos", data)
        //return
        await AppDataSource.createQueryBuilder().update(Activos_table).set({ ...data, modificacion_fecha: () => 'CURRENT_TIMESTAMP' }).where("oid = :oid", { oid: oid }).execute();
        //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})

        //EdittoEmpleado = data
        res.status(200).json({ correcto: true, message: 'Activo actualizado correctamente' })


    } catch (error) {
        console.error("Error ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const DeleteAC = async (req, res) => {

    try {
        const oid = req.params.id;
        //console.log(oid);

        const Repositorio = AppDataSource.getRepository(Activos_table);
        const Delete = await Repositorio.findOneBy({ oid: oid })

        await Repositorio.remove(Delete);

        res.status(200).json({ correcto: true, message: 'Activo eliminado correctamente' })


    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });

    }

}

export const CambioResguardo = async (req, res) => {
    try {
        const { oid_de, oid_para } = req.body.data;
        console.log('DE: ', oid_de, 'PARA: ', oid_para)
        //console.log(req.body)

        res.status(200).json({ correcto: true, message: 'Cambio resguardo correctamente' })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}