document.addEventListener('DOMContentLoaded', () => {
    const formSala = document.getElementById('form-sala');

    formSala.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const capacidade = document.getElementById('capacidade').value;
        const tipo = document.getElementById('tipo').value;

        const novaSala = new Sala(nome, capacidade, tipo);

        const salas = StorageService.getData('salas');
        salas.push(novaSala);
        StorageService.saveData('salas', salas);

        alert('Sala salva');
        formSala.reset();
    });
});