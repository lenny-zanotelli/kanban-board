import db from "../config/db";
import { List } from "./entities/list";
import { Card } from "./entities/card";
import { Tag } from "./entities/tag";

async function clearDb() {
  const runner = db.createQueryRunner();
  await Promise.all(
    db.entityMetadatas.map(async (entity) => 
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName} cascade`)
    )
  );
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDb();

  const list1 = List.create({
    name: 'Premiere Liste'
  });

  const card1 = Card.create({ 
    title: 'Carte 1',
    color: '#fff696'
  });
  const card2 = Card.create({
    title: 'Carte 2',
    color: '#c1e7ff',
  });

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

  list1.cards = [card1, card2];

  card2.tags = [tag1];
  card1.tags = [tag1, tag2];
  card1.tags = [tag3, tag4];

  await list1.save();

}

main();