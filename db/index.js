import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo_db", "root","password", {
    host: "localhost",
    dialect:"mysql",
});