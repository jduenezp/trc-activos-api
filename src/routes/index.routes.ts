import { Router } from "express";
import { CreateUser, DeleteEmpleado, EditEmpleado, getEmpleadoxClave, getUserbyId, getUsers } from "../controller/Empleados.controller"; 
import { getPuestos } from "../controller/Puestos.controller";
import { CreateED, DeleteED, getbyIdED, getListED, getListEdsinAsent, UpdateED } from "../controller/Edificios.controller";
import { CreateEN, DeleteEN, getbyIdEN, getListEN, getListENxEd, UpdateEN } from "../controller/Entidades.controller";
import { CreatePROV, DeletePROV, getbyIdPROV, getListPROV, UpdatePROV } from "../controller/Proveedores.controller";
import { getAsentamientosbyCP, getListAsentamientos } from "../controller/Asentamientos.controller";
import { CambioResguardo, CreateAC, DeleteAC, getActivobyOid, getListAc, UpdateAC } from "../controller/Activos.controller";
import { getListPREF } from "../controller/Prefijos.controller";
import { Cambiar_contrasena, Cambiar_estatus, getListUsers, Login, LogOut, SaveUser, validarToken } from "../controller/Usuarios.controller";
import { authenticateToken } from "../middleware/middleware";
import { CreateInfo, DeleteInfo, getInfo, UpdateInfo } from "../controller/Informacion.controller";
import { createResguardo, getListResg_Prov, updateResguardo } from "../controller/Resguardo_Prov.controller";


const router = Router()

//router.use(authenticateToken)
router.post('/auth/login', Login)
router.get('/auth/logout', LogOut)
router.post('/auth/adduser', SaveUser)
router.post('/auth/cambiar-contrasena', Cambiar_contrasena)
router.get('/users', authenticateToken, getListUsers)
router.post('/users/cambiarestatus', authenticateToken, Cambiar_estatus)
router.get('/validandotoken', authenticateToken, validarToken)

router.get('/empleados', authenticateToken, getUsers)
router.get('/empleadosxclave/:clave', authenticateToken, getEmpleadoxClave)
router.get('/empleados/:id', authenticateToken, getUserbyId)
router.post('/empleados', authenticateToken, CreateUser)
router.post('/empleados/:id', authenticateToken, EditEmpleado)
router.get('/empleados/delete/:id', authenticateToken, DeleteEmpleado)

router.get('/edificios', authenticateToken, getListED)
router.get('/edificios/:id', authenticateToken, getbyIdED)
router.post('/edificios', authenticateToken, CreateED)
router.post('/edificios/:id', authenticateToken, UpdateED)
router.get('/edificios/delete/:id', authenticateToken, DeleteED)

router.post('/entidadesg', authenticateToken, getListEN)
router.get('/entidadesxedificio/:id', authenticateToken, getListENxEd)
router.get('/entidadessinaenta', authenticateToken, getListEdsinAsent)
router.get('/entidades/:id', authenticateToken, getbyIdEN)
router.post('/entidades', authenticateToken, CreateEN)
router.post('/entidades/:id', authenticateToken, UpdateEN)
router.get('/entidades/delete/:id', authenticateToken, DeleteEN)

router.get('/proveedores', authenticateToken, getListPROV)
router.get('/proveedores/:id', authenticateToken, getbyIdPROV)
router.post('/proveedores', authenticateToken, CreatePROV)
router.post('/proveedores/:id', authenticateToken, UpdatePROV)
router.get('/proveedores/delete/:id', authenticateToken, DeletePROV)

router.get('/puestos', authenticateToken, getPuestos);

router.get('/asentamientos', authenticateToken, getListAsentamientos);
router.get('/asentamientos/:cp', authenticateToken, getAsentamientosbyCP);

router.get('/activos', authenticateToken, getListAc)
router.get('/activos/:id', authenticateToken, getActivobyOid)
router.post('/activos', authenticateToken, CreateAC)
router.post('/activos/:id', authenticateToken, UpdateAC)
router.get('/activos/delete/:id', authenticateToken, DeleteAC)
router.post('/activocambioresguardo',  CambioResguardo)

router.get('/prefijos', authenticateToken, getListPREF)

router.get('/resguardo-provicional', getListResg_Prov)
router.post('/resguardo-provicional', createResguardo)
router.post('/resguardo-provicional/:id', updateResguardo)



export default router;