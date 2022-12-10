import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {

    constructor(chat?: Partial<Chat>) {
        Object.assign(this, chat)
    }

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'character varying' })
    message: string;

    @Column({ type: 'character varying' })
    sender: string;

    @Column({ type: 'character varying' })
    recipient: string;
}