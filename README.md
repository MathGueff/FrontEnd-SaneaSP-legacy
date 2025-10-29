# SaneaSP
Aplicação web feita em Angular que permite que cidadãos denunciem problemas de saneamento básico em suas regiões. Organizações parceiras podem responder às denúncias, personalizar as experiências 

## 🧾 Descrição
O SaneaSP tem como objetivo aproximar os cidadãos das organizações responsáveis pelo saneamento básico na cidade. A plataforma oferece um processo simples e acessível para a criação de denúncias, ao mesmo tempo em que disponibiliza um ambiente completo e gerenciável para que as organizações possam responder e administrar as ocorrências com eficiência.

## Tecnologias Utilizadas
Framework: Angular 18+

Linguagem: TypeScript

Estilo: CSS puro

Bibliotecas adicionais: 
- SweetAlert2 – modais e alertas personalizados
- Bootstrap – sistema de grid e componentes prontos

## Instalação

```
# Clone o repositório
git clone https://github.com/MathGueff/FrontEnd-SaneaSP

# Acesse a pasta do projeto
cd FrontEnd-SaneaSP

# Instale as dependências
npm install

# Rode a aplicação
npm start

# Rode o container do Front
docker run -p 4200:4200 angular-docker-develop

```
## Estrutura das pastas

```bash
src/
└── app/
    ├── core/
    │   ├── guards/
    │   ├── components/ 
    │   ├── services/
    │   └── models/
    ├── shared/
    │   ├── components/
    │   ├── services/
    │   ├── models/
    │   └── enums/
    └── features/
        ├── reclamacao/
        │   ├── services/
        │   ├── components/
        │   ├── pages/
        │   └── models/
        ├── usuario/
        │   ├── services/
        │   ├── components/
        │   ├── pages/
        │   └── models/
        └── ...
```
