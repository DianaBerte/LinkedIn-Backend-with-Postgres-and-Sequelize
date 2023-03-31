import express, { request, response } from "express"
import createHttpError from "http-errors"
import UsersModel from "./model.js"
import req from "express/lib/request.js"

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
        const users = await UsersModel.findAll()
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

export default usersRouter