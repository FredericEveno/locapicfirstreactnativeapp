# locapicfirstreactnativeapp
First react native app with expo

Locapic est une application React Native réalisée avec Expo

Elle met en oeuvre les notions suivantes :
- Sign-in simple en saisissant un pseudo, stocké dans le store redux. Quand on relance l'appli, on retrouve son historique
- Une map avec géolocalisation en temps réel (websocket)
- Un chat en temps réel (websocket)
- Un ajout de POI et une vue listant ces POI et permettant de les supprimer

Pour lancer l'appli vous avez besoi d'installer EXPO sur votre telephone et devez être connecté sur le même réseau wifi avec 
votre tel et votre PC

- Clonez le dépôt
- Lancer le backend : cd locapic/backend + nodemon
- Lancer le front : cd locapic + npm start
- Puis scannez le QR code ave votre tel sur la page qui s'ouvre alors
