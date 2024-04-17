document.addEventListener('DOMContentLoaded', function() {
    const processo1 = document.getElementById('processo-1');
    const processo2 = document.getElementById('processo-2');
    const btnProcesso1 = document.getElementById('btn-processo-1');
    const btnProcesso2 = document.getElementById('btn-processo-2');
    const formBusca = document.getElementById('form-busca');
    const listaCanoas = document.getElementById('lista-canoas');
    const canoaLista = document.getElementById('canoa-lista');

    // Função para mostrar o processo 1 e ocultar o processo 2
    function mostrarProcesso1() {
        processo1.style.display = 'block';
        processo2.style.display = 'none';
    }

    // Função para mostrar o processo 2 e ocultar o processo 1
    function mostrarProcesso2() {
        processo1.style.display = 'none';
        processo2.style.display = 'block';
    }
    
    // Limpa a lista de canoas
    function limparListaCanoas() {
        var listaCanoas = document.getElementById("canoa-lista");
        listaCanoas.innerHTML = ""; // Remove todo o conteúdo HTML dentro do elemento
    }

    // Função para exibir a lista de canoas
    function exibirListaCanoas(canoas) {
        limparListaCanoas(); // Limpa a lista antes de exibir os novos resultados
    
        var listaCanoas = document.getElementById("canoa-lista");

        // Adiciona cada canoa à lista
        canoas.forEach(function(canoa) {
            var itemLista = document.createElement("li");
            itemLista.textContent = `Nome: ${canoa.nome}, Dono: ${canoa.dono}, Tipo: ${canoa.tipo}`;
            listaCanoas.appendChild(itemLista);
        });
    }


    // Aqui
    
    // Função para enviar solicitação para a API ao buscar por município
    function buscarCanoasPorMunicipio(municipio) {
        fetch(`http://127.0.0.1:5000/por-municipio?municipio=${municipio}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar canoas por município');
                }
                return response.json();
            })
            .then(data => {
                // Exibir a lista de canoas
                exibirListaCanoas(data.canoas);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }


    // Aqui
    
    // Adiciona listeners aos botões de navegação
    btnProcesso1.addEventListener('click', function(event) {
        event.preventDefault();
        mostrarProcesso1();
    });

    btnProcesso2.addEventListener('click', function(event) {
        event.preventDefault();
        mostrarProcesso2();
    });

    // Adiciona listener ao formulário de busca
    formBusca.addEventListener('submit', function(event) {
        event.preventDefault();
        const cidade = document.getElementById('cidade').value;
        buscarCanoasPorMunicipio(cidade);
    });
});


// Event listener para o formulário de busca
document.getElementById('form-busca').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém o valor digitado no campo de cidade/município
    const cidade = document.getElementById('cidade').value;

    // Chama a função para buscar canoas por município
    buscarCanoasPorMunicipio(cidade);
});
