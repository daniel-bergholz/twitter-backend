<p align="center">
  <img src="https://hub.maratonas.academy/formacao_frontend_expert_image_url.png" />
</p>

## Description

Backend do Twitter construído para ser acoplado com o React.js no Formação Frontend Expert, o mais novo programa de especialização em frontend do [Maratonas Academy](https://www.maratonas.academy/).

## Instalação

Crie um banco de dados (Eu recomendo usar o docker)

```bash
docker run --name container_name -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Rode as migrations

```bash
yarn migration:run
```

Instale os pacotes

```bash
yarn
```

Inicie o servidor

```bash
yarn start:dev
```

## Scripts de migrations

Mostrar as migrations

```bash
yarn migration:show
```

Gerar uma nova migration a partir de alterações feitas em arquivos \*.entity.ts

```bash
yarn migration:generate migrationName
```

Rodar as migrations

```bash
yarn migration:run
```

Reverter uma migration

```bash
yarn migration:revert
```
