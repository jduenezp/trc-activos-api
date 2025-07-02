import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("tipos", {schema: "trc_activos"})
export class Tipos {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    tipo: string

    @Column()
    categoria_oid: string


}
