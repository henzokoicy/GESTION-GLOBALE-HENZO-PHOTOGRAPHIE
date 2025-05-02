// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuDZN1xO0o54TAU5ilX0hhxj0IXGXrV_U",
  authDomain: "gestion-de-clients-hep.firebaseapp.com",
  projectId: "gestion-de-clients-hep",
  storageBucket: "gestion-de-clients-hep.firebasestorage.app",
  messagingSenderId: "1069067034496",
  appId: "1:1069067034496:web:3a56b5b26eeae4e6adeb65"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulaire_add_clients");

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Récupération des valeurs du formulaire
      const nom = document.getElementById("nom").value;
      const ville = document.getElementById("ville").value;
      const description = document.getElementById("note").value;
      const sexe = document.querySelector('input[name="sexe"]:checked')?.value;
      const indicatif = document.getElementById("indicatif").value;
      const numero = document.getElementById("telephone").value;
      const numeroComplet = indicatif + numero;

      try {
          // Enregistrer le client dans Firebase
          await db.collection("clients").add({
              nom,
              sexe,
              ville,
              description,
              numeroComplet,
              dateAjout: new Date()
          });

          alert("Client ajouté avec succès !");
          form.reset();  // Réinitialiser le formulaire
          afficherClients();  // Mettre à jour la liste des clients
      } catch (error) {
          console.error("Erreur lors de l'ajout du client :", error);
          alert("Une erreur est survenue : " + error.message);
      }
  });

  afficherClients();  // Charger les clients existants à l'initialisation
});

// Fonction pour afficher les clients
async function afficherClients() {
  const liste = document.getElementById("clients");
  liste.innerHTML = "";  // Réinitialiser la liste avant de la remplir

  // Récupérer tous les clients depuis Firestore
  const querySnapshot = await db.collection("clients").get();
  querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("li");

      // Afficher les informations du client
      item.textContent = `${data.nom} - ${data.sexe} - ${data.ville} - ${data.description} - ${data.numeroComplet}`;

      // Ajouter chaque client à la liste
      liste.appendChild(item);
  });
}
