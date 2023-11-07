import { Request, Response } from "express";
import { Card } from "../entities/card";
import { validate } from "class-validator";

const cardController = {
  getCardsInList: async (req: Request, res: Response) => {
    let cards: Card[] = [];
    const listId: number = parseInt(req.params.id);
    try {
      cards = await Card.find({
        relations: {
          list: true,
          tags: true
        },
        where: {
          list: {
            id: listId
          },
        },
        order: {
          position: 'ASC'
        }
      })
      if (!cards) {
        res.status(404).send('Cant find cards with id list' + listId);
      } else {
        res.status(200).send(cards);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },
  getOneCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      const card = await Card.findOneByOrFail({
        id: cardId
      });
      if(!card) {
        res.status(404).send('Cant find card' + cardId);
      } else {
        res.status(200).send(card);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());      
    }
  },
  createCard: async (req: Request, res: Response) => {
    try {
      const newCard = Card.create(req.body);
      const errors = await validate(newCard);
      if (errors.length > 0) {
        res.status(400).send({
          message: 'Validation failed',
          errors
        });      
      } else {
        await newCard.save();
      }
      res.status(200).send('A Card has been created')
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
  modifyCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      let card = await Card.findOneBy({
        id: cardId
      });
      if (!card) {
        res.status(404).send('Cant find card ' + cardId);
      } else {
        await Card.update(cardId, req.body);
        res.status(200).send('Card has been updated');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },
  deleteCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      let card = await Card.findOneBy({
        id: cardId
      });
      if (!card) {
        res.status(404).send('Cant find card ' + cardId);
      } else {
        await Card.delete(cardId);
        res.status(200).send('Card has been deleted');

      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  }
}

export default cardController;