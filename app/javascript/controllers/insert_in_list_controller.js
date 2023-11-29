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


get_all_companies(event) {
  event.preventDefault()
  fetch("https://api.dealroom.co/api/v2/companies", {
    "headers": {
      "accept": "*/*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6,tr;q=0.5",
      "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjR5RXVHSXRVcThZYkRSUVpUVDVoOCJ9.eyJodHRwczovL2RlYWxyb29tLmNvL3VzZXJfdXVpZCI6ImRiNGMyOWM4LTRhYjgtNGEzOC05NGE0LWY2MDZiNzNiZWQ3MyIsImh0dHBzOi8vZGVhbHJvb20uY28vcm9sZXMiOlsic3RhbmRhcmQiXSwiaHR0cHM6Ly9kZWFscm9vbS5jby9lbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9kZWFscm9vbS5jby9pc19zb2NpYWwiOnRydWUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZGVhbHJvb20uY28vIiwic3ViIjoibGlua2VkaW58QW1mSmxRdG9yYiIsImF1ZCI6WyJodHRwczovL2FwaS5kZWFscm9vbS5jby9hcGkvdjIiLCJodHRwczovL2RlYWxyb29tLXByb2R1Y3Rpb24uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMTI1NTE0NCwiZXhwIjoxNzAxMzQxNTQ0LCJhenAiOiIyYlM4WE9zY0F6cGw3Z0lZT0cxZTVEaHVmZjVPOGd0MyIsInNjb3BlIjoib3BlbmlkIiwicGVybWlzc2lvbnMiOltdfQ.fdaXwJ-LzoWnW1XIFKY9jHLeOCFKGtnuey37EMMrnA4993ZJrnnmBATeOAAtt5OrqfFNyI4DTwk4dggHL6yrJGgUS9CiG8sQbjiTVqOAfZVrQYA5ePp9LSYUDdTiDbf1377gDdxU2DjMrkaeJ2ijQ4QfHyLCQCYyScrWPaO0Mq7ug6V15wNokHXqbc7Wxw-ExMhkhNMW23EsRs_BJ73XUkXrxjbWuKG8frJZDqyU9CaxU1K1go5Diuw7tVv2-Yz5dPbdpFBgdCVdOCm5it9L5RlaEZ6Ha8g5PBQhxEAXLU4E6aJjvRoxbv6McssLErI4YM-3iozMrIxB4BltZE6_qw",
      "content-type": "application/json",
      "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-dealroom-app-id": "060818060",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://ecosystem.lafrenchtech.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": '{\"fields\":\"uuid,angellist_url,appstore_app_id,client_focus,company_status,core_side_value,corporate_industries,create_date,crunchbase_url,employee_12_months_growth_delta,employee_12_months_growth_percentile,employee_12_months_growth_relative,employee_12_months_growth_unique,employee_3_months_growth_delta,employee_3_months_growth_percentile,employee_3_months_growth_relative,employee_3_months_growth_unique,employee_6_months_growth_delta,employee_6_months_growth_percentile,employee_6_months_growth_relative,employee_6_months_growth_unique,employees_chart,employees_latest,employees,entity_sub_types,facebook_url,founders_score_cumulated,founders,founders_top_university,founders_top_past_companies,fundings,fundings,growth_stage,has_strong_founder,has_super_founder,has_promising_founder,hq_locations,images,income_streams,industries,innovations,innovations_count,innovation_corporate_rank,investments,investors,is_editorial,is_ai_data,is_from_traderegister,ipo_round,kpi_summary,latest_revenue_enhanced,latest_valuation_enhanced,launch_month,launch_year,linkedin_url,lists_ids,matching_score,name,patents_count,participated_events,past_founders_raised_10m,past_founders,path,playmarket_app_id,revenues,sdgs,service_industries,similarweb_12_months_growth_delta,similarweb_12_months_growth_percentile,similarweb_12_months_growth_relative,similarweb_12_months_growth_unique,similarweb_3_months_growth_delta,similarweb_3_months_growth_percentile,similarweb_3_months_growth_relative,similarweb_3_months_growth_unique,similarweb_6_months_growth_delta,similarweb_6_months_growth_percentile,similarweb_6_months_growth_relative,similarweb_6_months_growth_unique,similarweb_chart,sub_industries,startup_ranking_rating,tags,tagline,technologies,total_funding_enhanced,total_jobs_available,type,tech_stack,twitter_url,year_became_unicorn,year_became_future_unicorn,job_roles\",\"limit\":25,\"offset\":150,\"form_data\":{\"must\":{\"filters\":{\"locations\":{\"values\":[\"France\"],\"execution\":\"and\"},\"company_status\":{\"values\":[\"low-activity\",\"closed\"],\"execution\":\"or\"},\"data_type\":{\"values\":[\"Verified\"],\"execution\":\"or\"}},\"execution\":\"and\"},\"should\":{\"filters\":{}},\"must_not\":{\"growth_stages\":[\"mature\"],\"company_type\":[\"service provider\",\"government nonprofit\"],\"tags\":[\"outside tech\"],\"company_status\":[\"closed\"]}},\"multi_match\":false,\"keyword_match_type\":\"fuzzy\",\"sort\":\"startup_ranking_runners_up_rank\",\"keyword_type\":\"default_next\"}',
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then(response => response.json())
  .then((data) => {
    console.log(data);
  });

}







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
