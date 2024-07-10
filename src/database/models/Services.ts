import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointments } from "./Appointments"

@Entity('services')
export class Services extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: "service_name"})
    service_name!: string
    
    @Column({name: "description"})
    description!: string

    @OneToMany(() => Appointments, (appointments) => appointments.services)
    appointments!: Services[]
}
