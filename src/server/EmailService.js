require('dotenv').config()
import _ from 'lodash'
import nodemailer from "nodemailer"

let sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      });
      
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"TakisCare" <takistechcommunity@gmail.com>', // sender address
          to: data.receiverEmail, // list of receivers
          subject: "Thông tin đặt lịch khám bệnh", // Subject line
          html: `
            <h3>Xin chào: ${data.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên TakisCare</p>
            <div style="color: red">Thông tin đặt lịch khám bệnh</div>
            <div><b>Thời gian: ${data.time}</b></div>
            <div><b>Bác sĩ: ${data.doctorName}</b></div>
            <p>Nếu thông tin trên là đúng sự thật, vui long click vào link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div>
                <a href="${data.redirectLink}" target="_blank">Click here</a>
            </div>
            <p>Xin chân thành cảm ơn bạn đã đặt lịch!</p>
          `, // html body
        });
}

module.exports = {
    sendEmail
}