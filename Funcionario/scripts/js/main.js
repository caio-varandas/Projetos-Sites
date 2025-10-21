class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this.id = id;
        this.nome = nome;
        this.idade = parseInt(idade);
        this.cargo = cargo;
        this.salario = parseFloat(salario);
    }

    getId() { return this.id; }
    getNome() { return this.nome; }
    getIdade() { return this.idade; }
    getCargo() { return this.cargo; }
    getSalario() { return this.salario; }

    setNome(nome) { this.nome = nome; }
    setIdade(idade) { this.idade = parseInt(idade); }
    setCargo(cargo) { this.cargo = cargo; }
    setSalario(salario) { this.salario = parseFloat(salario); }

    toString() {
        return `ID: ${this.id} | Nome: ${this.nome} | Cargo: ${this.cargo} | Salário: R$ ${this.salario.toFixed(2)}`;
    }
}

class FuncionarioController {
    constructor() {
        this.funcionarios = [];
        this.idAtual = 0;
        this.funcionarioEdicao = null;
        this.inputNome = document.getElementById("nome");
        this.inputIdade = document.getElementById("idade");
        this.inputCargo = document.getElementById("cargo");
        this.inputSalario = document.getElementById("salario");
        this.btnCadastrar = document.getElementById('btnCadastrar');
        this.corpoTabela = document.getElementById('tabela');
        this.btnRelatorioSalario = document.getElementById('btnRelatorioSalario');
        this.btnRelatorioMediaSalarial = document.getElementById('btnRelatorioMediaSalarial');
        this.btnRelatorioCargos = document.getElementById('btnRelatorioCargos');
        this.btnRelatorioNomesMaiusculo = document.getElementById('btnRelatorioNomesMaiusculo');
        this.divResultado = document.getElementById('relatoriosResultado');

        this.registrarEventos();
        this.exibirTabela();
    }

    registrarEventos() {
        this.btnCadastrar.addEventListener('click', () => this.handleCadastro());
        this.corpoTabela.addEventListener('click', (event) => this.handleAcoesTabela(event));
        
        this.btnRelatorioSalario.addEventListener('click', () => this.relatorioSalarioMaior5k());
        this.btnRelatorioMediaSalarial.addEventListener('click', () => this.relatorioMediaSalarial());
        this.btnRelatorioCargos.addEventListener('click', () => this.relatorioCargosUnicos());
        this.btnRelatorioNomesMaiusculo.addEventListener('click', () => this.relatorioNomesMaiusculo());
    }

    handleCadastro() {
        const nome = this.inputNome.value;
        const idade = this.inputIdade.value;
        const cargo = this.inputCargo.value;
        const salario = this.inputSalario.value;

        if (!nome || !idade || !cargo || !salario) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (this.funcionarioEdicao) {
            this.funcionarioEdicao.setNome(nome);
            this.funcionarioEdicao.setIdade(idade);
            this.funcionarioEdicao.setCargo(cargo);
            this.funcionarioEdicao.setSalario(salario);
            
            alert("Funcionário editado");
            this.funcionarioEdicao = null;
        }
        else{
            this.idAtual++;
            const novoFuncionario = new Funcionario(this.idAtual, nome, idade, cargo, salario);
            this.funcionarios.push(novoFuncionario);
            alert("Funcionário cadastrado");
        }

        this.limparFormulario();
        this.exibirTabela();
    }

    handleAcoesTabela(event) {
        const elemento = event.target;
        if (elemento.classList.contains('btn-editar') || elemento.classList.contains('btn-excluir')) {
            const id = parseInt(elemento.dataset.id);
            
            if (elemento.classList.contains('btn-editar')) {
                this.prepararEdicao(id);
            }
            else if (elemento.classList.contains('btn-excluir')) {
                this.excluirFuncionario(id);
            }
        }
    }

    exibirTabela() {
        this.corpoTabela.innerHTML = "";

        if (this.funcionarios.length === 0) {
            this.corpoTabela.innerHTML = `<tr><td colspan="5" align="center">Nenhum funcionário cadastrado</td></tr>`;
            return;
        }

        this.funcionarios.forEach(func => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${func.getNome()}</td>
                <td>${func.getIdade()}</td>
                <td>${func.getCargo()}</td>
                <td>R$ ${func.getSalario().toFixed(2)}</td>
                <td>
                    <button class="btn-editar" data-id="${func.getId()}">Editar</button>
                    <button class="btn-excluir" data-id="${func.getId()}">Excluir</button>
                </td>
            `;
            this.corpoTabela.appendChild(tr);
        });
    }

    prepararEdicao(id) {
        this.funcionarioEdicao = this.funcionarios.find(func => func.getId() === id);
        if (!this.funcionarioEdicao) return;

        this.inputNome.value = this.funcionarioEdicao.getNome();
        this.inputIdade.value = this.funcionarioEdicao.getIdade();
        this.inputCargo.value = this.funcionarioEdicao.getCargo();
        this.inputSalario.value = this.funcionarioEdicao.getSalario();
        this.btnCadastrar.textContent = "Salvar Edição";
    }

    excluirFuncionario(id) {
        if (confirm("Tem certeza que deseja excluir este funcionário?")) {
            this.funcionarios = this.funcionarios.filter(func => func.getId() !== id);
            this.exibirTabela();
            alert("Funcionário excluído");
        }
    }

    limparFormulario() {
        this.inputNome.value = "";
        this.inputIdade.value = "";
        this.inputCargo.value = "";
        this.inputSalario.value = "";
        this.funcionarioEdicao = null;
        this.btnCadastrar.textContent = "Cadastrar";
    }
    
    mostrarResultado(titulo, listaItens) {
        this.divResultado.innerHTML = `<strong>${titulo}</strong>`;
        if (listaItens.length === 0) {
            this.divResultado.innerHTML += "<p>Nenhum dado para exibir</p>";
            return;
        }
        const ul = document.createElement('ul');
        listaItens.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        this.divResultado.appendChild(ul);
    }

    relatorioSalarioMaior5k() {
        const filtrados = this.funcionarios
            .filter(func => func.getSalario() > 5000)
            .map(func => `${func.getNome()} (Cargo: ${func.getCargo()}, Salário: R$ ${func.getSalario().toFixed(2)})`);
        this.mostrarResultado("Funcionários com Salário > R$ 5000:", filtrados);
    }

    relatorioMediaSalarial() {
        if (this.funcionarios.length === 0) {
            this.mostrarResultado("Média Salarial:", ["Nenhum funcionário cadastrado."]);
            return;
        }
        const totalSalarios = this.funcionarios.reduce((acc, func) => acc + func.getSalario(), 0);
        const media = (totalSalarios / this.funcionarios.length);
        this.mostrarResultado("Média Salarial:", [`A média salarial é: R$ ${media.toFixed(2)}`]);
    }

    relatorioCargosUnicos() {
        const cargos = this.funcionarios.map(func => func.getCargo());
        const cargosUnicos = [...new Set(cargos)];
        this.mostrarResultado("Cargos Únicos na Empresa:", cargosUnicos);
    }

    relatorioNomesMaiusculo() {
        const nomes = this.funcionarios.map(func => func.getNome().toUpperCase());
        this.mostrarResultado("Nomes dos Funcionários em Maiúsculo:", nomes);
    }
}

const app = new FuncionarioController();