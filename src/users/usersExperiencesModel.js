import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const usersExpModel = sequelize.define("userExperience", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
})

export default usersExpModel