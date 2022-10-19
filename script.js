const OPTIONS = {
    method: 'GET',
    headers: {
		'X-RapidAPI-Key': '50aa8dd555msh7d85d88a1964cd9p198e6ejsn70d3e7a57b3f',
		'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
	}
}
const fetchIpInfo = ip => {
    return fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`, OPTIONS)
    .then(res => res.json())
	.catch(err => console.error(err));
}
const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $submit = document.querySelector('#submit');
const $results = document.querySelector('#results');

$form.addEventListener('submit', async(event) => {
    event.preventDefault()
    const {value}=$input
    if(!value) return

    $submit.setAttribute('disabled', '') 
    $submit.setAttribute('aria-busy', 'true')

    const ipInfo =  await fetchIpInfo(value)
   
    if(ipInfo){
       $submit.setAttribute('aria-busy', 'false');
       $results.innerText =JSON.stringify(ipInfo, null, 2);
       addTable(ipInfo.ip,ipInfo.latitude,ipInfo.longitude,ipInfo.isp);
      }
      
})


var list = document.getElementById('table');

let tablaContent = ``;

var addTable= function(ip,latitude,longitude,isp){
  
        tablaContent = `
          <tr>
            <td>${ip}</td>
            <td>${latitude}</td>
            <td>${longitude}</td>
            <td>${isp}</td>
          </tr>
        
        `
      //Finalmente añadimos el contenido a la tabla
      list.innerHTML += tablaContent
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;