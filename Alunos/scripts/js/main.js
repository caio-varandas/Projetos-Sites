class Aluno {
    constructor(id, nome, idade, curso, notaFinal) {
        this.id = id;
        this.nome = nome;
        this.idade = parseInt(idade);
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        const status = this.isAprovado() ? "Aprovado" : "Reprovado";
        return `ID: ${this.id} | Nome: ${this.nome} | Curso: ${this.curso} | Nota: ${this.notaFinal} (${status})`;
    }
}


class AlunoController {
    constructor() {
        this.alunos = [];
        this.id = 0;
        this.alunoEdicao = null;

        this.inputNome = document.getElementById("nome");
        this.inputIdade = document.getElementById("idade");
        this.selectCurso = document.getElementById("cursos");
        this.inputNotaFinal = document.getElementById("notafinal");
        this.btnCadastrar = document.getElementById('btnEnviar');
        this.corpoTabela = document.getElementById('tabela');

        this.btnAprovados = document.getElementById('btnAprovados');
        this.btnMediaNotas = document.getElementById('btnMediaNotas');
        this.btnMediaIdades = document.getElementById('btnMediaIdades');
        this.btnOrdemAlfabetica = document.getElementById('btnOrdemAlfabetica');
        this.btnTotalPorCurso = document.getElementById('btnTotalPorCurso');
        this.divResultado = document.getElementById('relatoriosResultado');

        this.registrarEventos();
        this.renderizarTabela();
    }

    registrarEventos() {
        this.btnCadastrar.addEventListener('click', this.handleCadastro.bind(this));
        this.corpoTabela.addEventListener('click', this.handleAcoesTabela.bind(this));

        this.btnAprovados.addEventListener('click', this.relatorioAprovados.bind(this));
        this.btnMediaNotas.addEventListener('click', this.relatorioMediaNotas.bind(this));
        this.btnMediaIdades.addEventListener('click', this.relatorioMediaIdades.bind(this));
        this.btnOrdemAlfabetica.addEventListener('click', this.relatorioOrdemAlfabetica.bind(this));
        this.btnTotalPorCurso.addEventListener('click', this.relatorioTotalPorCurso.bind(this));
    }

    handleCadastro() {
        const nome = this.inputNome.value;
        const idade = this.inputIdade.value;
        const cursoValor = this.selectCurso.value;
        const cursoTexto = this.selectCurso.options[this.selectCurso.selectedIndex].text;
        const notaFinal = this.inputNotaFinal.value;

        if (!nome || !idade || cursoValor === "0" || !notaFinal) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (this.alunoEdicao) {
            this.alunoEdicao.nome = nome;
            this.alunoEdicao.idade = parseInt(idade);
            this.alunoEdicao.curso = cursoTexto;
            this.alunoEdicao.notaFinal = parseFloat(notaFinal);
            alert("Aluno editado com sucesso");
            this.alunoEdicao = null;
        } else {
            this.id++;
            const novoAluno = new Aluno(this.id, nome, idade, cursoTexto, notaFinal);
            this.alunos.push(novoAluno);
            alert("Aluno cadastrado com sucesso");
        }

        this.limparFormulario();
        this.renderizarTabela();
    }

    handleAcoesTabela(event) {
        const elemento = event.target;
        if (elemento.classList.contains('btn-editar') || elemento.classList.contains('btn-excluir')) {
            const idAluno = parseInt(elemento.dataset.id);
            const aluno = this.alunos.find(a => a.id === idAluno);

            if (elemento.classList.contains('btn-editar')) {
                this.prepararEdicao(aluno);
            } else if (elemento.classList.contains('btn-excluir')) {
                this.excluirAluno(idAluno);
            }
        }
    }

    renderizarTabela() {
        this.corpoTabela.innerHTML = "";

        if (this.alunos.length === 0) {
            this.corpoTabela.innerHTML = `<tr><td colspan="5" align="center">Nenhum aluno cadastrado.</td></tr>`;
            return;
        }

        this.alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.notaFinal}</td>
                <td>
                    <button class="btn-editar" data-id="${aluno.id}">Editar</button>
                    <button class="btn-excluir" data-id="${aluno.id}">Excluir</button>
                </td>
            `;
            this.corpoTabela.appendChild(tr);
        });
    }

    prepararEdicao(aluno) {
        this.alunoEdicao = aluno;
        this.inputNome.value = aluno.nome;
        this.inputIdade.value = aluno.idade;
        this.inputNotaFinal.value = aluno.notaFinal;

        for (let i = 0; i < this.selectCurso.options.length; i++) {
            if (this.selectCurso.options[i].text === aluno.curso) {
                this.selectCurso.selectedIndex = i;
                break;
            }
        }
        this.btnCadastrar.textContent = "Salvar Edição";
    }

    excluirAluno(id) {
        if (confirm("Tem certeza que deseja excluir este aluno?")) {
            this.alunos = this.alunos.filter(aluno => aluno.id !== id);
            this.renderizarTabela();
            alert("Aluno excluído.");
        }
    }

    limparFormulario() {
        this.inputNome.value = "";
        this.inputIdade.value = "";
        this.selectCurso.value = "0";
        this.inputNotaFinal.value = "";
        this.alunoEdicao = null;
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

    relatorioAprovados() {
        const aprovados = this.alunos
            .filter(aluno => aluno.isAprovado())
            .map(aluno => `${aluno.nome} (Nota: ${aluno.notaFinal})`);
        this.mostrarResultado("Alunos Aprovados (Nota >= 7):", aprovados);
    }

    relatorioMediaNotas() {
        if (this.alunos.length === 0) {
            this.mostrarResultado("Média das Notas Finais:", ["Nenhum aluno cadastrado."]);
            return;
        }
        const totalNotas = this.alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
        const media = (totalNotas / this.alunos.length).toFixed(2);
        this.mostrarResultado("Média das Notas Finais:", [`A média é: ${media}`]);
    }

    relatorioMediaIdades() {
        if (this.alunos.length === 0) {
            this.mostrarResultado("Média das Idades:", ["Nenhum aluno cadastrado."]);
            return;
        }
        const totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        const media = (totalIdades / this.alunos.length).toFixed(1);
        this.mostrarResultado("Média das Idades:", [`A média de idade é: ${media} anos.`]);
    }

    relatorioOrdemAlfabetica() {
        const nomesOrdenados = this.alunos
            .map(aluno => aluno.nome)
            .sort((a, b) => a.localeCompare(b));
        this.mostrarResultado("Alunos em Ordem Alfabética:", nomesOrdenados);
    }

    relatorioTotalPorCurso() {
        const contagem = this.alunos.reduce((acc, aluno) => {
            if (!acc[aluno.curso]) {
                acc[aluno.curso] = 0;
            }
            acc[aluno.curso]++;
            return acc;
        }, {});

        const resultado = Object.keys(contagem).map(curso => {
            return `${curso}: ${contagem[curso]} aluno(s)`;
        });
        this.mostrarResultado("Total de Alunos por Curso:", resultado);
    }
}

const app = new AlunoController();