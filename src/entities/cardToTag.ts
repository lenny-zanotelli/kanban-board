import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card";
import { Tag } from "./tag";

@Entity()
export class CardToTag extends BaseEntity  {
  @PrimaryGeneratedColumn()
  CardToTagId: number;

  @ManyToOne(() => Card, (card) => card.cardToTags, {
    onDelete: 'CASCADE'
  })
  card: Card;

  @ManyToOne(() => Tag, (tag) => tag.cardToTags, {
    onDelete: 'CASCADE'
  })
  tag: Tag;
}