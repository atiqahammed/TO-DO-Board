import { Column, Entity } from 'typeorm';
import { DBBaseEntity } from './db-base.entity';

@Entity({ name: 'task_history' })
class DBTaskHistory extends DBBaseEntity {
    @Column({ name: 'task_id', type: String, default: null })
    public taskId: string;

    @Column({ name: 'category_id', type: String, default: null })
    public categoryId: string;

    constructor() {
        super();
    }
}

export default DBTaskHistory;
