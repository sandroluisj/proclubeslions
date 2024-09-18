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