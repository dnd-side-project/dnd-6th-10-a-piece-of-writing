import { NextApiRequest, NextApiResponse } from 'next'
import httpStatus from 'http-status'
import Tesseract from 'tesseract.js'

const image = async ({ method, query }: NextApiRequest, res: NextApiResponse) => {
  try {
    // const result = { message: 'Success' }
    let statusCode = httpStatus.OK

    switch (method) {
      case 'GET':
        const { url, langs } = query
        if (!url || typeof url !== 'string' || typeof langs !== 'string')
          return res.status(httpStatus.BAD_REQUEST).json({ message: 'No url!' })

        const result = await Tesseract.recognize(url, langs || 'eng')
        return res.status(statusCode).json({ result: result?.data?.text })
      case 'POST': // User Login
        return res.status(statusCode).json({ message: 'test' })
      default:
        return res.status(httpStatus.NOT_IMPLEMENTED).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ messsage: 'Unexpected Server Error' })
  }
}

export default image
