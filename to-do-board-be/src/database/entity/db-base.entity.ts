import {
    Column,
    DeleteDateColumn,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';

export abstract class DBBaseEntity {
    constructor() {
        const today = new Date();
        this.lastUpdateDate = this.creationDate = today.toUTCString();
    }
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn('id')
    public id: string;

    @Column({ name: 'creation_date', type: 'timestamptz', default: null })
    public creationDate: string;

    @Column({ name: 'last_update_date', type: 'timestamptz', default: null })
    public lastUpdateDate: string;

    @Column({ name: 'created_by', type: 'uuid', default: null })
    public createdBy: string;

    @Column({ name: 'last_updated_by', type: 'uuid', default: null })
    public lastUpdatedBy: string;

    @Column({ name: 'is_deleted', type: Boolean, default: false })
    public isDeleted: boolean;

    @Column({ name: 'deleted_by', type: String, default: null })
    public deletedBy: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
