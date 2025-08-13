// Array para armazenar os nomes dos amigos
let amigos = [];
// Array para armazenar o resultado do sorteio uma única vez
let resultadoSorteio = [];
// Flag para controlar se o sorteio já foi feito
let sorteioRealizado = false;

// Defina a senha para o histórico
const senhaHistorico = "123";

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const campoAmigo = document.getElementById('amigo');
    const nomeAmigo = campoAmigo.value.trim();

    if (nomeAmigo === '') {
        alert("Por favor, digite um nome válido.");
        return;
    }
    if (amigos.includes(nomeAmigo)) {
        alert("Este nome já foi adicionado. Por favor, escolha outro.");
        campoAmigo.value = '';
        return;
    }

    amigos.push(nomeAmigo);
    atualizarListaAmigos();
    atualizarResultadoSorteio();
    sorteioRealizado = false;
    document.getElementById('historico').style.display = 'none';

    campoAmigo.value = ''; // Limpa o campo após adicionar
}

// Função para remover um amigo da lista
function removerAmigo(nome) {
    amigos = amigos.filter(amigo => amigo !== nome);

    atualizarListaAmigos();
    atualizarResultadoSorteio();
    sorteioRealizado = false;
    document.getElementById('historico').style.display = 'none';
}

// Função para atualizar a exibição da lista de amigos na tela
function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => removerAmigo(nome));
        lista.appendChild(item);
    });
}

// Função para limpar a área de resultado do sorteio
function atualizarResultadoSorteio() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
}

// Algoritmo de Fisher-Yates para embaralhar o array
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

// Função para iniciar e salvar o sorteio
function iniciarSorteio() {
    if (sorteioRealizado) {
        alert("O sorteio já foi realizado. Use o botão 'Ver meu amigo'.");
        return;
    }

    if (amigos.length < 3) {
        alert("Adicione pelo menos 3 amigos para realizar o sorteio!");
        return;
    }

    let sorteados;
    let tentativas = 0;

    do {
        sorteados = embaralhar([...amigos]);
        tentativas++;
    } while (verificaAutoSorteio(sorteados) && tentativas < 100);

    resultadoSorteio = [];
    for (let i = 0; i < amigos.length; i++) {
        resultadoSorteio.push({
            sorteador: amigos[i],
            amigoSecreto: sorteados[i]
        });
    }

    sorteioRealizado = true;
    atualizarResultadoSorteio();
    // AVISO: A linha abaixo foi comentada para remover o alerta de sorteio realizado.
    // alert("Sorteio realizado! Agora cada pessoa pode ver seu amigo secreto.");
}

// Função para exibir o amigo secreto no formato da imagem
function exibirAmigoSecreto() {
    if (!sorteioRealizado) {
        alert("O sorteio ainda não foi iniciado. Clique em 'Iniciar sorteio'.");
        return;
    }

    const sorteador = document.getElementById('sorteador');
    const nomeSorteador = sorteador.value.trim();

    if (nomeSorteador === '') {
        alert("Por favor, digite seu nome para ver seu amigo secreto.");
        return;
    }

    const parSorteado = resultadoSorteio.find(par => par.sorteador.trim() === nomeSorteador);

    if (parSorteado) {
        const divResultado = document.getElementById('resultado');
        divResultado.innerHTML = '';
        const p = document.createElement('p');

        const spanSorteado = document.createElement('span');
        spanSorteado.textContent = parSorteado.amigoSecreto;
        spanSorteado.style.color = '#4B69FD';
        spanSorteado.style.fontWeight = 'bold';

        p.textContent = "O amigo secreto sorteado é: ";
        p.appendChild(spanSorteado);

        divResultado.appendChild(p);
    } else {
        alert("Seu nome não está na lista de sorteio. Verifique se digitou corretamente.");
    }
    sorteador.value = ''; // Limpa o campo após ver o resultado
}

// Função para exibir o histórico completo com verificação de senha
function exibirHistorico() {
    if (!sorteioRealizado) {
        alert("O sorteio ainda não foi iniciado. Clique em 'Iniciar sorteio'.");
        return;
    }

    const senhaDigitada = prompt("Digite a senha para ver o histórico:");

    if (senhaDigitada === senhaHistorico) {
        const historicoDiv = document.getElementById('historico');
        const listaHistorico = document.getElementById('listaHistorico');
        listaHistorico.innerHTML = '';

        resultadoSorteio.forEach(par => {
            const item = document.createElement('li');
            item.textContent = `${par.sorteador} → ${par.amigoSecreto}`;
            listaHistorico.appendChild(item);
        });

        historicoDiv.style.display = 'block';
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
}

// Função auxiliar para verificar se alguém tirou a si mesmo
function verificaAutoSorteio(listaSorteada) {
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === listaSorteada[i]) {
            return true;
        }
    }
    return false;
}