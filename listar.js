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