-- Use this file to create your DataBank using PostgreSQL
CREATE DATABASE pdv;

CREATE TABLE IF NOT EXISTS usuarios (
    id      SERIAL PRIMARY KEY,
    nome    VARCHAR(50) NOT NULL,
    email   VARCHAR(50) NOT NULL UNIQUE,
    senha   VARCHAR(120) NOT NULL
);


CREATE TABLE IF NOT EXISTS categorias (
    id          SERIAL PRIMARY KEY,
    descricao   VARCHAR(100) NOT NULL
);

INSERT INTO categorias
(descricao)
VALUES
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

CREATE TABLE IF NOT EXISTS produtos (
    id                  SERIAL PRIMARY KEY,
    descricao           VARCHAR(100) NOT NULL,
    quantidade_estoque  INT NOT NULL,
    valor               INT NOT NULL,
    categoria_id        SMALLINT NOT NULL REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id      SERIAL PRIMARY KEY,
    nome    VARCHAR(50) NOT NULL,
    email   VARCHAR(50) NOT NULL UNIQUE,
    cpf     VARCHAR(15) NOT NULL UNIQUE,
    cep     VARCHAR(10),
    rua     VARCHAR(100),
    numero  VARCHAR(10),
    bairro  VARCHAR(50),
    cidade  VARCHAR(50),
    estado  VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id                  SERIAL PRIMARY KEY,
    cliente_id          INT NOT NULL REFERENCES clientes(id),
    observacao          VARCHAR(150) NOT NULL,
    valor_total         INT NOT NULL
);

CREATE TABLE IF NOT EXISTS pedido_produtos (
    id                      SERIAL PRIMARY KEY,
    pedido_id               INT NOT NULL REFERENCES pedidos(id),
    produto_id              INT NOT NULL REFERENCES produtos(id),
    quantidade_produto      INT NOT NULL,
    valor_produto           INT NOT NULL
);
