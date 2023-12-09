import db from "../config/db";
import { List } from "./entities/list";
import { Card } from "./entities/card";
import { Tag } from "./entities/tag";
import { CardToTag } from "./entities/cardToTag";

async function clearDb() {
  const runner = db.createQueryRunner();
  await Promise.all(
    db.entityMetadatas.map(async (entity) => 
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName} CASCADE`)
    )
  );
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDb();

  // Création des listes
  const list1 = List.create({
    name: 'Premiere Liste'
  });
  await list1.save();

  // Création des cartes
  const card1 = Card.create({ 
    title: 'Carte 1',
    color: '#fff696',
    list: list1,
  });
  const card2 = Card.create({
    title: 'Carte 2',
    color: '#c1e7ff',
    list: list1,
  });
  await card1.save();
  await card2.save();

  // Création des tags
  const tag1 = Tag.create({
    name: 'Urgent',
    color: '#ce7e00'
  });
  const tag2 = Tag.create({
    name: 'Important',
    color: '#A4CB80'
  });
  const tag3 = Tag.create({
    name: 'Medium',
    color: '#b4a7d6'
  });
  const tag4 = Tag.create({
    name: 'Low',
    color: '#ffd966'
  });
  await tag1.save();
  await tag2.save();
  await tag3.save();
  await tag4.save();

  // Création des liens CardToTag
  const cardToTag1 = CardToTag.create({
    card: card1,
    tag: tag1
  });
  const cardToTag2 = CardToTag.create({
    card: card1,
    tag: tag2,
  });
  const cardToTag3 = CardToTag.create({
    card: card1,
    tag: tag3,
  });
  const cardToTag4 = CardToTag.create({
    card: card2,
    tag: tag4,
  });
  await cardToTag1.save();
  await cardToTag2.save();
  await cardToTag3.save();
  await cardToTag4.save();

  // Ajout des liens aux cartes
  card1.cardToTags = [cardToTag1, cardToTag2, cardToTag3];
  card2.cardToTags = [cardToTag4];
  await card1.save();
  await card2.save();

  await db.destroy();

}

main();
