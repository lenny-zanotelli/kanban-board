import { Length } from "class-validator";
import { BaseEntity, Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card";

@Entity()
export class List extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 15)
  name: string;

  @Column()
  @Generated('increment')
  position: number;

  @OneToMany(() => Card, (cards) => cards.list, 
  { 
    cascade: true, 
    onDelete: "CASCADE" 
  })
  cards: Card[];
  
}