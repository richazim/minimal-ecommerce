# 🛍️ Minimal Ecommerce

Un site e-commerce **léger et minimaliste**, axé sur un design épuré et les fonctionnalités essentielles.  
Le projet se compose :

- d’un **front-end responsive** pour les clients ;
- d’un **panneau d’administration séparé** pour gérer produits, commandes et autres opérations de la boutique.

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)  
2. [Technologies](#technologies)  
3. [Installation](#installation)  
4. [Panneau d’administration](#panneau-dadministration)  
5. [Utilisation](#utilisation)  
6. [Contribuer](#contribuer)  
7. [Licence](#licence)

---

## Fonctionnalités

- **Design responsive** : adaptation parfaite à tous les écrans.  
- **Liste de produits** : nom, prix, description, images.  
- **Panier** : ajout, suppression et mise à jour des articles.  
- **Processus de paiement** : flux de commande simplifié.  
- **Intégration admin** : gestion des produits, commandes et réglages via un panneau dédié.  
- **Interface minimaliste** : UX claire et intuitive pour une expérience d’achat fluide.

---

## Technologies

| Couche            | Outils / Langages                                       |
|-------------------|---------------------------------------------------------|
| **Front-end**     | HTML · CSS · JavaScript *(ou Next.js / React si besoin)* |
| **Back-end**      | *(à préciser : ex. Node.js, Express…)*                  |
| **Base de données** | *(à préciser : ex. MongoDB, MySQL… ou aucune pour un site statique)* |
| **Panneau admin** | Dépôt séparé pour les tâches d’administration           |
| **Autres outils** | *(Bootstrap, Tailwind, React, etc. si utilisés)*        |

> Ajuste ce tableau en fonction de la stack exacte de ton projet.

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/richazim/minimal-ecommerce.git
cd minimal-ecommerce
```

2. Installer les dépendances
(si applicable)
npm install         # ou pnpm / yarn

3. Configurer l’environnement
S’il existe un back-end ou une base de données, crée un fichier .env :
cp .env.example .env
Renseigne les clés API, chaînes de connexion, etc.

4. Lancer l’application
Site statique :
npx http-server      # ou ouvrir directement index.html
Back-end :
npm start            # ou la commande équivalente

5. Accéder au site
Ouvre http://localhost:8080 (ou le port défini) dans ton navigateur.

Panneau d’administration
Le panneau admin est maintenu dans un dépôt distinct :
🔗 Minimal Ecommerce Admin Panel → https://github.com/richazim/minimal-ecommerce-admin-panel

Mise en place
git clone https://github.com/richazim/minimal-ecommerce-admin-panel.git
cd minimal-ecommerce-admin-panel
Suis ensuite le README du dépôt pour le configurer et le lancer, en veillant à ce qu’il pointe vers le même back-end / la même base de données que la boutique.

Utilisation
Parcourir les produits depuis la page d’accueil.
Ajouter au panier les articles souhaités.
Passer à la caisse pour finaliser la commande.
Gestion côté admin : ajouter / modifier des produits, consulter les commandes, ajuster les paramètres du magasin.

Contribuer
Les contributions sont les bienvenues !
Fork le dépôt.
Crée une branche :
git checkout -b feature/ma-fonctionnalité
Apporte tes modifications, puis :
git commit -m "Ajout de ma fonctionnalité"
git push origin feature/ma-fonctionnalité
Ouvre une pull request. Merci de respecter les conventions de codage du projet et d’ajouter des tests pertinents si nécessaire.

Licence
Ce projet est distribué sous la licence MIT.
Consulte le fichier LICENSE pour plus de détails.