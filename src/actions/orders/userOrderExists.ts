"use server"

import { orders } from "@/data/orders"
import { users } from "@/data/users"

export async function userOrderExists(email: string, productId: string): Promise<boolean> {
  const user = users.find(user => user.email === email)
  if (!user) return false

  return orders.some(order => order.userId === user.id && order.productId === productId)
}

// src/actions: Contient des fonctions exécutées côté serveur via la directive "use server"