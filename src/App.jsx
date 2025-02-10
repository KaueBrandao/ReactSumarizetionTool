import { useState } from 'react';
import './App.css';

function App() {
  const [texto, setTexto] = useState(''); // Estado para armazenar o texto do input
  const [resumo, setResumo] = useState('Seu resumo sera exibido aqui'); // Estado para armazenar o resumo
  const [palavrasChave, setPalavrasChave] = useState([]); // Estado para armazenar as palavras-chave

  // Função para enviar o texto para a API e obter o resumo e palavras-chave
  async function obterResumo(texto) {
    try {
      const response = await fetch("https://web-production-ce336.up.railway.app/resumir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }), // Enviando o texto como JSON
      });

      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro ao obter o resumo: ${response.statusText}`);
      }

      const data = await response.json();
      // Atualizando os estados com o resumo e palavras-chave
      setResumo(data.resumo);
      setPalavrasChave(data.palavras_chave);
    } catch (error) {
      console.error("Erro:", error);
      setResumo('Erro ao gerar resumo');
      setPalavrasChave([]);
    }
  }

  // Função chamada quando o usuário clica no botão
  const handleGerarResumo = () => {
    if (texto.trim()) {
      obterResumo(texto);
    } else {
      alert('Por favor, insira um texto!');
    }
  };

  return (
    <div className="App">
      <h1>Sumarizer Tool</h1>
      <div className="InArea">
        {/* Botão acima das áreas */}
        <button onClick={handleGerarResumo}>Gerar Resumo</button>
        
        <div className="TextoArea">
          {/* Input para o texto */}
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite o texto para resumir"
          />

          {/* Linha vertical entre o texto e o resumo */}
          <div className="linha-vertical"></div>
          
          {/* Resumo ao lado do texto */}
          <div className="ResumoArea">
            <p>{resumo}</p>
          </div>
        </div>

        {/* Linha horizontal entre o resumo e as palavras-chave */}
        <div className="linha-horizontal"></div>
        
        {/* Exibindo as palavras-chave */}
        <div>
          <h2>Palavras-chave:</h2>
          <ul>
            {palavrasChave.map((palavra, index) => (
              <li key={index}>{palavra}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
