-- Use this file to create your DataBank using PostgreSQL
create database pdv;

create table if not exists usuarios (
    id serial primary key,
    nome varChar not null,
    email varChar not null unique,
    senha varChar not null
);


create table if not exists categorias (
    id serial primary key,
    descricao varChar not null 
);

insert into categorias (descricao) 
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');
