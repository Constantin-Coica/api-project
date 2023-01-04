import { Sequelize } from "sequelize";
import {sequelize} from "../db/index.js";

export const ToDo = sequelize.define(
    /* Setting up columns
    - Primary Key
    - Types */
    "todo", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        priority:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        textBody:{
            type: Sequelize.STRING,
            allowNull:true,
        },
        completionTime:{
            type: Sequelize.STRING,
            allowNull:true,
        }
    }, 
    //Renaming the auto generated columns.
    {
        updatedAt: "updated_at",
        createdAt: "created_at",
    });
