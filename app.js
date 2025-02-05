//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.


document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('name-input'); // Campo para inserir um nome por vez
  const addBtn = document.getElementById('add-btn'); // Botão para adicionar nome à lista
  const generateBtn = document.getElementById('generate-btn'); // Botão para sortear
  const namesList = document.getElementById('names-list'); // Lista de nomes adicionados
  const resultDiv = document.getElementById('result'); // Div para exibir o resultado do sorteio

  let names = []; // Array para armazenar os nomes

  // Função para adicionar um nome à lista
  addBtn.addEventListener('click', () => {
    const name = input.value.trim();

    if (name === '') {
      alert('Por favor, insira um nome válido.');
      return;
    }

    if (names.includes(name)) {
      alert('Este nome já foi adicionado. Insira um nome único.');
      return;
    }

    // Adiciona o nome ao array
    names.push(name);

    // Atualiza a lista visual de nomes
    const listItem = document.createElement('li');
    listItem.textContent = name;
    namesList.appendChild(listItem);

    // Limpa o campo de input
    input.value = '';
  });

  // Função para gerar o sorteio
  generateBtn.addEventListener('click', () => {
    // Limpar resultados anteriores
    resultDiv.innerHTML = '';

    // Validações
    if (names.length < 2) {
      showError('Por favor, adicione pelo menos dois nomes.');
      return;
    }

    try {
      // Gerar e exibir sorteio
      const assignments = generateAssignments(names);
      displayAssignments(assignments, resultDiv);
    } catch (error) {
      showError('Erro ao gerar o sorteio. Tente novamente.');
    }
  });

  // Função para exibir mensagens de erro
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    resultDiv.appendChild(errorElement);
  }
});

// Função para gerar os pares do Amigo Secreto
function generateAssignments(names) {
  let shuffled;
  do {
    shuffled = shuffle([...names]); // Embaralha os nomes
  } while (hasSelfAssignment(names, shuffled)); // Evita autosorteio

  return names.map((name, index) => ({
    from: name,
    to: shuffled[index]
  }));
}

// Função para embaralhar um array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para verificar se há autosorteio
function hasSelfAssignment(original, shuffled) {
  return original.some((name, index) => name === shuffled[index]);
}

// Função para exibir os resultados
function displayAssignments(assignments, container) {
  const list = document.createElement('ul');

  assignments.forEach((pair) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${pair.from}</strong> tirou 
      <span class="secret-friend">${pair.to}</span>
    `;
    list.appendChild(listItem);
  });

  container.appendChild(list);
}