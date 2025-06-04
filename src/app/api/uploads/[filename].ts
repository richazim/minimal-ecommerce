// pages/api/uploads/[filename].ts
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import fs from "fs"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query
  if (typeof filename !== "string") {
    return res.status(400).end("Invalid filename")
  }

  const filePath = path.resolve("./src/uploads", filename)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).end("File not found")
    }
    // Set appropriate content-type (png, jpeg, etc.)
    res.setHeader("Content-Type", "image/png") 
    res.status(200).send(data)
  })
}
