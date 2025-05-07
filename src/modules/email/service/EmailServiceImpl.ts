import SendMailDto from '../dto/sendMail.dto'
import IEmailService from './IEmailService'
import { env } from '../../../config/enviroment'
import { transporter } from '../../../config/emailConfig'

export default class EmailServiceImpl implements IEmailService {
  async sendMail(data: SendMailDto): Promise<void> {
    const {
      customerEmail,
      customerName,
      customerPhoneNumber,
      customerAdress,
      customerNote
    } = data
    const adminEmail = env.MAIL_ADMIN_RECEIVER

    const subject = 'Xác nhận lịch tư vấn - SeaDragon'
    const adminSubject = 'Khách hàng mới đặt lịch tư vấn'

    const customerHtml = `
    <p>Chào ${customerName},</p>
    <p>Bạn đã đặt lịch tư vấn thành công vào lúc <strong>${new Date()}</strong>.</p>
    <p>Chúng tôi sẽ liên hệ bạn sớm nhất.</p>
    <p>Trân trọng,<br/>Đội ngũ SeaDragon</p>
  `

    const adminHtml = `
    <p>Khách hàng <strong>${customerName}</strong> (${customerEmail}) vừa đặt lịch tư vấn vào lúc <strong>${new Date()}</strong>.</p>
    <p>Số điện thoại khách hàng: ${customerPhoneNumber}</p>
    <p>Địa chỉkhách hàng: ${customerAdress}</p>
    <p>Ghi chú từ khách hàng: ${customerNote}</p>
    `
    const customerMail = {
      from: `"SeaDragon Team" <${env.MAIL_USER}>`,
      to: customerEmail,
      subject,
      html: customerHtml
    }

    const adminMail = {
      from: `"SeaDragon System" <${env.MAIL_USER}>`,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml
    }

    await transporter.sendMail(customerMail)
    await transporter.sendMail(adminMail)
  }
}
