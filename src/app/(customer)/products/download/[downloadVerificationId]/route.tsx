import { NextRequest, NextResponse } from "next/server"
import { getValidDownloadVerification } from "@/lib/queries/download-verification/getValidDownloadVerification"

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const data = await getValidDownloadVerification(downloadVerificationId)

  if (data == null) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url))
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const fileUrl = `${baseUrl}${data.product.filePath}`
  
  const response = await fetch(fileUrl)
  if (!response.ok) throw new Error("Fichier introuvable")
  
  const file = await response.arrayBuffer()
  const size = file.byteLength
  
  const extension = data.product.filePath.split(".").pop()

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  })
}
