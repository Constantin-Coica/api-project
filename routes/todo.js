import Router from "express";
import {getToDo, addToDo, getToDoById, deleteToDo, updateToDoById, getToDoByPriority} from "../controllers/todo.js";



const router = Router();


router.get("/", getToDo);

router.post("/", addToDo);

router.get("/:id", getToDoById);

router.delete("/:id", deleteToDo);

router.put("/:id", updateToDoById);




export default router;
