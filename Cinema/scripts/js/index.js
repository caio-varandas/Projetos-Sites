document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('sessoes-hoje-container');

    const sessoes = StorageService.getData('sessoes');
    const filmes = StorageService.getData('filmes');
    const salas = StorageService.getData('salas');

    const hoje = new Date().toLocaleDateString('pt-BR');

    const sessoesDeHoje = sessoes.filter(sessao => {
        const dataSessao = new Date(sessao.dataHora).toLocaleDateString('pt-BR');
        return dataSessao === hoje;
    });

    container.innerHTML = '';

    if (sessoesDeHoje.length === 0) {
        container.innerHTML = '<p class="col-12 text-center">Nenhuma sessão programada para hoje.</p>';
        return;
    }

    sessoesDeHoje.forEach(sessao => {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        if (!filme || !sala) return; 

        const dataHora = new Date(sessao.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const preco = `R$ ${sessao.preco.toFixed(2)}`;

        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'col-md-4'; 
        
        cardWrapper.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${filme.titulo}</h5>
                    
                    <p class="card-text">${filme.descricao}</p>
                    
                    <div class="mt-auto">
                        <hr>
                        <p class="card-text mb-1">
                            <strong>Sala:</strong> ${sala.nome} (${sala.tipo})
                        </p>
                        <p class="card-text mb-1">
                            <strong>Horário:</strong> ${dataHora}
                        </p>
                        <p class="card-text">
                            <strong>Preço:</strong> ${preco}
                        </p>
                        
                        <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-primary w-100">
                            Comprar Ingresso
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(cardWrapper);
    });
});