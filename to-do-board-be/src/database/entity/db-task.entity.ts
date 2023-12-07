import { Column, Entity } from 'typeorm';
import { DBBaseEntity } from './db-base.entity';

@Entity({ name: 'task' })
class DBTask extends DBBaseEntity {
    @Column({ name: 'title', type: String, default: null })
    public title: string;

    @Column({ name: 'description', type: String, default: null })
    public description: string;

    @Column({ name: 'category_id', type: String, default: null })
    public categoryId: string;

    @Column({ name: 'expiry_date', type: 'timestamptz', default: null })
    public expiryDate: string;

    constructor() {
        super();
    }
}

export default DBTask;
