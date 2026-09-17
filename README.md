# Steam Game Catalog API

API em Node.js + Express para cadastro, listagem, consulta, edição e exclusão de jogos, simulando um banco de dados em memória.

## Tecnologias

- Node.js
- Express
- Swagger UI / OpenAPI 3
- JavaScript ES Modules
- Testes com Node Test Runner

## Como iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

3. Acesse a API em:
   ```text
   http://localhost:3000
   ```

4. Consulte a documentação interativa:
   ```text
   http://localhost:3000/api-docs
   ```

   A especificação OpenAPI também está disponível em:
   ```text
   http://localhost:3000/swagger.json
   ```

O projeto possui um middleware de logging que registra método, rota, status HTTP e duração de cada requisição.

## Rotas da API

### Listar todos os jogos
```http
GET /jogos
```

### Cadastrar um jogo
```http
POST /jogos
```

Body de exemplo:
```json
{
  "nome": "Hades",
  "genero": "Action RPG",
  "preco": 49.9,
  "desenvolvedora": "Supergiant Games",
  "descricao": "Jogo de ação com elementos roguelike"
}
```

### Consultar um jogo por ID
```http
GET /jogos/:id
```

### Editar um jogo
```http
PUT /jogos/:id
```

### Excluir um jogo
```http
DELETE /jogos/:id
```

## Testes

Para executar os testes automatizados:
```bash
npm test
```

## Observação

Os dados são armazenados em memória enquanto o servidor estiver em execução. Ao reiniciar o servidor, a lista volta ao estado inicial.
