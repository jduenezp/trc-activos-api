import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

@Entity("asentamientos", {schema: "trc_activos"})
export class Asentamientos {

    @PrimaryGeneratedColumn()
    oid: number

    @Column()
    id_asenta_cpcons: number

    @Column()
    d_codigo: number

    @Column()
    d_asenta: string
    
    @Column()
    c_estado: number

    @Column()
    d_estado: string

    @Column()
    d_mnpio: string

    @Column()
    c_mnpio: string

    @Column()
    d_ciudad: string

    @Column()
    d_cp: string

    @Column()
    c_oficina: number

    @Column()
    d_tipo_asenta: string
    
    @Column()
    c_tipo_asenta: string
    
    @Column()
    d_zona: string

}

											
