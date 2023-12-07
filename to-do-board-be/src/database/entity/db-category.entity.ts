import { Column, Entity } from 'typeorm';
import { DBBaseEntity } from './db-base.entity';

@Entity({ name: 'category' })
class DBCategory extends DBBaseEntity {
    @Column({ name: 'name', type: String, default: null })
    public name: string;

    @Column({ name: 'user_id', type: String, default: null })
    public userId: string;

    constructor() {
        super();
    }
}

export default DBCategory;
