import { NextRequest, NextResponse } from "next/server"
import { getValidDownloadVerification } from "@/lib/queries/download-verification/getValidDownloadVerification"

export const dynamic = 'force-dynamic';


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ downloadVerificationId: string }> }
) {
  const { downloadVerificationId } = await params

  // Vérifie la validité de la vérification de téléchargement
  const data = await getValidDownloadVerification(downloadVerificationId)

  if (!data) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url))
  }

  // Construit l'URL du fichier à télécharger
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const fileUrl = `${baseUrl}${data.product.filePath}`

  try {
    const response = await fetch(fileUrl)
    if (!response.ok) {
      return new NextResponse("Fichier introuvable", { status: 404 })
    }

    const fileBuffer = await response.arrayBuffer()
    const size = fileBuffer.byteLength
    const extension = data.product.filePath.split(".").pop() || "bin"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
        "Content-Length": size.toString(),
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      },
    })
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error)
    return new NextResponse("Erreur interne", { status: 500 })
  }
}
