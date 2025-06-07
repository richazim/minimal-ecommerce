"use server"

import db from "@/db/db"
import fs from "fs/promises"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"


export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } })
  
    if (product == null) return notFound()
  
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
  
    revalidatePath("/")
    revalidatePath("/products")
  }