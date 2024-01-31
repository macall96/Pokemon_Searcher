const txtPokemon = document.getElementById("txtSeleccion");
const buscador = document.getElementById("contenedorSeleccion");
const contenedorInformacion = document.getElementById("contenedorInfo");


buscador.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const resultado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${txtPokemon.value}/`);
    console.log(resultado.data);
    
    // Crear un objeto datos con la información que deseas
    const datos = {
      nombre: resultado.data.name,
      foto: resultado.data.sprites.other['official-artwork'].front_default,
      experiencia: resultado.data.base_experience,
      altura: resultado.data.height,
      peso: resultado.data.weight,
      indices: resultado.data.game_indices['0'].game_index
    };

    // Verificar si ya había un elemento anterior en el contenedor y eliminarlo
    while (contenedorInformacion.firstChild) {
      contenedorInformacion.removeChild(contenedorInformacion.firstChild);
    }

    // Crear un elemento de lista con los datos
    const atributos = document.createElement("ul");
    atributos.className="estilo-tarjetas";
    console.log(atributos)
    atributos.innerHTML = `
                           <li><img src="${datos.foto}" class="h-48"></img></li>
                           <li>Experiencia: ${datos.experiencia}</li>
                           <li>Altura: ${datos.altura}</li>
                           <li>Peso: ${datos.peso}</li>
                           <li>Índice de juego: ${datos.indices}</li></ul>`;

    // Agregar la lista al contenedor de información
    contenedorInformacion.appendChild(atributos);

  } catch (error) {
    // Verificar si ya había un elemento anterior en el contenedor y eliminarlo
    while (contenedorInformacion.firstChild) {
      contenedorInformacion.removeChild(contenedorInformacion.firstChild);
    }

    // Creamos un párrafo de error que mostramos en el contenedor de información
    const gifError = document.createElement("img");
    gifError.src = "./styles/giphy-unscreen.gif"
    contenedorInformacion.appendChild(gifError);

    // Recargar la página automáticamente después de 3 segundos
    setTimeout(() => {
      location.reload(); 
    }, 2000);
  }
});
