// Adiciona event listeners para a tecla 'Enter'
document.getElementById('amigo').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

document.getElementById('sorteador').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        exibirAmigoSecreto();
    }
});

// Lógica para o sorteio com o GIF
function handleSorteioClick() {
    // Verifica se há amigos suficientes para o sorteio
    if (amigos.length < 3) {
        alert("Adicione pelo menos 3 amigos para realizar o sorteio!");
        return;
    }

    // Esconde a seção principal
    document.getElementById('main-section').style.display = 'none';

    // Mostra a tela de carregamento (GIF)
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    // Roda a função de sorteio do app.js após 2 segundos
    setTimeout(() => {
        iniciarSorteio();

        // Esconde a tela de carregamento
        loadingScreen.style.display = 'none';

        // Mostra a seção principal novamente, mas com as partes do sorteio
        document.getElementById('main-section').style.display = 'flex';
        
        // Esconde as partes de adicionar e sortear da tela inicial
        document.getElementById('input-wrapper').style.display = 'none';
        document.getElementById('listaAmigos').style.display = 'none';
        document.getElementById('iniciar-sorteio-container').style.display = 'none';
        
        // Esconde a imagem inicial e mostra a de sorteio
        document.getElementById('image-container-inicial').style.display = 'none';
        document.getElementById('image-container-sorteio').style.display = 'block';
        
        // Mostra as partes de ver amigo secreto e histórico
        document.getElementById('ver-amigo-container').style.display = 'flex';
        document.getElementById('historico-container').style.display = 'flex';

        document.querySelector('.section-title').textContent = "Veja quem você tirou!";

    }, 2000);
}