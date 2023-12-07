create table usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);

create table categorias (
    id serial primary key,
    descricao text
);

insert into categorias 
(descricao)
values
('Informatica'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedo'),
('Moda'),
('Bebe'),
('Games');

create table produtos (
    id serial primary key,
    descricao text not null,
    quantidade_estoque int not null,
    valor int not null,
    categoria_id int not null,
    foreign key (categoria_id) references categorias(id)
);

create table clientes (
    id serial primary key,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    cep text,
    rua text,
    numero int,
    bairro text,
    cidade text,
    estado text
);

create table pedidos (
	id serial primary key,
    cliente_id int not null,
    observacao text,
    valor_total int,
    foreign key (cliente_id) references clientes(id)
); 

create table pedido_produtos (
	id serial primary key,
    pedido_id int not null,
    produto_id int not null,
    quantidade_produto int not null,
    valor_produto int not null,
    foreign key (pedido_id) references pedidos (id),
    foreign key (produto_id) references produtos (id)
);

alter table produtos add column produto_imagem text;