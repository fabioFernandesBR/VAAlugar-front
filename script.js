
// Processo 1

// Captura os elementos HTML relevantes para o processo de criação de reserva
const cidadeInput = document.getElementById('cidade');
const buscarCanoasBtn = document.getElementById('buscar-canoas');
const listaCanoasDiv = document.getElementById('lista-canoas');
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const dataInput = document.getElementById('data');
const fazerReservaBtn = document.getElementById('fazer-reserva');


// Função para criar uma tabela formatada com os dados das canoas e adicionar botões de seleção
const criarTabelaCanoas = (dadosCanoas) => {
    // Limpa a lista de canoas anterior, se houver
    listaCanoasDiv.innerHTML = '';

    // Cria uma tabela
    const tabela = document.createElement('table');

    // Cria o cabeçalho da tabela
    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    ['ID', 'Nome', 'Dono', 'Local', 'Telefone', 'Tipo', 'Selecionar'].forEach((item) => {
        const th = document.createElement('th');
        th.textContent = item;
        linhaCabecalho.appendChild(th);
    });

    // Cria o corpo da tabela e adiciona os dados das canoas
    const corpo = tabela.createTBody();
    dadosCanoas.forEach(canoa => {
        const linha = corpo.insertRow();
        ['id', 'nome', 'dono', 'local', 'telefone', 'tipo'].forEach((chave) => {
            const celula = linha.insertCell();
            celula.textContent = canoa[chave];
        });

        // Adiciona botão de seleção de canoa
        const celulaSelecionar = linha.insertCell();
        const botaoSelecionar = document.createElement('button');
        botaoSelecionar.textContent = 'Selecionar';
        botaoSelecionar.classList.add('selecionar-canoa');
        botaoSelecionar.dataset.numeroCanoa = canoa.id;
        celulaSelecionar.appendChild(botaoSelecionar);
    });
    // Adiciona a tabela à div na página
    listaCanoasDiv.appendChild(tabela);
};

// Adiciona event listener para os botões de seleção de canoa
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('selecionar-canoa')) {
        const numeroCanoa = event.target.dataset.numeroCanoa;
        document.getElementById('numero-canoa').value = numeroCanoa;
    }
});

