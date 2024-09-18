const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/livraria")
.then(() => console.log("Conectado ao MongoDB"))
.catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const cadastrar = mongoose.model("cadastrar", esquemacadastrar);
  async function criarTime(id, nome, valor, saldo) {
    try {
      const novoTime= new Time ({id, nome, valor, saldo});
      return await novoTime.save();
    } catch (erro) {
      console.error("Erro ao criar Time:", erro);
      throw erro;
    }
  }
  
  app.post("/time", async (req, res) => {
    try {
      const {id, nome, valor, saldo} = req.body;
      const novoTime = await criarTime(id, nome, valor, saldo);
      res.status(201).json({ mensagem: "Time criado com sucesso", time: novoTime });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao criar time", erro: erro.message });
    }
  });


async function atualizarTime(id, nome, valor, saldo)
{
try {
   const TimeAtualizado = await Time.findByIdAndUpdate(
id,
   {id, nome, valor, saldo},
   {new: true, runValidators: true }
);
    return TimeAtualizado;
    } catch (erro) {
console.error("Erro na atualização do time:", erro);
throw erro;
}
}

app.put("/time/:id", async (req, res) => {
try {
const { id } = req.params;
const { nome, valor, saldo} = req.body;
const TimeAtualizado = await atualizarTime(
id,
nome,
valor,
saldo
);
if (TimeAtualizado) {
    res.status(200).json({
    mensagem: "Time atualizado com sucesso !",
    time: TimeAtualizado,
});
} else {
    res.status(404).json({ mensagem: "O time não foi encontrado..." });
}
} catch (erro) {
    res.status(500).json({ mensagem: "Erro na atualização do time", erro: erro.message });
}
});
const port = 3000;
     app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
     
  