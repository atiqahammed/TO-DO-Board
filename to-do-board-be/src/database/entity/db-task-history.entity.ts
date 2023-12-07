import { Column, Entity } from 'typeorm';
import { DBBaseEntity } from './db-base.entity';

@Entity({ name: 'task_history' })
class DBTaskHistory extends DBBaseEntity {
    @Column({ name: 'title', type: String, default: null })
    public name: string;

    @Column({ name: 'task_id', type: String, default: null })
    public description: string;

    @Column({ name: 'category_id', type: String, default: null })
    public categoryId: string;

    constructor() {
        super();
    }
}

export default DBTaskHistory;
