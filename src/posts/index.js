import express, { request, response } from "express"
import createHttpError from "http-errors"
import UsersModel from "../users/model.js"
import PostsModel from "./model.js"

const postsRouter = express.Router()

postsRouter.post("/:userId/posts", async (request, response, next) => {
    try {
        const { postId } = await PostsModel.create({ ...request.body, userId: request.params.userId })
        response.status(201).send({ postId })
    } catch (error) {
        next(error)
    }
})

postsRouter.get("/:userId/posts", async (request, response, next) => {
    try {
        const posts = await PostsModel.findAll({ where: { userId: request.params.userId }, include: [{ model: UsersModel, attributes: ["name", "surname"] }] })
        response.send(posts)
    } catch (error) {
        next(error)
    }
})

export default postsRouter