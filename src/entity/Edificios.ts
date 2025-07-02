import internal = require("stream")
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable } from "typeorm"
import { Asentamientos } from "./Asentamientos"

@Entity("edificios", { schema: "trc_activos" })
export class Edificios {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    edificio: string

    @Column()
    exterior: string

    @Column()
    interior: string

    @Column()
    calle: string

    @Column()
    cp: number

    @Column()
    colonia: string

    @OneToOne(() => Asentamientos)
    @JoinColumn({ name: 'asentamiento_oid' })
    asentamiento: Asentamientos


}
