# DesafioOne
# Amigo Secreto 🔐

Gerador de Amigo Secreto com sistema de cadastro de participantes. Desenvolvido para exercitar lógica de programação com arrays, funções e manipulação DOM.

![Demonstração](demo.gif) <!-- (opcional: incluir imagem/gif posteriormente) -->

## Funcionalidades ✨
- 🧑 Adição individual de participantes
- 🚫 Validação de nomes duplicados
- ✅ Lista visual de participantes cadastrados
- 🔄 Algoritmo anti-autosorteio
- 📋 Exibição organizada dos resultados
- 🛡️ Validação de mínimo de participantes (2+)

## Como Usar 🚀
1. **Digite um nome** no campo de texto
2. Clique em **"Adicionar"** para incluir na lista
3. Repita até todos os participantes serem cadastrados
4. Clique em **"Sortear"** para gerar os pares
5. Veja os resultados automaticamente na tela

## Tecnologias 🛠️
- JavaScript Vanilla (ES6+)
- HTML5 Semântico
- CSS3 Básico

## Lógica Principal 🔥
```javascript
// Sistema de cadastro de participantes
let names = [];

addBtn.addEventListener('click', () => {
  const name = input.value.trim();
  
  // Validação de nome único
  if (!names.includes(name)) {
    names.push(name);
    updateNamesList(name); // Atualiza a UI
  }
});

// Algoritmo de sorteio seguro
function generateAssignments(names) {
  let shuffled;
  do {
    shuffled = shuffle([...names]);
  } while (names.some((n, i) => n === shuffled[i]));

  return names.map((name, i) => ({
    from: name,
    to: shuffled[i]
  }));
}

// Embaralhamento Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
