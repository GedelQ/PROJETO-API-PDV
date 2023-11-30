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
    descricao   VARCHAR NOT NULL
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
    quantidade_estoque  VARCHAR(30) NOT NULL,
    valor               VARCHAR(30) NOT NULL,
    categoria_id        INT NOT NULL references categorias(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id      SERIAL PRIMARY KEY,
    nome    VARCHAR(50) NOT NULL,
    email   VARCHAR(50) NOT NULL UNIQUE,
    cpf     VARCHAR(50) NOT NULL UNIQUE,
    cep     VARCHAR(10),
    rua     VARCHAR(100),
    numero  VARCHAR(5),
    bairro  VARCHAR(50),
    cidade  VARCHAR(50),
    estado  VARCHAR(30)
);