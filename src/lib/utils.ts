import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// le dossier src/lib est le cerveau de l'application (business logic:)
// src/lib/: Contient des fonctions pures, non liées à un environnement particulier, 
// réutilisables partout (client, serveur, jobs, etc.)