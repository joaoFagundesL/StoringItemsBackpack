const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens =  JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criarElemento(elemento);
});

form.addEventListener('submit', (evento)=> {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    };

    //encontra o elemento no array de acordo com o valor informado no formulario
    const existe = itens.find(elemento => elemento.nome === nome.value); 
    
    if(existe) { //se o elemento ja existe
        itemAtual.id = existe.id; // se o elemento existe ele vai ter um id. Logo o itemAtual vai ter esse mesmo id
        atualizaElemento(itemAtual);
        itens[existe.id] = itemAtual // sobreescreve o array e consequentemente o localStorage
    } else { //se o elemento nao existe
        itemAtual.id = itens.length; // crio um id com base no tamanho do array. Ou seja, o id incrementado
        criarElemento(itemAtual); // crio o elemento
        itens.push(itemAtual); // jogo o elemento no array
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criarElemento(itemAtual) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = itemAtual.quantidade;
    numeroItem.dataset.id = itemAtual.id;  // cria um data-id na tag strong

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += itemAtual.nome;

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector(`[data-id = "${item.id}"]`).innerHTML = item.quantidade;
}