import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Tag } from '../entities/tag';
import { Card } from '../entities/card';
import { CardToTag } from '../entities/cardToTag';

const tagController = {
  getAllTags: async (_req: Request, res: Response) => {
    try {
      const tags = await Tag.find();
      res.status(200).json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
      
    }
  },
  getOneTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      const tag = await Tag.findOneByOrFail({
        id: tagId
      });
      res.status(200).json(tag);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  createTag: async (req: Request, res: Response) => {
    try {
      const newTag = Tag.create(req.body);
      const errors = await validate(newTag);
      if (errors.length > 0) {
        throw new Error('Validation failed');
      } else {
        await newTag.save();
      }
      res.status(200).json('A Tag has been created');
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  modifyTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      let tag = await Tag.findOneBy({
        id: tagId
      });
      if (!tag) {
        res.status(400).json('Cant find tag ' + tagId);
      } else { 
        await Tag.update(tagId, req.body);
        res.status(200).json('Tag has been updated');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString())
    }
  },
  deleteTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      let tag = await Tag.findOneBy({
        id: tagId
      });
      if (!tag) {
        res.status(404).json('Cant find tag ' + tagId);
      } else {
        await Tag.delete(tagId);
        res.status(200).json('Tag has been deleted');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  associateTagToCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.id);
      const tagId: number = parseInt(req.body.tagId);

  
    let card = await Card.findOne({
      relations: {
        cardToTags: {
          tag: true,
          card: true
        }
      },
        where: {
          id: cardId 
        }
    });
        
      if (!card) {
        return res.status(404).json('Cannot find card with id '+ cardId);
      }

      let tag = await Tag.findOneByOrFail({id: tagId});

      if (!tag) {
        return res.status(404).json('Cannot find tag with id '+ tagId);
      }

      const cardToTag = CardToTag.create({
        card: card,
        tag: tag
      });
      await cardToTag.save();

      card.cardToTags.push(cardToTag);
      await card.save();

      console.log(card.cardToTags)
      return res.status(200).json(card);

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    
    }
  },

  removeTagFromCard: async (req: Request, res: Response) => {
    try {
      const cardId: number = parseInt(req.params.cardId);
      const tagId: number = parseInt(req.params.tagId);
 

      let card = await Card.findOne({
        relations: {
          cardToTags: {
            tag: true,
            card: true
          }
        },
          where: {
            id: cardId
          }
      });
          
        if (!card) {
          return res.status(404).json('Cannot find card with id '+ cardId);
        }

        const cardToTag = card.cardToTags.find((el) => el.tag.id === tagId);
        console.log(cardToTag);
  
        if (!cardToTag) {
          return res.status(404).json('Card does not have the specified tag');
        }

        await cardToTag.remove();

        return res.status(200).json(card);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
      
    }
  }


}

export default tagController