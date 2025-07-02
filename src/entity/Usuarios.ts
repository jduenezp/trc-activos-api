import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm"
import { Empleados } from "./Empleados"
import { UUID } from "crypto"

@Entity("usuarios", { schema: "trc_activos" })
export class Usuarios {

    @PrimaryColumn()
    oid: string

    @Column({ type: 'varchar', length: 6 })
    no_empleado: string

    @Column()
    password: string

    @OneToOne(() => Empleados)
    @JoinColumn({ name: 'empleado_clave' })
    empleado: Empleados

    @Column()
    rol_oid: number
    
    @Column()
    activo: boolean

}
