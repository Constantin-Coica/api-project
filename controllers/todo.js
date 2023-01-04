import {Op} from "sequelize";
import {ToDo} from  "../models/todo.js";


export const addToDo = async (req,res)=>{
    try{
        const todo = await ToDo.create(req.body);
        res.status(201).send({data: `ToDo has been created: ${todo.id} created.`});
    } catch (error) {
        res.status(403).send(error.message);
    }

    
}

export const getToDoByPriority = async (req, res)=>{
    const {priority} =req.query;


    try {
        let todo;
        if(priority === "desc"){
            todo = await ToDo.findAll({
                order:[
                    ["priority", "DESC"]
                ]
            });
        } else if(priority === "asc"){
            todo = await ToDo.findAll({
                order:[
                    ["priority", "ASC"]
                ]
            });
        } else {
            throw new Error("Unknow Query.")
        }
        
        res.send(todo);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const getToDo = async (req, res)=>{
    const {title, priority} =req.query;
    const queryValues = {where: {}};
    if(title){
        queryValues.where.title = {[Op.like]: `%${title}%`};
    }

    try {
        let todo;
        if(priority){
            if(priority.toLowerCase() === "desc"){
                todo = await ToDo.findAll({queryValues,order: [["priority", "DESC"]]});
            } else if(priority.toLowerCase()==="asc"){
                todo = await ToDo.findAll({queryValues,order: [["priority", "ASC"]]});
            } else {
                throw new Error(`Unknown priority query, try "asc" or "desc`);
            }
        } else{
            todo = await ToDo.findAll(queryValues);
        }
        
        
        res.send(todo);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const getToDoById = async (req,res) =>{
    const {id} = req.params;
    const todo = await ToDo.findByPk(id);
    
    try{
        if(!todo){
            throw new Error ("ToDo not found.");
        }
        res.status(200).send({data: todo});
    }catch(error){
        res.status(404).send(error.message)
    }
};


export const deleteToDo = async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = await ToDo.findByPk(id);
    
    try {
        if(!todo){
            throw new Error ("ToDo not found.");
        }
      await todo.destroy();
      res.status(200).send(todo);
    } catch(error) {
        res.status(404).send(error.message)
    }
  };


export const updateToDoById = async (req, res) =>{
    const id = parseInt(req.params.id);
    const todo = await ToDo.findByPk(id);
    const {title, priority, textBody, completionTime} = req.body;
    
    
    try {
        if(!todo){
            throw new Error ("ToDo not found.");
        }
        if(title){
            todo.title = title;
        }

        if(priority){
            todo.priority = priority;
        }

        if(textBody){
            todo.textBody = textBody;
        }

        if(completionTime){
            todo.completionTime = completionTime;
        }
        
        await todo.save();
        res.status(200).send(`ToDo ${id} has been updated`);
        
      } catch(error) {
        res.status(404).send(error.message)
      };
      
}