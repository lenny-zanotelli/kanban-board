import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CardToTag } from "./cardToTag";
import { List } from "./list";

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

  @OneToMany(() => CardToTag, cardToTag => cardToTag.card, {
    eager: true
  })
  cardToTags: CardToTag[];

}