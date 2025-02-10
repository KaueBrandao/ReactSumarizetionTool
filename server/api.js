// Função para enviar o texto para a API e obter o resumo e palavras-chave
async function obterResumo(texto) {
    try {
      // Fazendo a requisição POST para a API FastAPI
      const response = await fetch("https://d039-34-125-208-195.ngrok-free.app/resumir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }), // Enviando o texto como JSON
      });
  
      // Checando se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter o resumo');
      }
  
      // Convertendo a resposta para JSON
      const data = await response.json();
  
      // Acessando o resumo e as palavras-chave retornadas pela API
      const resumo = data.resumo;
      const palavrasChave = data.palavras_chave;
  
      // Exibindo o resumo e palavras-chave
      console.log("Resumo:", resumo);
      console.log("Palavras-chave:", palavrasChave);
      
      // Retornando o resumo e palavras-chave
      return { resumo, palavrasChave };
  
    } catch (error) {
      console.error("Erro:", error);
      return { resumo: "", palavrasChave: [] };
    }
  }
  
  // Exemplo de uso da função
  const texto = "As mudanças climáticas representam um dos maiores desafios da humanidade no século XXI. O aumento da temperatura global tem causado derretimento das calotas polares, elevação do nível do mar e eventos climáticos extremos, como furacões e secas prolongadas. Cientistas alertam que a ação humana, especialmente a emissão de gases do efeito estufa, é a principal responsável pelo aquecimento global.";
  
  obterResumo(texto)
    .then(result => {
      console.log("Resumo Obtido:", result.resumo);
      console.log("Palavras-chave Obtidas:", result.palavrasChave);
    });
  