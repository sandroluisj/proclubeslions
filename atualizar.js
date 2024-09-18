
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