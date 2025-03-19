import { Helper } from '@/utils';
import { Entity, Column, BeforeInsert } from 'typeorm';
import Model from './base.entity';

@Entity('users')
export class User extends Model {
    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await Helper.hashPassword(this.password);
        }
    }
}
