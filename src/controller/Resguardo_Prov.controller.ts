import { AppDataSource } from "../conexion/DB_Conexion";
import { Resguardo_Provicional } from "../entity/ResguardosProvicionales";


export const getListResg_Prov = async (req, res) => {
    try {
        const { skip, take, label, dato } = req.query;
        //console.log('llego', req.query)

        const repository = AppDataSource.getRepository(Resguardo_Provicional);
        const query = repository.createQueryBuilder('resguardo')
            .orderBy('resguardo.oid', 'DESC');
        //.where('activo.activo = :activo', { activo: "true" });

        // Aplicar filtros dinámicos
        if (label.value === 'no_oficio') {
            query.andWhere('no_oficio LIKE :no_oficio', { no_oficio: `%${dato}%` });
        }

        if (label.value === 'dependencia') {
            query.andWhere('dependencia LIKE :departamento', {
                departamento: `%${dato}%`
            });
        }

        if (label.value === 'empleado') {
            query.andWhere('resguardante LIKE :resguardante', {
                resguardante: `%${dato}%`
            });
        }

        const [resguardos, total] = await query
            .skip(Number(skip) || 0)
            .take(Number(take) || 10)
            .getManyAndCount();
        //console.log(activos[0])
        res.status(200).json({ resguardos, total });
    } catch (error) {
        console.error('Error en getListResg:', error);
        res.status(500).json({
            error: "Error interno del servidor",
            msg: error.message
        });
    }
};


export const createResguardo = async (req, res) => {
    try {
        //console.clear()
        const { data } = req.body;
        //console.log('Resguardo: ', data);
        //return
        const Repository = AppDataSource.getRepository(Resguardo_Provicional);
        //const activo = await Repository.findOneBy({ activo: data.oid });

        //if(activo !== null) return res.status(500).json({ message: "Activo ya existe" });

        const activo = await Repository.save({ ...data, creacion_fecha: Date() });

        //console.log(Repository)

        res.status(200).json({ correcto: true, oid: activo.oid, message: 'Resguardo provicional creado correctamente' })
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error al momento de crear resguardo" });
    }
}

export const updateResguardo = async (req, res) => {
    try {
            const { data } = req.body;
            const oid = req.params.id;
            //console.clear()
            //console.log("oid", oid, "datos", data)
            //return
            await AppDataSource.createQueryBuilder().update(Resguardo_Provicional).set({ ...data, modificacion_fecha: () => 'CURRENT_TIMESTAMP' }).where("oid = :oid", { oid: oid }).execute();
            //const EdittoEmpleado = await EmpleadoRepositorio.findOneBy({oid: oid})
    
            //EdittoEmpleado = data
            res.status(200).json({ correcto: true, message: 'Resguardo actualizado correctamente' })
    
    
        } catch (error) {
            console.error("Error ", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
}