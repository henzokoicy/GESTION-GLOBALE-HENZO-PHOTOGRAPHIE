// script.js
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
  
      const nom = document.getElementById("nom").value;
      const ville = document.getElementById("ville").value;
      const description = document.getElementById("note").value;
      const sexe = document.querySelector('input[name="sexe"]:checked')?.value;
  
      try {
        await db.collection("clients").add({
          nom,
          sexe,
          ville,
          description,
          dateAjout: new Date()
        });
  
        alert("Client ajouté avec succès !");
        form.reset();
        afficherClients();
      } catch (error) {
        console.error("Erreur lors de l'ajout du client :", error);
        alert("Une erreur est survenue.");
      }
    });
  
    afficherClients();
  });
  
  async function afficherClients() {
    const liste = document.getElementById("clients");
    liste.innerHTML = "";
  
    const querySnapshot = await db.collection("clients").get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("li");
      item.textContent = `${data.nom} - ${data.sexe} - ${data.ville} - ${data.description}`;
      liste.appendChild(item);
    });
  }
  