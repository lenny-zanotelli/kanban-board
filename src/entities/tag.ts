import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CardToTag } from "./cardToTag";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 10)
  name: string;

  @Column()
  color: string;

  @OneToMany(() => CardToTag, cardToTag => cardToTag.tag)
  cardToTags: CardToTag[];
}