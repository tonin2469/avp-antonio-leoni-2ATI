process.env.NODE_ENV = 'test';

import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from './server.js';

const server = app.listen(0);
const port = server.address().port;

async function request(path, options = {}) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let body = text;

  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }

  return { response, body };
}

test('GET /jogos deve listar jogos cadastrados', async () => {
  const { response, body } = await request('/jogos');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body));
  assert.ok(body.length >= 3);
});

test('POST /jogos deve cadastrar um novo jogo', async () => {
  const { response, body } = await request('/jogos', {
    method: 'POST',
    body: JSON.stringify({
      nome: 'Hades',
      genero: 'Action RPG',
      preco: 49.9,
      desenvolvedora: 'Supergiant Games',
      descricao: 'Ação roguelike com um estilo visual único.'
    })
  });

  assert.equal(response.status, 201);
  assert.equal(body.message, 'Jogo cadastrado com sucesso');
  assert.equal(body.jogo.nome, 'Hades');
});

test('GET /jogos/:id deve consultar um jogo específico', async () => {
  const { response, body } = await request('/jogos/1');

  assert.equal(response.status, 200);
  assert.equal(body.id, 1);
  assert.equal(body.nome, 'Counter-Strike 2');
});

test('PUT /jogos/:id deve editar um jogo existente', async () => {
  const { response, body } = await request('/jogos/2', {
    method: 'PUT',
    body: JSON.stringify({
      nome: 'The Witcher 3: Wild Hunt',
      genero: 'RPG',
      preco: 44.9,
      desenvolvedora: 'CD Projekt Red',
      descricao: 'Versão atualizada do jogo de fantasia.'
    })
  });

  assert.equal(response.status, 200);
  assert.equal(body.message, 'Jogo atualizado com sucesso');
  assert.equal(body.jogo.nome, 'The Witcher 3: Wild Hunt');
});

test('DELETE /jogos/:id deve remover um jogo', async () => {
  const { response, body } = await request('/jogos/3', {
    method: 'DELETE'
  });

  assert.equal(response.status, 200);
  assert.equal(body.message, 'Jogo removido com sucesso');
  assert.equal(body.jogo.id, 3);
});

test('GET /jogos/:id deve retornar 404 quando jogo não existe', async () => {
  const { response, body } = await request('/jogos/999');

  assert.equal(response.status, 404);
  assert.equal(body.message, 'Jogo não encontrado');
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});
