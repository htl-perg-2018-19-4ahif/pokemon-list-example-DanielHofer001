let myWindow;
(async function () {
  const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/');
  let html = '';
  let ctr: number = 1;
  let perRow: number = 8;
  for (const pokemon of pokelist.results) {
    if (ctr % perRow === 0) {
      html += `<td>${pokemon.name}<br>`;
      html += `<button type="button" class="btn btn-primary" id="${pokemon.name}" onclick="getResult('${pokemon.url}')">Details</button></td><tr></tr>`
    } else {
      html += `<td>${pokemon.name}<br>`;
      html += `<button type="button" class="btn btn-primary" id="${pokemon.name}" onclick="getResult('${pokemon.url}')">Details</button></td>`
    }
      $(`#${pokemon.name}`).on('show.bs.modal', function () {
        getResult(pokemon.url)
      });
    ctr++;
  }


  $('#pokemons')[0].innerHTML = html;

})();

async function getResult(s) {
  myWindow = window.open("", "MsgWindow", "width=400px,height=200px");
  const pokemon = await $.get(s);

  let ret: string
    = `    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

   <table class="table table-striped"> <thead>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Image</th>
    <th scope="col">Weight</th>
    <th scope="col">Abilities</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>${pokemon.name}</td>
  <td><a href="${pokemon.sprites.front_default}"><img src="${pokemon.sprites.front_default}"></a></td> 
  <td>${pokemon.weight}</td>
  <td rowspan=${pokemon.abilities.length}>${pokemon.abilities.map((ability) => ability.ability.name).join("<br/>")}
  </td>
  </tbody>
  </table>
  <button onclick="self.close()" class="btn btn-secondary rounded mx-auto d-block">Back to
        Pokemonlist</button>
`
  myWindow.document.write(ret);
  
}
