document.addEventListener('DOMContentLoaded', () => {

    const tbody = document.getElementById('lista-sessoes');

    function carregarListaSessoes() {
        const sessoes = StorageService.getData('sessoes');
        const filmes = StorageService.getData('filmes');
        const salas = StorageService.getData('salas');

        tbody.innerHTML = ''; 

        if (sessoes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" align="center">Nenhuma sessão cadastrada.</td></tr>';
            return;
        }

        sessoes.forEach(sessao => {
            const filme = filmes.find(f => f.id == sessao.filmeId);
            const sala = salas.find(s => s.id == sessao.salaId);

            if (!filme || !sala) return;

            const tr = document.createElement('tr');
            
            const dataHora = new Date(sessao.dataHora).toLocaleString('pt-BR');
            const preco = `R$ ${sessao.preco.toFixed(2)}`;

            tr.innerHTML = `
                <td>${filme.titulo}</td>
                <td>${sala.nome}</td>
                <td>${dataHora}</td>
                <td>${preco}</td>
                <td>
                    <button class="btn-comprar" data-sessao-id="${sessao.id}">Comprar Ingresso</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    tbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-comprar')) {
            const sessaoId = event.target.dataset.sessaoId;
            
            window.location.href = `venda-ingressos.html?sessaoId=${sessaoId}`;
        }
    });

    carregarListaSessoes();
});