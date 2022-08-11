import { Router } from "express";
import * as ApiController from '../controllers/apiController'
import { Auth } from './../middlewares/auth';

const router = Router()

router.get('/ping', ApiController.ping)

router.post('/register', ApiController.register)
router.post('/login', ApiController.login)
router.post('/request', Auth.private, ApiController.request)

router.get('/requestGAMES1', ApiController.requestGames1)
router.get('/requestGAMES2', ApiController.requestGames2)
router.get('/requestGAMES3', ApiController.requestGames3)



export default router 