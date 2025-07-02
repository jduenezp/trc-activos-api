import { AppDataSource } from "../conexion/DB_Conexion";
import { Usuarios } from '../entity/Usuarios'
import { createHash, randomBytes } from "crypto";
import { sign } from "jsonwebtoken";
import 'dotenv/config';
import { Not } from "typeorm";

export const validarToken = async (req, res) => {

    //console.log('llego a validar', req.usuario)
    return res.status(200).json({ correcto: true, payload: req.usuario, message: 'Token validado' })

}

export const SaveUser = async (req, res) => {
    const data = req.body;
    let oid = crypto.randomUUID()
    data.password = createHash('sha256').update(data.password).digest('hex')
    //console.log('user:', data.empleado.clave, 'password:', data.password, 'empleado_oid:', data.empleado.clave, 'rol', data.rol_oid)
    
    //return 

    let user = { oid, no_empleado: data.empleado.clave, password: data.password, empleado: data.empleado.clave, rol_oid: data.rol_oid, activo: true }
    const Repository = AppDataSource.getRepository(Usuarios);

    const usuario = await Repository.findOneBy({ no_empleado: data.no_empleado });

    if (usuario !== null) return res.status(500).json({ message: "Usuario ya existe" });

    await Repository.save(user);

    res.status(200).json({ correcto: true, message: 'Usuario creado correctamente' })
}

export const Login = async (req, res) => {
    try {
        let data = req.body;

        data.password = createHash('sha256').update(data.password).digest('hex')
        const Repository = AppDataSource.getRepository(Usuarios);

        const usuario = await Repository.findOne({ where: { no_empleado: data.no_empleado, password: data.password, activo: true }, relations: { empleado: true } })
        if (usuario) {
            //console.log('llego')
            const payload = {
                sub: usuario.oid,
                no_empleado: usuario.no_empleado,
                nombre: usuario.empleado.nombre_completo,
                rol: usuario.rol_oid

            }

            const token = sign(payload, process.env.JWT_SECRET);
            //console.log(token)
            const cifrado = {
                sub: token,
                no_empleado: usuario.no_empleado,
                nombre: usuario.empleado.nombre_completo,
                rol: usuario.rol_oid
            }
            //process.env.JWT_SECRET = token
            //const token = jwt.sign({ usuario }, 'SecretToken',{ expiresIn: '1h' });
            return res.status(200).cookie('jwt', token, { maxAge: 1000 * 60 * 60, secure: false, httpOnly: true, sameSite: 'lax', }).json({ correcto: true, cifrado, message: 'Inicio de sesion exitoso' })
        }
        //console.log('error')
        return res.json({ correcto: false, message: 'Error en las credenciales' })

    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor", message: error });
    }

}

export const LogOut = async (req, res) => {
    res.status(200).clearCookie('jwt').json({ message: 'Cierre de sesion correcto' })
}


export const getListUsers = async (req, res) => {
    try {
        //const users =  await AppDataSource.getRepository(Empleados).createQueryBuilder("empleados").orderBy("empleados.oid", "DESC").getMany();
        const Repository = await AppDataSource.getRepository(Usuarios);

        const usuarios = await Repository.find({select:{oid:true, rol_oid:true, activo:true}, where:{no_empleado: Not('admin')}, relations:{ empleado: true }},);
        //console.log(proveedores)

        //const usuarios = await AppDataSource
        //    .getRepository(Usuarios)
        //    .createQueryBuilder("user")
        //    .leftJoin('user.empelado', 'empleados')
        //    .select('empleados')
        //    .addSelect("user.rol_oid", "rol")
        //    .getRawMany()

        res.status(200).json({ usuarios })
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor", message: error });
    }

}

export const Cambiar_estatus = async (req, res) =>{
    try {
        //console.log('llego')
        //console.log(req.body)
        const {data}  = req.body
    
        const Repository = await AppDataSource.getRepository(Usuarios);
    
        const usuario = await Repository.findOneBy({oid: data.oid})
        //console.log(usuario)
    
        if(usuario) {
            usuario.activo = data.activo
            await Repository.save(data)
            res.status(200).json({correcto: true, message: 'Cambio de estatus correcto'})
        }
        else{
            return res.json({ correcto: false, message: 'Usuario no encontrado' })
        }
        
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", message: error });
    }
}

export const Cambiar_contrasena = async (req, res) =>{
    try {
        const {data} = req.body;
        //console.log(data)

        data.password = createHash('sha256').update(data.password).digest('hex')
        data.newpassword = createHash('sha256').update(data.newpassword).digest('hex')
        const Repository = AppDataSource.getRepository(Usuarios);

        const usuario = await Repository.findOne({ where: { no_empleado: data.no_empleado, password: data.password, activo: true }, relations: { empleado: false } })

        if (usuario) {
            console.log('llego')
            
            usuario.password = data.newpassword
            await Repository.save(usuario)

            return res.status(200).json({ correcto: true, message: 'Cambio de contraeña exitoso' })
        }
        //console.log('error')
        return res.json({ correcto: false, message: 'Error en las credenciales' })


    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", message: error });
    }
}