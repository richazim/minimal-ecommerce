"use server"

import db from "@/db/db"
import fs from "fs/promises"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"
import { extractFilenameFromPath } from "@/app/admin/_lib/utils/filename"


export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } })
  
    if (product == null) return notFound()
    
    const realFilePath = extractFilenameFromPath(product.filePath)
    const realImagePath = extractFilenameFromPath(product.imagePath)

    await fs.unlink(realFilePath)
    await fs.unlink(realImagePath)
  
    revalidatePath("/")
    revalidatePath("/products")
  }