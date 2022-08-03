import { NextApiHandler } from "next"
import { createElement } from "react"
import * as ReactDOMServer from 'react-dom/server'
import OgpCode from "../../compoents/Code"
import { codeString } from "../sandbox"

const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(
    <OgpCode codeString={codeString} />
  )
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}

export default handler
