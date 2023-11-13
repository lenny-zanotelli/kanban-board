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


}

export default tagController