// Adiciona event listener para o botão de busca de canoas
buscarCanoasBtn.addEventListener('click', function() {
    const cidade = cidadeInput.value;
    
    // Envia uma solicitação para a API para buscar as canoas por cidade
    fetch(`http://127.0.0.1:5000/por-municipio?municipio=${cidade}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Alterado para imprimir os dados recebidos da API
            criarTabelaCanoas(data.canoas);
        })
        .catch(error => console.error('Erro ao buscar canoas:', error));





    
});
// Função para enviar dados para efetuar a reserva - método POST
const postReserva = (numeroCanoa, telefone, data) => {
    fetch('http://127.0.0.1:5000/reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canoa: numeroCanoa,
            data: data,
            usuario: telefone
        })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe a confirmação de reserva na página
        alert(`Reserva efetuada com sucesso! ID da reserva: ${data['id-reserva']}`);
    })
    .catch(error => console.error('Erro ao fazer reserva:', error));
};


// Adiciona event listener para o formulário de reserva
document.getElementById('form-reserva').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    
    // Captura os dados do formulário
    const numeroCanoa = document.getElementById('numero-canoa').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;

    // Adicione os logs de depuração para verificar os valores dos campos
    console.log('Número da Canoa:', numeroCanoa);
    console.log('Telefone:', telefone);
    console.log('Data:', data);
    
    // Envia uma solicitação para a API para fazer a reserva
    postReserva(numeroCanoa, telefone, data);
});





// Processo 2

// Captura os elementos HTML relevantes para o processo de listagem de reservas por telefone
const telefoneReservaInput = document.getElementById('telefone-avaliacao');
const buscarReservasBtn = document.getElementById('buscar-reservas');
const listaReservasDiv = document.getElementById('lista-reservas');

// Função para criar uma tabela com as informações das reservas e adicionar botões de seleção
const criarTabelaReservas = (dadosReservas) => {
    // Limpa a lista de reservas anterior, se houver
    listaReservasDiv.innerHTML = '';

    // Cria uma tabela para exibir as informações das reservas
    const tabela = document.createElement('table');

    // Cria o cabeçalho da tabela
    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    ['ID da Reserva', 'ID da Canoa', 'Data', 'Comentário', 'Avaliação', 'Selecionar'].forEach((item) => {
        const th = document.createElement('th');
        th.textContent = item;
        linhaCabecalho.appendChild(th);
    });

    // Cria o corpo da tabela e adiciona os dados das reservas
    const corpo = tabela.createTBody();
    dadosReservas.forEach(reserva => {
        const linha = corpo.insertRow();
        ['id_reserva', 'canoa', 'data', 'comentario', 'avaliacao'].forEach((chave) => {
            const celula = linha.insertCell();
            celula.textContent = reserva[chave] !== null ? reserva[chave] : '';
        });

        // Adiciona botão de seleção de reserva
        const celulaSelecionar = linha.insertCell();
        const botaoSelecionar = document.createElement('button');
        botaoSelecionar.textContent = 'Selecionar';
        botaoSelecionar.classList.add('selecionar-reserva');
        botaoSelecionar.dataset.idReserva = reserva.id_reserva;
        celulaSelecionar.appendChild(botaoSelecionar);
    });

    // Adiciona a tabela à div na página
    listaReservasDiv.appendChild(tabela);
};


// Adiciona event listener para os botões de seleção de reserva
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('selecionar-reserva')) {
        const idReserva = event.target.dataset.idReserva;
        document.getElementById('id_reserva').value = idReserva;  /// AQUI!
        console.log('Reserva selecionada:', idReserva);
    }
});

// Adiciona event listener para o botão de busca de reservas por telefone
buscarReservasBtn.addEventListener('click', function() {
    const telefone = telefoneReservaInput.value;
    
    // Envia uma solicitação para a API para buscar as reservas por telefone
    fetch(`http://127.0.0.1:5000/reserva-telefone?telefone=${telefone}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Alterado para imprimir os dados recebidos da API
            // Limpa a lista de reservas anterior, se houver
            criarTabelaReservas(data.reservas)

        })
        .catch(error => console.error('Erro ao buscar reservas:', error));
});



// Metodo PUT

// Captura os elementos HTML relevantes para o processo de atualização de reserva com comentários
const idReservaInput = document.getElementById('id_reserva');
const comentarioInput = document.getElementById('comentario');
const avaliacaoInput = document.getElementById('avaliacao');


// Função para enviar dados para efetuar comentario - método PUT
const enviarAtualizacaoComentarioAvaliacao = (idReserva, comentario, avaliacao) => {
    fetch('http://127.0.0.1:5000/comentario', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avaliacao: avaliacao,
            comentario: comentario,
            id_reserva: idReserva
        })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe a confirmação de reserva na página
        alert(`Reserva atualizada com sucesso! ID da reserva: ${data['id-reserva']}`);
    })
    .catch(error => console.error('Erro ao fazer reserva:', error));
};


// Captura o elemento do botão "Enviar Avaliação"
const enviarAvaliacaoBtn = document.getElementById('enviar-avaliacao');

// Adiciona event listener para o botão "Enviar Avaliação"
enviarAvaliacaoBtn.addEventListener('click', function() {
    // Captura os valores dos campos de entrada
    const idReserva = idReservaInput.value;
    const comentario = comentarioInput.value;
    const avaliacao = avaliacaoInput.value;

    // Chama a função para enviar os dados de avaliação
    enviarAtualizacaoComentarioAvaliacao(idReserva, comentario, avaliacao);
});
