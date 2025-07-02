import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("roles", {schema: "trc_activos"})
export class Prefijos {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    rol: string

}
