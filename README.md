<h2 align="center">
  Blackstone Challenge
</h2>

# Getting started

## 1. Clone the repository on your computer

```bash
git clone https://github.com/
```

## 2. Install all the dependencies

```bash
npm install
```

## 3. Enviroments

To configure the environment variables, you need to create a `.env` file in the root folder and then copy the content of `temp.env` into the `.env` file.

## 4. Database

_Note: Make sure you have installed docker on your computer._

Start container:

```bash
npm run start:db:docker"
```

Restart container:

```bash
npm run restar:db:docker"
```

Stop container:

```bash
npm run stop:db:docker"
```

## 5. Start the backend

```bash
npm run serve:backend
```

## 6. Start the frontend

```bash
npm run serve:frontend
```
