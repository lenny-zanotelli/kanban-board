import { Request, Response } from "express";
import { List } from "../entities/list";
import { validate } from "class-validator";

const listController = {
  getAllLists: async (_req: Request, res: Response) => {
    let lists: List[] = [];
    try {
        lists = await List.find({
          relations: {
            cards: true,
          },
          order: {
            position: "ASC",
            cards: {
              position: "ASC",
            }
          }
        })
      res.status(200).send(lists);
    } catch(error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },
  getOneList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      const list = await List.findOneByOrFail({
        id: listId
      });
      if (list) {
        res.status(200).send(list);
      } else {
        res.status(404).send('Cant find list ' + listId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
      
    }

  },
  createList: async (req: Request, res: Response) => {
    try {
      const newList = List.create(req.body);
      const errors = await validate(newList);
      if (errors.length > 0) {
        throw new Error('Validation Failed');
      } else {
        await newList.save();
      }
      res.status(200).send('A List has been created');
    } catch (error) {
      res.status(500).send(error.toString());
    }
  },
  modifyList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      await List.update(listId, req.body);
      res.status(200).send('List has been updated');
    } catch (error) {
      console.trace(error);
      res.status(500).send(error.toString());
    }
  },
  deleteList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      await List.delete(listId);
      res.status(200).send('List has been deleted')
    } catch (error) {
      console.log(error);
      res.status(500).send(error.toString());
    }
  }
}


export default listController;