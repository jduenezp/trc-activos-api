import { AppDataSource } from "../conexion/DB_Conexion";
import { Puestos } from "../entity/Puestos";

export const getPuestos = async (req, res) => {
    try {
            const userRepository = AppDataSource.getRepository(Puestos);
            const puestos = await userRepository.find();
            res.status(200).json({ puestos })
        }
        catch (error) {
            res.status(500).json({ error: "Error interno del servidor", msg: error });
        }
}