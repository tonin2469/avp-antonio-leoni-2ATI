import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const jogos = [
  {
    id: 1,
    nome: "Counter-Strike 2",
    genero: "FPS",
    preco: 0,
    desenvolvedora: "Valve",
    descricao: "Jogo competitivo de tiro em equipe."
  },
  {
    id: 2,
    nome: "The Witcher 3",
    genero: "RPG",
    preco: 39.9,
    desenvolvedora: "CD Projekt Red",
    descricao: "Aventura épica em um mundo aberto."
  },
  {
    id: 3,
    nome: "Stardew Valley",
    genero: "Simulação",
    preco: 24.9,
    desenvolvedora: "ConcernedApe",
    descricao: "Cultive a fazenda, socialize e explore."
  }
];

let nextId = jogos.length > 0 ? Math.max(...jogos.map((jogo) => jogo.id)) + 1 : 1;

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Steam funcionando!",
    descricao: "API de cadastro e gerenciamento de jogos",
    rotas: ["/jogos", "/jogos/:id"]
  });
});

app.get("/jogos", (req, res) => {
  res.json(jogos);
});

app.get("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const jogo = jogos.find((item) => item.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  res.json(jogo);
});

app.post("/jogos", (req, res) => {
  const { nome, genero, preco, desenvolvedora, descricao } = req.body;

  if (!nome || !genero || !desenvolvedora) {
    return res.status(400).json({
      message: "Os campos nome, genero e desenvolvedora são obrigatórios"
    });
  }

  const novoJogo = {
    id: nextId++,
    nome,
    genero,
    preco: preco ?? 0,
    desenvolvedora,
    descricao: descricao ?? ""
  };

  jogos.push(novoJogo);

  res.status(201).json({
    message: "Jogo cadastrado com sucesso",
    jogo: novoJogo
  });
});

app.put("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const jogoIndex = jogos.findIndex((item) => item.id === id);

  if (jogoIndex === -1) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  const jogoAtualizado = {
    ...jogos[jogoIndex],
    ...req.body,
    id
  };

  jogos[jogoIndex] = jogoAtualizado;

  res.json({
    message: "Jogo atualizado com sucesso",
    jogo: jogoAtualizado
  });
});

app.delete("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const jogoIndex = jogos.findIndex((item) => item.id === id);

  if (jogoIndex === -1) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  const [jogoRemovido] = jogos.splice(jogoIndex, 1);

  res.json({
    message: "Jogo removido com sucesso",
    jogo: jogoRemovido
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

export { app, jogos };
export default app;
