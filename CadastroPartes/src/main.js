class Pessoa{
    constructor(id, nome, idade, telefone, pastoral){
        this.id=id;
        this.nome=nome;
        this.idade=idade;
        this.telefone=telefone;
        this.pastoral=pastoral;
    }
}

class PessoaController{
    constructor(){
        this.pessoas=[];
        this.id=0;
        this.pessoaEdicao=null;

        this.inputNome=document.getElementById("nome");
        this.inputIdade=document.getElementById("idade");
        this.inputTelefone=document.getElementById("telefone");
        this.selectPastoral=document.getElementById("pastorais");
        this.btnCadastrar = document.getElementById('btnEnviar');
        this.cardsContainer = document.getElementById('cardsContainer');

        const pessoasSalvas = JSON.parse(localStorage.getItem('pessoas'));
        if (pessoasSalvas) {
            this.pessoas = pessoasSalvas;
            this.id = this.pessoas.length > 0 ? this.pessoas[this.pessoas.length - 1].id : 0;
        }

        this.registrarEventos();
        this.renderizarCards();
    }

    registrarEventos(){
        this.btnCadastrar.addEventListener('click', this.handleCadastro.bind(this));
        this.cardsContainer.addEventListener('click', this.handleAcoesCards.bind(this));
    }

    handleCadastro(){
        const nome = this.inputNome.value;
        const idadeStr = this.inputIdade.value;
        const idade = parseInt(idadeStr);
        const telefone = this.inputTelefone.value;
        const pastoralValor = this.selectPastoral.value;
        const pastoralTexto = this.selectPastoral.options[this.selectPastoral.selectedIndex].text;

        if (!nome) {
          alert("Digite o nome");
          this.inputNome.focus();
          return;
        }

        if (!idadeStr || isNaN(idade) || idade < 0) {
          alert("Digite uma idade válida");
          this.inputIdade.focus();
          return;
        }

        if (!telefone) {
          alert("Digite o telefone");
          this.inputTelefone.focus();
          return;
        }

        if (pastoralValor == "0") {
          alert("Selecione uma pastoral");
          this.selectPastoral.focus();
          return;
        }

        if(this.pessoaEdicao){
            this.pessoaEdicao.nome = nome;
            this.pessoaEdicao.idade =idade;
            this.pessoaEdicao.telefone = telefone;
            this.pessoaEdicao.pastoral = pastoralTexto;
            alert("Pessoa editada com sucesso");
            this.pessoaEdicao = null;
        } else{
            this.id++;
            const novaPessoa = new Pessoa(this.id, nome, idade, telefone, pastoralTexto);
            this.pessoas.push(novaPessoa);
            alert("Pessoa cadastrada com sucesso");
        }
        this.salvarLocalStorage();
        this.limparFormulario();
        this.renderizarCards();
    }

    handleAcoesCards(event) {
    const elemento = event.target;
    if (elemento.classList.contains("btn-editar") || elemento.classList.contains("btn-excluir")) {
      const idPessoa = parseInt(elemento.dataset.id);
      const pessoa = this.pessoas.find(p => p.id === idPessoa);

      if (elemento.classList.contains("btn-editar")) {
        this.prepararEdicao(pessoa);
      } else if (elemento.classList.contains("btn-excluir")) {
        this.excluirPessoa(idPessoa);
      }
    }
  }

    renderizarCards() {
    this.cardsContainer.innerHTML = "";

    if (this.pessoas.length === 0) {
      this.cardsContainer.innerHTML = `
        <div class="text-center text-muted">Nenhuma pessoa cadastrada ainda.</div>
      `;
      return;
    }

    const grupos = {};
    this.pessoas.forEach(pessoa => {
        if (!grupos[pessoa.pastoral]) grupos[pessoa.pastoral] = [];
        grupos[pessoa.pastoral].push(pessoa);
    });

    for (const [pastoral, membros] of Object.entries(grupos)) {
        const titulo = document.createElement("h4");
        titulo.textContent = pastoral;
        titulo.classList.add("mt-4", "mb-3");
        this.cardsContainer.appendChild(titulo);

        const row = document.createElement("div");
        row.classList.add("row");

        membros.forEach(pessoa => {
            const col = document.createElement("div");
            col.classList.add("col-md-4", "col-lg-3", "mb-4");

            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${pessoa.nome}</h5>
                        <p class="card-text mb-1"><strong>Idade:</strong> ${pessoa.idade}</p>
                        <p class="card-text mb-1"><strong>Telefone:</strong> ${pessoa.telefone}</p>
                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-sm btn-primary btn-editar" data-id="${pessoa.id}">Editar</button>
                            <button class="btn btn-sm btn-danger btn-excluir" data-id="${pessoa.id}">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        this.cardsContainer.appendChild(row);
    }
  }

    prepararEdicao(pessoa){
        this.pessoaEdicao = pessoa;
        this.inputNome.value = pessoa.nome;
        this.inputIdade.value = pessoa.idade;
        this.inputTelefone.value = pessoa.telefone;
        
        for(let i = 0; i < this.selectPastoral.options.length; i++){
            if(this.selectPastoral.options[i].text === pessoa.pastoral){
                this.selectPastoral.selectedIndex = i;
                break;
            }
        }
        this.btnCadastrar.textContent = "Salvar Edição";
    }

    excluirPessoa(id){
        if(confirm("TIENES CERTEZA QUE DESEJA APAGAR LA PERSONA?")){
            this.pessoas = this.pessoas.filter(pessoa => pessoa.id !==id);
            this.salvarLocalStorage();
            this.renderizarCards();
            alert("Pessoa excluída");
        }
    }
    limparFormulario(){
        this.inputNome.value = "";
        this.inputIdade.value = "";
        this.inputTelefone.value = "";
        this.selectPastoral.value = "0";
        this.pessoaEdicao = null;
        this.btnCadastrar.textContent = "Cadastrar";
    }
    salvarLocalStorage() {
        localStorage.setItem('pessoas', JSON.stringify(this.pessoas));
    }
}
const app = new PessoaController();