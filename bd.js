var bd = openDatabase("meuBD", "1.0", "Meu Banco de Dados", 4080);

bd.transaction(function (criar) {
    criar.executeSql(
        "CREATE TABLE formulario (nome TEXT, idade INTEGER, altura FLOAT(2, 4), dataNasc DATE, contatos JSON)"
    );
});

function salvarInfo() {
    const nomeUsuario = document
        .getElementById("nome-usuario")
        .value.toUpperCase();
    const idadeUsuario = parseInt(
        document.getElementById("idade-usuario").value
    );
    const alturaUsuario = parseFloat(
        document.getElementById("altura-usuario").value
    );
    const dataNascUsuario = document.getElementById("data-nasc-usuario").value;
    const emailUsuario = document.getElementById("email-usuario").value;
    const telefoneUsuario = document.getElementById("telefone-usuario").value;

    const contatos = { "e-mail": emailUsuario, tel: telefoneUsuario };

    if (nomeUsuario === "" || isNaN(idadeUsuario) || emailUsuario === "") {
        alert("Faltam informações!");
        return false;
    }

    bd.transaction(function (inserir) {
        inserir.executeSql(
            "INSERT INTO formulario (nome, idade, altura, dataNasc, contatos) VALUES (?, ?, ?, ?, ?)",
            [
                nomeUsuario,
                idadeUsuario,
                alturaUsuario,
                dataNascUsuario,
                JSON.stringify(contatos),
            ] //variaveis
        );
    });
    document.getElementById("nome-usuario").value = "";
    document.getElementById("idade-usuario").value = "";
    document.getElementById("altura-usuario").value = "";
    document.getElementById("email-usuario").value = "";
    document.getElementById("telefone-usuario").value = "";
}

function pesquisaPorNome() {
    const nomeUsuario = document
        .getElementById("pesquisa-nome-usuario")
        .value.toUpperCase();
    if (nomeUsuario === "") {
        alert("Falta informação!");
        return false;
    }
    bd.transaction(function (ler) {
        ler.executeSql(
            `SELECT * FROM formulario WHERE nome LIKE "%${nomeUsuario}%"`,
            [],
            function (ler, resultados) {
                const tamanho = resultados.rows.length;

                const msg = tamanho + " linhas encontradas";
                console.log(msg);

                const nome = resultados.rows.item(tamanho - 1).nome;
                const idade = resultados.rows.item(tamanho - 1).idade;
                document.getElementById("pesquisa-nome-usuario").value = nome;
                document.getElementById("resultado-pesquisa").value =
                    nome + ", " + idade + " anos";
            }
        );
    });
}

function exibeBD() {
    bd.transaction(function (exibe) {
        exibe.executeSql(
            "SELECT * FROM formulario",
            [],
            function (exibe, resultados) {
                const tamanho = resultados.rows.length;
                let item;
                document.getElementById("lista-bd").innerHTML = "";
                for (let i = 0; i < tamanho; i++) {
                    item = resultados.rows.item(i);
                    document.getElementById(
                        "lista-bd"
                    ).innerHTML += `<p onclick="mostrarCartaoAltera('${item.nome}', ${item.idade}, '${item.email}')">Nome: ${item.nome}, ${item.idade} anos,e-mail: ${item.email}</p>`;
                }
            }
        );
    });
}

function alteraInfo() {
    const novoNome = document.getElementById("nome-alteracao").value;
    const novaIdade = parseInt(
        document.getElementById("idade-alteracao").value
    );

    bd.transaction(function (altera) {
        altera.executeSql(
            `UPDATE formulario SET nome="${novoNome}", idade=${novaIdade} WHERE nome="${nomeAtualParaEditar}" AND idade=${idadeAtualParaEditar}`
        );
    });
    exibeBD();
}

function excluiInfo() {
    bd.transaction(function (altera) {
        altera.executeSql(
            `DELETE FROM formulario WHERE nome="${nomeAtualParaEditar}" AND idade=${idadeAtualParaEditar}`
        );
    });
    exibeBD();
}
