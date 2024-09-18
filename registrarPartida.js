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
        res.status(400).send('Erro ao cadastrar time'+ error);
    }
});