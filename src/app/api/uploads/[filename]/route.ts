// app/api/uploads/[filename]/route.ts

import { NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"
import mime from 'mime-types';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename
  if (!filename) {
    return new NextResponse("Invalid filename", { status: 400 })
  }

  const filePath = path.resolve("./src/uploads", filename)

  try {
    const file = await fs.readFile(filePath)
    const contentType = mime.lookup(filename) || "application/octet-stream"

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
      },
    })
  } catch (err) {
    return new NextResponse("File not found", { status: 404 })
  }
}
