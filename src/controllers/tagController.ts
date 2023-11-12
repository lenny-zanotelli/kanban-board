import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Tag } from '../entities/tag';

const tagController = {
  getAllTags: async (_req: Request, res: Response) => {
    try {
      const tags = await Tag.find({
        relations: {
          cards: true
        }
      });
      res.status(200).send(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
      
    }
  },
  getOneTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      const tag = await Tag.findOneByOrFail({
        id: tagId
      });
      res.status(200).send(tag);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
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
      res.status(200).send('A Tag has been created');
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },
  modifyTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      let tag = await Tag.findOneBy({
        id: tagId
      });
      if (!tag) {
        res.status(400).send('Cant find tag ' + tagId);
      } else { 
        await Tag.update(tagId, req.body);
        res.status(200).send('Tag has been updated');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString())
    }
  },
  deleteTag: async (req: Request, res: Response) => {
    try {
      const tagId: number = parseInt(req.params.id);
      let tag = await Tag.findOneBy({
        id: tagId
      });
      if (!tag) {
        res.status(404).send('Cant find tag ' + tagId);
      } else {
        await Tag.delete(tagId);
        res.status(200).send('Tag has been deleted');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },


}

export default tagController