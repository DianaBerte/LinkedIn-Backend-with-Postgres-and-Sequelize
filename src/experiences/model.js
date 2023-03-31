import { DataTypes } from "sequelize"
import sequelize from "../db.js"
import usersExpModel from "../users/usersExperiencesModel.js"
import UsersModel from "../users/model.js"

const ExpModel = sequelize.define(
    "experience",
    {
        expId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        endDate: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        area: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }
)

//Many to many:
// ExpModel.belongsToMany(UsersModel, {
//     through: usersExpModel,
//     foreignKey: { name: "expId", allowNull: false }
// })
// UsersModel.belongsToMany(ExpModel, {
//     through: usersExpModel,
//     foreignKey: { name: "userId", allowNull: false },
// })

UsersModel.hasMany(ExpModel, { foreignKey: { name: "userId", allowNull: false } })
ExpModel.belongsTo(UsersModel, { foreignKey: { name: "userId", allowNull: false }, })

export default ExpModel