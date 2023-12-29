# AMR API E-commerce system.

⚠️ Esse é um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas. ⚠️

Esta API, em fase inicial de desenvolvimento, representa um PDV onde podemos:<br>

#

#### Usuários:

- Cadastrar usuários
- Detalhar informações de usuário cadastrado
- Atualizar dados do usuário
- Fazer login

#### Clientes:

- Cadastrar clientes
- Editar dados do cliente
- Detalhar perfil do cliente
- Listar clientes

#### Produtos:

- Cadastrar produtos
- Editar informações do produto
- Detalhar informações do produto
- Excluir produtos
- Listar produtos

#### Categorias:

- Listar as categorias dos produtos.

##

As rotas para fazer as requisições são:

### get https://better-fish-coat.cyclic.app/categorias<br>

- Listar categorias

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/79aac015-93d4-4288-af8c-399390b33fdc)

#

### post https://better-fish-coat.cyclic.app/usuario<br>

- Cadastrar usuário

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/c50ca167-28f9-4e9d-bfdc-ff05dd8a7e93)

### post https://better-fish-coat.cyclic.app/login<br>

- Login do usuário

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/140903e4-6f9f-4366-b44e-db72f171984d)

### get https://better-fish-coat.cyclic.app/usuario<br>

- Mostra informações do usuário logado

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/e4a1536e-226c-4126-979c-3570cf331226)

### put https://better-fish-coat.cyclic.app/usuario<br>

- Atualizar dados do usuário logado

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/448cc2f9-4f52-4f2f-ada5-00196fd8769e)

#

### post https://better-fish-coat.cyclic.app/produto<br>

- Cadastrar produtos

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/532008bc-b89d-4e4a-82cc-3ab9a4932c68)

### put https://better-fish-coat.cyclic.app/produto<br>

- Atualizar informações do produto

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/38acf9bb-cb52-419c-a327-cd4b281a8aa3)

### get https://better-fish-coat.cyclic.app/produto<br>

- Listar produtos

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/0cdbaeb4-1f1d-4eee-b8fd-c416c62e4abe)

### get https://better-fish-coat.cyclic.app/produto<br>

- informações do produto (informar id no parâmetro da rota)

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/319171f4-6b9e-48ca-a302-104174bb92b9)

### delete https://better-fish-coat.cyclic.app/produto<br>

- Deletar produto

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/d50cf0a3-3fba-4552-afa9-b81352394d43)

#

### post https://better-fish-coat.cyclic.app/cliente<br>

- Cadastrar clientes

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/3ca9256a-8615-4fe9-bdc4-684174e5e5ef)

### put https://better-fish-coat.cyclic.app/cliente<br>

- Atualizar dados do cliente

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/15846760-b6cb-42b6-a70a-7cd59cca85f5)

### get https://better-fish-coat.cyclic.app/cliente<br>

- Listar clientes cadastrados

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/569c50b8-fdfe-4c21-a8ed-129650252518)

### get https://better-fish-coat.cyclic.app/cliente<br>

- Detalhar informações do cliente cadastrado

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/7b35ac65-fbd7-4058-8905-cb504bd3229e)

#

### post https://better-fish-coat.cyclic.app/pedido<br>

- Cadastrar um pedido

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/625c4494-f675-48df-af48-86d7f4c5ce66)

### get https://better-fish-coat.cyclic.app/pedido<br>

- Listar pedidos

![image](https://github.com/cubos-academy/desafio-backend-modulo-05-sistema-pdv-b2b-ifood-t10/assets/94409465/403f2c3b-7289-4e6c-ac4b-4e98abadbb6d)

Por estar em fase inicial, faltam algumas funcionalidades, mas que serão progressivamente criadas e adicionadas ao sistema.
