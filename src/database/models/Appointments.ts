import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users"
import { Services } from "./Services"

@Entity('appointments')
export class Appointments extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'date' })
    date!: Date

    @Column({ name: 'user_id' })
    user_id!: number

    @Column({ name: 'service_id' })
    service_id!: number

    @ManyToOne(() => Users, (users) => users.appointments)
    @JoinColumn({ name: "user_id" })
    users!: Users;

    @ManyToOne(() => Services, (services) => services.appointments)
    @JoinColumn({ name: "service_id" })
    services!: Services
}