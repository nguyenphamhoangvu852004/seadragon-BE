import SendMailDto from '../dto/sendMail.dto'

export default interface IEmailService {
  sendMail(data: SendMailDto): Promise<void>
}
