import { Request, Response } from "express";
import { List } from "../entities/list";
import { validate } from "class-validator";

const listController = {
  getAllLists: async (_req: Request, res: Response) => {
    let lists: List[] = [];
    try {
        lists = await List.find({
          relations: {
            cards: {
              cardToTags: {
                tag: true,
                card: true,
              }
            }
          },
          order: {
            position: "ASC",
            cards: {
              position: "ASC",
            }
          }
        })
      res.status(200).json(lists);
    } catch(error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  getOneList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      const list = await List.findOneByOrFail({
        id: listId
      });
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json('Cant find list ' + listId);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
      
    }

  },
  createList: async (req: Request, res: Response) => {
    try {
      const newList = List.create(req.body);
      const errors = await validate(newList);
      if (errors.length > 0) {
        res.status(400).json({
          message: 'Validation failed',
          errors
        });
      } else {
        await newList.save();
      }
      res.status(200).json('A List has been created');
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  modifyList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      const listToUpdate = await List.findOneByOrFail({
        id: listId
      });

      if (req.body.name) {
        listToUpdate.name = req.body.name;
      }
      if (req.body.position) {
        listToUpdate.position = req.body.position;
      }
      await listToUpdate.save();
      res.status(200).json('List has been updated');
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },
  deleteList: async (req: Request, res: Response) => {
    try {
      const listId: number = parseInt(req.params.id);
      await List.delete(listId);
      res.status(200).json('List has been deleted')
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
}


export default listController;