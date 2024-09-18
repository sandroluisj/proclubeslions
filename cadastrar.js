
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