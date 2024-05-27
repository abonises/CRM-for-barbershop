import express from 'express'
const router = express.Router()
import usersController from '../controllers/usersController'

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

export default router;