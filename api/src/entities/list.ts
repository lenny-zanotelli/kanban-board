import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card";

@Entity()
export class List extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @OneToMany(() => Card, (cards) => cards.list)
  cards: Card[]
  
}