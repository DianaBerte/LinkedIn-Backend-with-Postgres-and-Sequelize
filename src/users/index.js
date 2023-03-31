import express, { response } from "express"
import createHttpError from "http-errors"
import UsersModel from "./model.js"

const usersRouter = express.Router()

usersRouter.post("/", async (request, response, next) => {
    try {
        const { userId } = await UsersModel.create(request.body)
        response.status(201).send({ userId })
    } catch (error) {
        next(error)
    }
})

export default usersRouter