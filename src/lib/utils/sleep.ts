export const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

// Cette fonction crée une nouvelle promise ie: opération asynchrone
// le paramètre resolve est une fonction de promise qui permet d'indiquer que la promise est terminée avec succès.
