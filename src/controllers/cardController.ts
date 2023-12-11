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
        res.status(404).json('Cant find cards with id list' + listId);
      } else {
        res.status(200).json(cards);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  getOneCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      const card = await Card.findOneByOrFail({
        id: cardId
      });
      if(!card) {
        res.status(404).json('Cant find card' + cardId);
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());      
    }
  },
  createCard: async (req: Request, res: Response) => {
    try {
      const newCard = Card.create(req.body);
      const errors = await validate(newCard);
      if (errors.length > 0) {
        res.status(400).json({
          message: 'Validation failed',
          errors
        });      
      } else {
        await newCard.save();
      }
      res.status(200).json('A Card has been created')
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  modifyCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      const cardToUpdate = await Card.findOneBy({
        id: cardId
      });
      if (!cardToUpdate) {
        res.status(404).json('Cant find card ' + cardId);
      } else {
        if (req.body.title) {
          cardToUpdate.title = req.body.title;
        }
        if (req.body.listId) {
          cardToUpdate.list = req.body.listId;
        }
        if (req.body.color) {
          cardToUpdate.color = req.body.color;
        }
        if (req.body.position) {
          cardToUpdate.position = req.body.position;
        }
        await cardToUpdate.save();
        res.status(200).json('Card has been updated');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  deleteCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      let card = await Card.findOneBy({
        id: cardId
      });
      if (!card) {
        res.status(404).json('Cant find card ' + cardId);
      } else {
        await Card.delete(cardId);
        res.status(200).json('Card has been deleted');

      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  }
}

export default cardController;