const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens =  JSON.parse(localStorage.getItem('itens')) || [];

/* Assim que a pagina é recarregada eu crio meus elementos do localStorage */
itens.forEach( (elemento) => {
    criarElemento(elemento);
});

/* Funcao que e chamada no envio do formulario */
form.addEventListener('submit', (evento)=> {
    evento.preventDefault();

    /* Pego o nome e a quantidade por meio do elements */
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    /* Cria o objeto */
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    };

    /* Verifica se o elemento ja existe */
    const existe = itens.find(elemento => elemento.nome === nome.value); 
    
    if(existe) { 
        // Sao os mesmos elementos
        itemAtual.id = existe.id; 

        // Atualizo o item atual
        atualizaElemento(itemAtual);

        // Eu atualizo dentro do meu aquele elemento que eu acabei de modificar
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else { 
        if (itens[itens.length - 1]) {
            /* Se nao for o primeiro elemento eu incremento */
            itemAtual.id = itens[itens.length-1].id + 1;
        } else {
            /* Caso seja o primeiro elemento o id vai ser 0 */
            itemAtual.id = 0;
        }
        criarElemento(itemAtual); 

        /* Coloco o objeto dentro do meu array */
        itens.push(itemAtual); 
    }

    /* Mando todos os itens para o localStorage */
    localStorage.setItem("itens", JSON.stringify(itens)); 

    /* Limpo o formulario */
    nome.value = "";
    quantidade.value = "";
});

function criarElemento(itemAtual) {

    /* Crio um novo elemento li */
    const novoItem = document.createElement('li');

    /* Adiciono uma classe do css */
    novoItem.classList.add('item');

    /* Crio uma tag strong que vai ser filha da li*/
    const numeroItem = document.createElement('strong');
    
    /* Atualizdo a quantidade do strong */
    numeroItem.innerHTML = itemAtual.quantidade;
    
    /* Crio um data-id */
    numeroItem.dataset.id = itemAtual.id;  
    
    /* Cada li tem um filho strong */
    novoItem.appendChild(numeroItem);

    /* Atualizo o nome */
    novoItem.innerHTML += itemAtual.nome;

    /* Novo item tem um filho botao */
    novoItem.appendChild(criarBotaoDeleta(itemAtual.id)); 

    /* Ul tem uma filha li */
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    /* Vai retornar a tag strong e dentro dela eu altero a quantidade */
    document.querySelector(`[data-id = "${item.id}"]`).innerHTML = item.quantidade;
}

function criarBotaoDeleta(id) {
    /* Crio meu botao */
    const botao = document.createElement('button');

    /* Atualizo o texto do botao */
    botao.innerText = 'X';

    /* Quando clica nesse botao eu removo pai dele (li) */
    botao.addEventListener('click', (elemento) => {
        removerElemento(elemento.target.parentNode, id); 
    });

    /* retorno o botao para dar um appendChild */
    return botao;
}

function removerElemento(tag, id) {
    /* Removo a tag */
    tag.remove(); 
    
    /* Removo a li */
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    /* Atualizo o localStorage com meu novo array */
    localStorage.setItem("itens", JSON.stringify(itens))
}