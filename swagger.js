export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Steam Game Catalog API",
    version: "1.0.0",
    description: "API para cadastro e gerenciamento de jogos."
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [{ name: "Jogos", description: "Operações do catálogo de jogos" }],
  paths: {
    "/jogos": {
      get: {
        tags: ["Jogos"],
        summary: "Lista todos os jogos",
        responses: {
          200: {
            description: "Lista de jogos",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Jogo" } } } }
          }
        }
      },
      post: {
        tags: ["Jogos"],
        summary: "Cadastra um jogo",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/NovoJogo" } } } },
        responses: {
          201: { description: "Jogo cadastrado" },
          400: { description: "Campos obrigatórios ausentes" }
        }
      }
    },
    "/jogos/{id}": {
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer", format: "int32" } }],
      get: {
        tags: ["Jogos"],
        summary: "Consulta um jogo por ID",
        responses: {
          200: { description: "Jogo encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Jogo" } } } },
          404: { description: "Jogo não encontrado" }
        }
      },
      put: {
        tags: ["Jogos"],
        summary: "Atualiza um jogo",
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/NovoJogo" } } } },
        responses: {
          200: { description: "Jogo atualizado" },
          404: { description: "Jogo não encontrado" }
        }
      },
      delete: {
        tags: ["Jogos"],
        summary: "Exclui um jogo",
        responses: {
          200: { description: "Jogo removido" },
          404: { description: "Jogo não encontrado" }
        }
      }
    }
  },
  components: {
    schemas: {
      Jogo: {
        type: "object",
        required: ["id", "nome", "genero", "preco", "desenvolvedora", "descricao"],
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Counter-Strike 2" },
          genero: { type: "string", example: "FPS" },
          preco: { type: "number", format: "float", example: 0 },
          desenvolvedora: { type: "string", example: "Valve" },
          descricao: { type: "string", example: "Jogo competitivo de tiro em equipe." }
        }
      },
      NovoJogo: {
        type: "object",
        required: ["nome", "genero", "desenvolvedora"],
        properties: {
          nome: { type: "string", example: "Hades" },
          genero: { type: "string", example: "Action RPG" },
          preco: { type: "number", format: "float", default: 0 },
          desenvolvedora: { type: "string", example: "Supergiant Games" },
          descricao: { type: "string", example: "Ação roguelike." }
        }
      }
    }
  }
};
