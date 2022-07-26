import { NextApiHandler } from "next"
import { createElement } from "react"
import * as ReactDOMServer from 'react-dom/server'
import OgpCode from "../../compoents/Code"

const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(
    <OgpCode />
  )
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}

export default handler
