export default function handler(req, res) {
  try {
    const name = req?.body?.name || req?.query?.name
    if (!name) {
      throw {
        status: 500,
        message: "Name field is required.",
      }
    }

    res.status(200).send({
      msg: `hello ${name}`,
    })
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
