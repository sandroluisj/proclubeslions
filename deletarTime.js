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
    res.status(404).json({ mensagem: "O time não foi não encontrado..." });
    }
    } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar o time", erro: erro.message });
    }
    });