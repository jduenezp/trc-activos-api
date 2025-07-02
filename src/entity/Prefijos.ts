import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("prefijos", {schema: "trc_activos"})
export class Prefijos {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    descripcion: string

    @Column()
    prefijo: string

    @Column()
    numero: number

    @Column()
    articulo: number


}
