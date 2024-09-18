const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/livraria")
.then(() => console.log("Conectado ao MongoDB"))
.catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const port = 3000;
     app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
     
  