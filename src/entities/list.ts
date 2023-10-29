import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card";
import { Length, IsInt } from "class-validator";

@Entity()
export class List extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 15)
  name: string;

  @Column()
  @IsInt()
  position: number;

  @OneToMany(() => Card, (cards) => cards.list)
  cards: Card[]
  
}