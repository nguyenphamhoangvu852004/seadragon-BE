import { Router } from 'express'
import EmailServiceImpl from '../../modules/email/service/EmailServiceImpl'
import EmailController from '../../modules/email/email.controller'
const router = Router()

// export const repo = new CustomerRepoImpl()
const service = new EmailServiceImpl()
const controller = new EmailController(service)

router.post('/', controller.sendMail.bind(controller))
export const emailRouter = router
