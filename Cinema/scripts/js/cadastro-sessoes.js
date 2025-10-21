document.addEventListener('DOMContentLoaded', () => {
    
    const formSessao = document.getElementById('form-sessao');
    const selectFilme = document.getElementById('filme');
    const selectSala = document.getElementById('sala');

    function carregarDropdowns() {
        const filmes = StorageService.getData('filmes');
        const salas = StorageService.getData('salas');

        selectFilme.innerHTML = '<option value="">Selecione um filme</option>';
        filmes.forEach(filme => {
            const option = document.createElement('option');
            option.value = filme.id;
            option.textContent = filme.titulo;
            selectFilme.appendChild(option);
        });

        selectSala.innerHTML = '<option value="">Selecione uma sala</option>';
        salas.forEach(sala => {
            const option = document.createElement('option');
            option.value = sala.id;
            option.textContent = sala.nome;
            selectSala.appendChild(option);
        });
    }

    formSessao.addEventListener('submit', (event) => {
        event.preventDefault();

        const filmeId = document.getElementById('filme').value;
        const salaId = document.getElementById('sala').value;
        const dataHora = document.getElementById('data-hora').value;
        const preco = document.getElementById('preco').value;
        const idioma = document.getElementById('idioma').value;
        const formato = document.getElementById('formato').value;

        const novaSessao = new Sessao(filmeId, salaId, dataHora, preco, idioma, formato);

        const sessoes = StorageService.getData('sessoes');
        sessoes.push(novaSessao);
        StorageService.saveData('sessoes', sessoes);

        alert('Sessão salva');
        formSessao.reset();
    });

    carregarDropdowns();
});