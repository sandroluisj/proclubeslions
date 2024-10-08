const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

const timeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true },
  artilheiros: { type: String, required: true },
 
});

const Time = mongoose.model("Time", timeSchema);

async function criarTime(nome, valor, artilheiros) {
  try {
    const novoTime = new Time({ nome, valor, artilheiros });
    return await novoTime.save();
  } catch (erro) {
    console.error("Erro ao criar Time:", erro);
    throw erro;
  }
}

app.post("/time", async (req, res) => {
  try {
    const { nome, valor, artilheiros } = req.body;
    const novoTime = await criarTime(nome, valor, artilheiros);
    res.status(201).json({ mensagem: "Time criado com sucesso", time: novoTime });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar time", erro: erro.message });
  }
});

async function atualizarTime(id, nome, valor, artilheiros) {
  try {
    const timeAtualizado = await Time.findByIdAndUpdate(
      id,
      { nome, valor, artilheiros },
      { new: true, runValidators: true }
    );
    return timeAtualizado;
  } catch (erro) {
    console.error("Erro na atualização do time:", erro);
    throw erro;
  }
}

app.put("/time/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, valor, artilheiros } = req.body;
    const timeAtualizado = await atualizarTime(id, nome, valor, artilheiros);
    if (timeAtualizado) {
      res.status(200).json({
        mensagem: "Time atualizado com sucesso!",
        time: timeAtualizado,
      });
    } else {
      res.status(404).json({ mensagem: "O time não foi encontrado..." });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro na atualização do time", erro: erro.message });
  }
});

async function deletarTime(id) {
  try {
    const timeDeletado = await Time.findByIdAndDelete(id);
    return timeDeletado;
  } catch (erro) {
    console.error("Erro ao deletar o time:", erro);
    throw erro;
  }
}

app.delete("/time/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const timeDeletado = await deletarTime(id);
    if (timeDeletado) {
      res.status(200).json({ mensagem: "Time deletado com sucesso", time: timeDeletado });
    } else {
      res.status(404).json({ mensagem: "O time não foi encontrado..." });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar o time", erro: erro.message });
  }
});

async function listarTimes() {
  try {
    return await Time.find();
  } catch (erro) {
    console.error("Erro ao obter times:", erro);
    throw erro;
  }
}

app.get("/time", async (req, res) => {
  try {
    const times = await listarTimes();
    if (times.length === 0) {
      return res.status(200).send("Ainda não há times cadastrados");
    }
    res.status(200).json(times);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao obter times", erro: erro.message });
  }
});



const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});