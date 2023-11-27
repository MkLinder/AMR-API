create table usuario (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);

create table categorias (
    id serial primary key,
    descricao text
);