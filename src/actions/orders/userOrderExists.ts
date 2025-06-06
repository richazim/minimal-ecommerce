"use server"

import db from "@/db/db"

export async function userOrderExists(email: string, productId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (!user) return false

  const orderExists = await db.order.findFirst({
    where: {
      userId: user.id,
      productId,
    },
  })

  return orderExists !== null
}


// src/actions: Contient des fonctions exécutées côté serveur via la directive "use server"