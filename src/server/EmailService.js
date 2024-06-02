require("dotenv").config();
import _ from "lodash";
import nodemailer from "nodemailer";

let sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
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
            <div><b>Tài khoản và mật khẩu đăng nhập trên TakisCare để xem lịch sử đặt khám của bạn là: </b></div>
            <p>Tài khoản: ${data.receiverEmail}</p>
            <p>Mật khẩu: ${data.receiverEmail}</p>
            <p>Nếu thông tin trên là đúng sự thật, vui long click vào link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div>
                <a href="${data.redirectLink}" target="_blank">Click here</a>
            </div>
            <p>Xin chân thành cảm ơn bạn đã đặt lịch!</p>
          `, // html body
  });
};

let sendAttachment = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"TakisCare" <takistechcommunity@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Thông tin kết quả khám bệnh", // Subject line
    html: `
        <h3>Xin chào: ${data.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên TakisCare</p>
        <div>Thông tin kết quả khám bệnh</div>
        <div><b>Triệu chứng / Chuẩn đoán: ${data.trieuchung}</b></div>
        <div><b>Lời dặn của bác sĩ: ${data.loidan}</b></div>
        <p>Xin chân thành cảm ơn bạn đã tin tưởng dịch vụ của TakisCare!</p>
        <div>Thông tin hoá đơn/đơn thuốc bên dưới</div>
      `, // html body
    attachments: [
      {
        // encoded string as an attachment
        filename: `remedy-${data.patientId}-${new Date().getTime()}.png`,
        content: data.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

let sendExtra = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"TakisCare" <takistechcommunity@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Thông tin nhắc lại lịch khám bệnh", // Subject line
    html: `
        <h3>Xin chào: ${data.patientName}!</h3>
        <h3>${data.imgBase64}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trước đó trên TakisCare</p>
        <div>Email này thông báo bạn đã đến lịch nhắc lại khám bệnh. Bạn hãy đăng ký lại lịch khám để được kiểm tra lại.</div>
        <p>Xin chân thành cảm ơn bạn đã tin tưởng dịch vụ của TakisCare!</p>
        <div>Bỏ qua email này nếu bạn không khám bệnh trước đó.</div>
      `, // html body
  });
};

let sendCancelBooking = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"TakisCare" <takistechcommunity@gmail.com>', // sender address
    to: data.patientData.email, // list of receivers
    subject: "Thông tin hủy lịch khám bệnh", // Subject line
    html: `

        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trước đó trên TakisCare</p>
        <div>Email này thông báo bạn đã hủy lịch khám trên TakisCare.</div>
        <p>Xin chân thành cảm ơn bạn đã tin tưởng dịch vụ của TakisCare!</p>
        <div>Bỏ qua email này nếu bạn không khám bệnh trước đó.</div>
      `,
  });
};

module.exports = {
  sendEmail,
  sendAttachment,
  sendExtra,
  sendCancelBooking,
};
