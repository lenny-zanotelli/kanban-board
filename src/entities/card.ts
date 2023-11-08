import { Length } from "class-validator";
import { BaseEntity, Column, Entity, Generated, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list";
import { Tag } from "./tag";

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 30)
  title: string;

  @Column()
  @Generated('increment')
  position: number;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => List, (list) => list.cards, 
  { eager: true, 
    onDelete: "CASCADE" 
  })
  list: List

  @ManyToMany(() => Tag, (tag) => tag.cards)
  @JoinTable()
  tags: Tag[]

}