var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let myWindow;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const pokelist = yield $.get('https://pokeapi.co/api/v2/pokemon/');
        let html = '';
        let ctr = 1;
        let perRow = 8;
        for (const pokemon of pokelist.results) {
            if (ctr % perRow === 0) {
                html += `<td>${pokemon.name}<br>`;
                html += `<button type="button" class="btn btn-primary" id="${pokemon.name}" onclick="getResult('${pokemon.url}')">Details</button></td><tr></tr>`;
            }
            else {
                html += `<td>${pokemon.name}<br>`;
                html += `<button type="button" class="btn btn-primary" id="${pokemon.name}" onclick="getResult('${pokemon.url}')">Details</button></td>`;
            }
            $(`#${pokemon.name}`).on('show.bs.modal', function () {
                getResult(pokemon.url);
            });
            ctr++;
        }
        $('#pokemons')[0].innerHTML = html;
    });
})();
function getResult(s) {
    return __awaiter(this, void 0, void 0, function* () {
        myWindow = window.open("", "MsgWindow", "width=400px,height=200px");
        const pokemon = yield $.get(s);
        let ret = `    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

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
`;
        myWindow.document.write(ret);
    });
}
