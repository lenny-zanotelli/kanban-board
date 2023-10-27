import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list";
import { Tag } from "./tag";

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  position: number;

  @Column()
  color: string;

  @ManyToOne(() => List, (list) => list.cards, {
    onDelete: "SET NULL"})
    list: List

  @ManyToMany(() => Tag, (tag) => tag.cards)
  @JoinTable()
  tags: Tag[]

}