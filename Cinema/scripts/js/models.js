class Filme {
    constructor(titulo, descricao, genero, classificacao, duracao, estreia) {
        this.id = Date.now();
        this.titulo = titulo;
        this.descricao = descricao;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = parseInt(duracao);
        this.estreia = estreia;
    }
}

class Sala {
    constructor(nome, capacidade, tipo) {
        this.id = Date.now();
        this.nome = nome;
        this.capacidade = parseInt(capacidade);
        this.tipo = tipo;
    }
}

class Sessao {
    constructor(filmeId, salaId, dataHora, preco, idioma, formato) {
        this.id = Date.now();
        this.filmeId = parseInt(filmeId);
        this.salaId = parseInt(salaId);
        this.dataHora = dataHora;
        this.preco = parseFloat(preco);
        this.idioma = idioma;
        this.formato = formato;
    }
}

class Ingresso {
    constructor(sessaoId, nomeCliente, cpfCliente, assento, pagamento) {
        this.id = Date.now();
        this.sessaoId = parseInt(sessaoId);
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.assento = assento;
        this.pagamento = pagamento;
    }
}