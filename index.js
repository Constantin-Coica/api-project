import router from "./routes/todo.js";
import express from "express";
import { sequelize } from "./db/index.js";


const app = express();

const port = process.env.PORT || 3000;

try {
    const result = await sequelize.sync();
    console.log(result);

} catch(error){
    console.log(error);

}

app.use(express.json());
app.use("/todo", router);




app.listen(port, ()=>{
    console.log("Server is running on " + port)
});