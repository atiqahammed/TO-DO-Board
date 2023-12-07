import { Column, Entity } from 'typeorm';
import { DBBaseEntity } from './db-base.entity';
@Entity({ name: 'user' })
class DBUser extends DBBaseEntity {
    @Column({ name: 'fast_name', type: String, default: null })
    public fastName: string;

    @Column({ name: 'last_name', type: String, default: null })
    public lastName: string;

    @Column({ name: 'email', type: String, default: null })
    public email: string;

    @Column({ name: 'password', type: String, default: null })
    public password: string;

    constructor() {
        super();
    }
}

export default DBUser;
