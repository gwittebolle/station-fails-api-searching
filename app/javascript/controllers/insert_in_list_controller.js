class Firm {
  constructor(name, founders) {
    this.name = name;
    this.founders = founders;
    // Ajoutez d'autres propriétés en fonction de votre classe Firm
  }
}

const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["items", "form", "firm", "result"]

scrap(event) {
  event.preventDefault()

  const formData = new FormData(this.formTarget)

  // Récupérer la valeur du champ "name"
  const firmName = formData.get('firm[name]');
  // Utiliser la valeur récupérée
  console.log(firmName);

  fetch(`https://api.dealroom.co/api/v2/entities/${firmName}`, {
    headers: {
      "content-type": "application/json",
      "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "x-dealroom-app-id": "060818060",
      "x-requested-with": "XMLHttpRequest"
    },
    referrer: "https://ecosystem.lafrenchtech.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit"
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      // Créer une nouvelle instance de la classe Firm avec les données récupérées
      const newFirm = new Firm(firmName, data.founders[0].name);
      // Enregistrez l'instance de la firme (ajustez cela en fonction de votre logique de sauvegarde côté serveur)
      this.save(newFirm);
      this.displayData(data);
    });
};


save(firm) {

  // Ici, vous pouvez envoyer la nouvelle firme au serveur pour enregistrement, par exemple :
  fetch('/firms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify({ firm }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Réponse du serveur après enregistrement de la firme :', data);

      if (data.inserted_item) {
        // beforeend could also be dynamic with Stimulus values
        console.log(data)
      this.itemsTarget.insertAdjacentHTML("beforeend", data.inserted_item)
      // this.itemsTarget.insertAdjacentHTML("beforeend", `<p>Founders: ${firm.founders}</p>`);
      }
      this.formTarget.outerHTML = data.form
    })
  }

  displayData(data) {
    const resultDiv = this.resultTarget;

    // Effacez le contenu actuel de la div
    resultDiv.innerHTML = '';

    // Vérifiez si data est un tableau
    if (Array.isArray(data)) {
      // Créez une liste pour afficher les éléments
      const list = document.createElement('ul');

      // Boucle à travers les données et créez des éléments HTML pour les afficher
      data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
        // Ajoutez d'autres propriétés selon votre modèle de données
        list.appendChild(listItem);
      });

      // Ajoutez la liste à la div de résultat
      resultDiv.appendChild(list);
    } else {
      // Si data n'est pas un tableau, affichez-le directement (ajustez selon vos besoins)
      resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  }
}
