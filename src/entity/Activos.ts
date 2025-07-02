import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Timestamp, JoinTable } from "typeorm"
import { Empleados } from "./Empleados"
import { Prefijos } from "./Prefijos"
import { Tipos } from "./Tipos"
import { Proveedores } from "./Proveedores"
import { Entidades } from "./Entidades"

@Entity("activos", { schema: "trc_activos" })
export class Activos_table {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    clave: string

    @Column()
    objeto: string
    
    @Column()
    depende: number

    @OneToOne(() => Prefijos)
    @JoinColumn({ name: 'prefijo_oid' })
    prefijo: Prefijos

    @OneToOne(() => Tipos)
    @JoinColumn({ name: 'tipo_oid' })
    tipo: Tipos

    //@Column()
    //empleado_clave: string
    @OneToOne(() => Empleados)
    @JoinColumn({ name: 'empleado_clave' })
    empleado: Empleados

    @Column()
    condicion_oid: number

    @OneToOne(() => Proveedores)
    @JoinColumn({ name: 'proveedor_oid' })
    proveedor: Proveedores
    
    @OneToOne(() => Entidades)
    @JoinColumn({ name: 'entidad_oid', })
    entidad: Entidades


    @Column()
    costo: number
    @Column()
    tipo_depre_valor: number
    @Column()
    porcentaje_deprev: number
    @Column()
    fecha_alta: string
    @Column()
    fecha_adquisicion: string
    @Column()
    tipo_adquisicion: number
    @Column()
    activo: string
    @Column()
    fecha_baja: string
    @Column()
    motivo_baja: string
    @Column()
    factura: string
    @Column()
    descripcion: string
    @Column()
    color: string
    @Column()
    modelo: string
    @Column()
    serie: string
    @Column()
    procedencia: string
    @Column()
    garantia: string
    @Column()
    ref: string
    @Column()
    ubicacion: string
    @Column()
    salida_oid: number
    @Column()
    consumible: boolean
    @Column()
    estatus: boolean
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creacion_fecha: Date;
    @Column()
    creacion_usuario: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modificacion_fecha: Date;
    @Column()
    modificacion_usuario: string

}