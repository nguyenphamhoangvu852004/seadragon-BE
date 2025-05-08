import SendMailDto from './dto/sendMail.dto'
import { Request, Response } from 'express'
import IEmailService from './service/IEmailService'

export default class EmailController {
  emailService: IEmailService
  constructor(emailService: IEmailService) {
    this.emailService = emailService
  }

  async sendMail(req: Request, res: Response) {
    try {
      const { email, name, phoneNumber, address, customerNote } = req.body
      const dto = new SendMailDto({
        customerEmail: email,
        customerName: name,
        customerNote: customerNote,
        customerAdress: address,
        customerPhoneNumber: phoneNumber
      })
      await this.emailService.sendMail(dto)

      res.status(200).json({
        status: 200,
        message: 'Send mail successfully',
        data: {}
      })
      return
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error instanceof Error ? error.message : 'An error occurred',
        data: {}
      })
      return
    }
  }
}
