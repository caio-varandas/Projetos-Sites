document.addEventListener('DOMContentLoaded', () => {

    const formVenda = document.getElementById('form-venda');
    const selectSessao = document.getElementById('sessao');

    function carregarSessoes() {
        const sessoes = StorageService.getData('sessoes');
        const filmes = StorageService.getData('filmes');
        const salas = StorageService.getData('salas');

        selectSessao.innerHTML = '<option value="">Selecione uma sessão</option>';

        sessoes.forEach(sessao => {

            const filme = filmes.find(f => f.id == sessao.filmeId);
            const sala = salas.find(s => s.id == sessao.salaId);

            if (!filme || !sala) return;

            const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR');
            const textoOpcao = `${filme.titulo} (${sala.nome}) - ${dataHora}`;

            const option = document.createElement('option');
            option.value = sessao.id;
            option.textContent = textoOpcao;
            selectSessao.appendChild(option);
        });

        verificarSessaoSelecionada();
    }

    function verificarSessaoSelecionada() {
        const urlParams = new URLSearchParams(window.location.search);
        const sessaoId = urlParams.get('sessaoId');

        if (sessaoId) {
            selectSessao.value = sessaoId;
        }
    }

    formVenda.addEventListener('submit', (event) => {
        event.preventDefault();

        const sessaoId = document.getElementById('sessao').value;
        const nomeCliente = document.getElementById('cliente-nome').value;
        const cpfCliente = document.getElementById('cliente-cpf').value;
        const assento = document.getElementById('assento').value;
        const pagamento = document.getElementById('pagamento').value;

        const novoIngresso = new Ingresso(sessaoId, nomeCliente, cpfCliente, assento, pagamento);

        const ingressos = StorageService.getData('ingressos');
        ingressos.push(novoIngresso);
        StorageService.saveData('ingressos', ingressos);

        alert('Ingresso vendido com sucesso!');
        formVenda.reset();
    });

    carregarSessoes();
});