import { NextRequest, NextResponse } from "next/server";
import { getValidDownloadVerification } from "@/lib/queries/download-verification/getValidDownloadVerification";

export const dynamic = 'force-dynamic'; // Elle force la route à être rendue dynamiquement à chaque appel, c’est-à-dire que le code de ton handler (GET) sera exécuté à chaque requête HTTP, même si le reste de l'app utilise le cache statique.

export async function GET(
  req: NextRequest,
  { params }: { params: { downloadVerificationId: string } }
) {
  const { downloadVerificationId } = params;

  // Vérifie la validité de la vérification de téléchargement
  const data = await getValidDownloadVerification(downloadVerificationId);

  if (!data) {
    return NextResponse.redirect(new URL("/products/download/expired", req.url));
  }

  const fileUrl = data.product.filePath;

  // try {
  //   const response = await fetch(fileUrl);

  //   if (!response.ok) {
  //     console.error("Fichier non trouvé à l'URL:", fileUrl);
  //     return new NextResponse("Fichier introuvable", { status: 404 });
  //   }

  //   const fileBuffer = await response.arrayBuffer();
  //   const size = fileBuffer.byteLength;
  //   const extension = data.product.filePath.split(".").pop() || "bin";

  //   return new NextResponse(fileBuffer, {
  //     status: 200,
  //     headers: {
  //       "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
  //       "Content-Length": size.toString(),
  //       "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
  //     },
  //   });
  // } catch (error) {
  //   console.error("Erreur de récupération du fichier:", error);
  //   return new NextResponse("Erreur interne de récupération du fichier", { status: 500 });
  // }

  return NextResponse.redirect(fileUrl);
}
