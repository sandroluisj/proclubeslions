const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
.connect("mongodb://localhost:27017/livraria")
.then(() => console.log("Conectado ao MongoDB"))
.catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));


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
async function deletarTime(id) {
    try {
    const timeDeletado = await Time.findByIdAndDelete(id);
    return timeDeletado;
    } catch (erro) {
    console.error("Erro ao deletar o time:", erro);
    throw erro;
    }
    }
    
    async function obterTimes() {
        try{
        return await time.find();
        }catch (erro){
        console.error("Erro ao obter times:", erro);
        throw erro;
        }
        }
    
    app.get("/times", async (req,res) => {
        try {
        const times = await obterTimes();
        res.status(200).json(times);
        }catch (erro) {
        res
          .status(500)
          .json({ mensagem: "Erro ao obter times", erro: erro.message});
        }
        }) ; 
        const times = new mongoose.Schema ({
            nome: {type:String, required: true},
            valor:{type:Number, required:true}
        }); 
        
        const time = mongoose.model('Time',timeSchema);
        
        app.get('/times',async (req,res) => {
            try{
            const times = await Time.find();
            if(times.length === 0){
            return
            res.status(200).send("Ainda não há times cadastrados");
            }
            res.status(200).json(times);
            }catch (error){
            res.status(500).send('Erro ao buscar times' + error);
            }
        });
        
        app.post('/times',async (req,res) => {
            const {nome, valor} = req.body;
            try{
                const novoTime = new Time({nome,valor});
                await novoTime.save();
                res.status(201).json(novoTime);
                } catch (error) {
                res.status(400).send('Erro ao cadastrar time'+ erro);
            }
        });
        
    app.post('/partida', async (req,res) => {
            const {vencedorIndex, perdedorIndex} = req.body;
        try{
                const times = await time.find();
                if(vencedorIndex < 0 || vencedorIndex >= times.length || perdedorIndex < 0 || perdedorIndex >= times.length){
                    return
                    res.status(400).send("Numero de time inválido");
                }
                let timeVencedor = times [vencedorIndex];
                let timePerdedor = times [perdedorIndex];
        
                if (timeVencedor.valor > timePerdedor.valor){
                    let temp = times [vencedorIndex];
                    times[vencedorIndex]= times [perdedorIndex];
                    times[perdedorIndex]= temp;
        
                    res.status(200).send(`partida registrada: ${timeVencedor.nome} venceu ${timePerdedor.nome}.`);
                } else{
                    res.status(200).send(`partida registrada: ${timeVencedor.nome} venceu ${timePerdedor.nome}.`);
                }
            }catch (erro){
                res.status(500).send('Erro ao registrar partida' + erro)
            }
        })
    app.delete("/time/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const timeDeletado = await deletarTime(id);
    if (timeDeletado) {
    res.status(200).json({ mensagem: "Time deletado com sucesso", time: timeDeletado });
    } else {
    res.status(404).json({ mensagem: "O time não foi não encontrado..." });
    }
    } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar o time", erro: erro.message });
    }
    });
const port = 3000;
     app.listen(port, () => {
       console.log(`Servidor rodando na porta ${port}`);
     });
     
  