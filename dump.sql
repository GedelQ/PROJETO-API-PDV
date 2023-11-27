-- Use this file to create your DataBank using PostgreSQL
CREATE DATABASE pdv;

CREATE TABLE IF NOT EXISTS usuarios (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(30) NOT NULL
);


CREATE TABLE IF NOT EXISTS categorias (
    ID SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

INSERT INTO categorias (descricao) 
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
