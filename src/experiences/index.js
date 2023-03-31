import express, { request, response } from "express";
import createHttpError from "http-errors";
import UsersModel from "../users/model.js";
import ExpModel from "./model.js";
import usersExpModel from "../users/usersExperiencesModel.js";

const expRouter = express.Router()

// expRouter.post("/", async (request, response, next) => {
//     try {
//         const { expId } = await ExpModel.create(request.body)
//         if (request.body.users) {
//             await usersExpModel.bulkCreate(
//                 request.body.users.map(user => {
//                     return { expId: expId, userId: user }
//                 })
//             )
//         }
//         response.status(201).send({ expId })
//     } catch (error) {
//         next(error)
//     }
// })

expRouter.post("/:userId/experiences", async (request, response, next) => {
    try {
        const { expId } = await ExpModel.create({ ...request.body, userId: request.params.userId })
        response.status(201).send({ expId })
    } catch (error) {
        next(error)
    }
})

expRouter.get("/:userId/experiences", async (request, response, next) => {
    try {
        const user = await UsersModel.findByPk(request.params.userId, {
            include: {
                model: ExpModel,
                attributes: ["role", "company", "startDate", "endDate", "description", "area"]
            },
        })
        response.send(user)
    } catch (error) {
        next(error)
    }
})

export default expRouter