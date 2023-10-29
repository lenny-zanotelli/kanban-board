import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list";
import { Tag } from "./tag";
import { IsInt, Length } from "class-validator";

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 30)
  title: string;

  @Column()
  @IsInt()
  position: number;

  @Column()
  color: string;

  @ManyToOne(() => List, (list) => list.cards, { eager: true })
    list: List

  @ManyToMany(() => Tag, (tag) => tag.cards)
  @JoinTable()
  tags: Tag[]

}