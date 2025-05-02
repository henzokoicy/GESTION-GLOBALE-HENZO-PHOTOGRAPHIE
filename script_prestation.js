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
  //"Quand la page HTML est complètement chargée, exécute ce qu’il y a à l’intérieur."
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulaire_add_reservation");
    // Tu écoutes le moment où quelqu’un clique sur le bouton "Envoyer" du formulaire. et e.preventDefault(); Tu empêches le rechargement automatique de la page (comportement par défaut d’un formulaire)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const servicesname = document.getElementById("servicesname").value;
        const prix = parseFloat (document.getElementById("prix").value);
        const devise = document.getElementById("devise").value;
        const description = document.getElementById("note").value;

    

        try{
            await db.collection("prestation").add({
                servicesname,
                prix,
                devise,
                description,
                dateAjout: new Date() // Date ajout pour savoir quand l'action, est ajouté
            });
            alert("Ajouté avec succès !");
            form.reset();
            afficherReservations();
        } catch (error) {
            console.error("Opération échouée")
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
    afficherReservations();
});
async function afficherReservations() {
    const liste = document.getElementById("reservations");
    liste.innerHTML = "";

    const querySnapshot = await db.collection("prestation").get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const item = document.createElement("li");
      item.textContent = `${data.servicesname} - ${data.prix} - ${data.devise} - ${data.description}`;
      liste.appendChild(item);
    });
  }

