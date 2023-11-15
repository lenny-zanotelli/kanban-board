import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card";
import { Length } from "class-validator";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 10)
  name: string;

  @Column()
  color: string;

  @ManyToMany(() => Card, (card) => card.tags, {
    cascade: true,
  })
  cards: Card[]
}