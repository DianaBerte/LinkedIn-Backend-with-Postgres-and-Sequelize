import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import UsersModel from "../users/model.js";

const PostsModel = sequelize.define(
    "post",
    {
        postId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        text: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING(50),
        }
    }
)

UsersModel.hasMany(PostsModel)
PostsModel.belongsTo(UsersModel, { foreignKey: { name: "userId", allowNull: false }, })

export default PostsModel