import internal = require("stream")
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable } from "typeorm"
import { Edificios } from "./Edificios"
import { Asentamientos } from "./Asentamientos"
import { Empleados } from "./Empleados"

@Entity("entidades", { schema: "trc_activos" })
export class Entidades {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    entidad: string

    @OneToOne(() => Edificios,)
    @JoinColumn({ name: 'edificio_oid' })
    edificio: Edificios

    //empleado_clave: string
    @OneToOne(() => Empleados)
    @JoinColumn({ name: 'empleado_clave' })
    empleado: Empleados

}
