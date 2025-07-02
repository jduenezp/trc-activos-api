import internal = require("stream")
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Puestos } from "./Puestos"
import { Asentamientos } from "./Asentamientos"

@Entity("proveedores", { schema: "trc_activos" })
export class Proveedores {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    proveedor: string

    @Column()
    rfc: string

    @Column()
    procedencia_oid: string

    @Column()
    cp: string

    @Column()
    colonia_oid: string

    @Column()
    colonia: string

    @Column()
    calle_oid: string

    @Column()
    calle: string

    @Column()
    exterior: string

    @Column()
    interior: string

    @Column()
    telefono: string

    @OneToOne(() => Asentamientos)
    @JoinColumn({ name: 'asentamiento_oid' })
    asentamiento: Asentamientos

}

/*	email	estado_oid	minicipio_oid	localidad_oid	asentamiento_oid	calle_oid	colonia_oid	poblac_oid	orienta		poblacion_oid
*/