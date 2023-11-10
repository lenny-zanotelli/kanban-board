BEGIN;

INSERT INTO "list" ("name")
VALUES ('Première liste' );

INSERT INTO "card" ("title", "color", "listId")
VALUES ('Carte 1', '#fff696', 1),
       ('2ème carte', '#c1e7ff', 1);

INSERT INTO "tag" ("name", "color")
VALUES ('Urgent', '#ce7e00'),
       ('Important', '#A4CB80'),
       ('Medium','#b4a7d6'),
       ('Low', '#ffd966');
       
-- et on oublie pas la table de liaison !
INSERT INTO "card_tags_tag" ("cardId", "tagId")
VALUES (1,1);

COMMIT;
