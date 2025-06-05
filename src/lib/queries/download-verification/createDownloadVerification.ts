// Simule une base de données in-memory
import { downloadVerifications } from "@/data/downloadVerifications";

// Génère un ID unique basé sur le nombre existant
let nextId = downloadVerifications.length + 1;

export async function createDownloadVerification(productId: string) {
  const now = new Date();

  const newVerification = {
    id: `dv-${String(nextId).padStart(3, '0')}`,
    productId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 24), // expire dans 24h
  };

  downloadVerifications.push(newVerification); // simule l'enregistrement
  nextId++;

  return newVerification.id;
}
