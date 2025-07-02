import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("puestos", {schema: "trc_activos"})
export class Puestos {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    puesto: string

}
