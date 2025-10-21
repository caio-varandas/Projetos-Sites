document.addEventListener('DOMContentLoaded', () => {
    const formFilme = document.getElementById('form-filme');

    formFilme.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const genero = document.getElementById('genero').value;
        const classificacao = document.getElementById('classificacao').value;
        const duracao = document.getElementById('duracao').value;
        const estreia = document.getElementById('estreia').value;

        const novoFilme = new Filme(titulo, descricao, genero, classificacao, duracao, estreia);

        const filmes = StorageService.getData('filmes');
        
        filmes.push(novoFilme);
        
        StorageService.saveData('filmes', filmes);

        alert('Filme salvo');
        formFilme.reset();
    });
});