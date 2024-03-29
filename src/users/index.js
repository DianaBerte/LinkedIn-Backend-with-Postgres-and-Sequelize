import express, { request, response } from "express"
import createHttpError from "http-errors"
import UsersModel from "./model.js"
import PostsModel from "../posts/model.js"
import ExpModel from "../experiences/model.js"

const usersRouter = express.Router()

usersRouter.post("/", async (request, response, next) => {
    try {
        const { userId } = await UsersModel.create(request.body)
        response.status(201).send({ userId })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async (request, response, next) => {
    try {
        const users = await UsersModel.findAll({})
        response.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/:userId", async (request, response, next) => {
    try {
        const user = await UsersModel.findByPk(request.params.userId)
        if (user) {
            response.send(user)
        } else {
            next(createHttpError(404, `User with id ${request.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

//GET posts:
usersRouter.get("/:userId/posts", async (request, response, next) => {
    try {
        const user = await UsersModel.findByPk(request.params.userId, {
            include: { model: PostsModel, attributes: ["text"] }
        })
        response.send(user)
    } catch (error) {
        next(error)
    }
})

//GET experiences:
usersRouter.get("/:userId/experiences", async (request, response, next) => {
    try {
        const user = await UsersModel.findByPk(request.params.userId, {
            include: { model: ExpModel, attributes: ["role", "company", "startDate", "endDate", "description", "area"] }
        })
        response.send(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/:userId", async (request, response, next) => {
    try {
        const [numberOfUpdatedUsers, updatedUsers] = await UsersModel.update(request.body, { where: { userId: request.params.userId }, returning: true })
        if (numberOfUpdatedUsers === 1) {
            response.send(updatedUsers[0])
        } else {
            next(createHttpError(404, `User with id ${request.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/:userId", async (request, response, next) => {
    try {
        const numberOfDeletedUsers = await UsersModel.destroy({ where: { userId: request.params.userId } })
        if (numberOfDeletedUsers === 1) {
            response.send(204).send()
        } else {
            next(createHttpError(404, `User with id ${request.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default usersRouter