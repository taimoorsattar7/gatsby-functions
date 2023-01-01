import { sendEmailSG } from "../lib/sendEmailSG"

export default async function handler(req, res) {
  const email = req?.body?.email || req?.query?.email
  const subject = req?.body?.subject || req?.query?.subject
  const message = req?.body?.message || req?.query?.message

  try {
    let responce = await sendEmailSG({
      email: email ? email : process.env.EMAIL_FROM,
      subject: subject,
      html: message,
    })

    res.status(200).json({
      emailSend: responce.emailSend ? true : responce,
    })
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
