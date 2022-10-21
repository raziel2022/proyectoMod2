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


$form.addEventListener('submit', function(event) {//Escuchamos el evento del submit
    event.preventDefault()//Prevenimos el default del submit
    console.log("Tipo de variable del $input: ",typeof($input));
    const {value}=$input; //asiganmos el valor del input al la variable value
    console.log("Tipo de variable de value: ",typeof(value));
    console.log("Valor de la variable value: ",value); 
    if(!value)return 
    var patronIp = new RegExp("^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$");//expresion regular para determinar numeros entre 0 y 0 en octectos con hasta 3 datos
    var valores;
    if(value.search(patronIp) !== 0) {//El método search() ejecuta una búsqueda que encaje entre una expresión regular y el objeto String desde el que se llama
      alert("Ip invalida")// de no cumplir con la expresion regular manda una alerta de Ip no vaidad
      return false
    }else{
      valores = value.split(".").map(function(item) {//de cumplir con el criterio anterior vamos a dividir (split) i guadarlo en un arra ero vamos a copiarlos tal cual ahora como valores enteros
        return parseInt(item, 10);//Funcion de alto nivel que convierte una cadena "string" en un entero
    }); 
      console.log(typeof(valores));//Vemos el tipo de variable que ya es un objeto
      console.log(valores)
      if(((0 <= valores[0] <= 255) && (0 <=valores[1] <= 255) && (0 <=valores[2] <= 255) && (0 <= valores[3] <= 255))===true){//Validamos que cada valor de valores[i] tenga un valor entre 0 y 255 (aun tiene fallas)
        console.log("Es verdadero");
        return geoIP(value);//De cumplorse mandamos a llamar la funcion geoIP pero le pasamos el valor de value que es un string
    }
  }
}
)
async function geoIP(value){//funcion asincrona que recibe como parameto la ip en formato string
  $submit.setAttribute('disabled', '') //el button mientras se esta realizando la búsqueda deshablita el boton
  $submit.setAttribute('aria-busy', 'true')//mientras realiza la búsqueda realiza el efecto de busy
  
  const ipInfo = await fetchIpInfo(value); //ipInf recibe el valor respuesta del fetch un objeto
  console.log(typeof(ipInfo)); 
  console.log(ipInfo);
 
  if(ipInfo){//si existe ipInfo realizamos lo siguiente

    $submit.setAttribute('aria-busy', 'false'); //Cambiamos los atributos del button submit
    $submit.removeAttribute('disabled');//le retiramos el attributo de disable para poder ejecuar otras consultas
    $results.innerText =JSON.stringify(ipInfo, null, 2); // Con el metodo stringify convertimos un valor de js a JSON string
  
    addTable(ipInfo.ip,ipInfo.latitude,ipInfo.longitude,ipInfo.isp);//llamamos a la funcion addTable y le pasamos los parametros que nos interesan que son IP, Latitud, Longitud e ISP
  }
}

var list = document.getElementById('table');
let tablaContent = ``;

var addTable= function(ip,latitude,longitude,isp){//Con los parametros que se paaron construimos la tabla
        var tablaContent = `
          <tr>
            <td>${ip}</td>
            <td>${latitude}</td>
            <td>${longitude}</td>
            <td>${isp}</td>
          </tr>
        `
      //Finalmente añadimos el contenido a la tabla
      list.innerHTML += tablaContent//imprimos la tabla
}

const box = document.getElementById('results'); //box estara asociado al id de results(donde se despliega el JSON)

const btn = document.getElementById('btn');// Asignamos a la variables btn el botn btn

btn.addEventListener('click', function Click() {// escuchamos el evento del clic
  if (box.style.display === 'none') {//Si el atributo display esta en "none" lo cambiamos a "bloc" y viceversa
    box.style.display = 'block';
    btn.textContent = 'Ocultar';//cambiamos el texto del boton de acuerdo a la opcion
  } else {
    box.style.display = 'none';
    btn.textContent = 'Mostrar';//cambiamos el texto del boton de acuerdo a la opcion
  }
});

      




