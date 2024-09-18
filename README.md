# Pro clubes lions

## Funcoes 
### Cadastro 
* time
* Rank 
* saldo de gols
``` javascript 
function cadastrar() {
    rl.question("digite o nome do time:" , (nome) => {
        rl.question("digite qual é o rank do time na tabela do campeonato:" , (valor) => {
            rl.question("digite o saldo de gols" , (saldo) => {
            times.push({nome: nome, valor: parseFloat(valor), saldo: parseFloat(saldo)})
            console.log("time cadastrado!")
            menu()
        })
        })
    }) 
}
```
### Listar 
* Ira listar tudo oq esta dentro do cadastro e o artileiro
``` javascript
function listar() {
    if (times.length == 0){
    console.log("ainda não há nenhum clube cadastrado.")
    menu()
    }
    else {
    console.log(times)
    menu()
    }
}
```

### Editar
* Ira editar oq ta dentro de cadastro
``` javascript
function editar(){
        if (times.length == 0) {
            console.log("ainda não há time cadastrados")
            menu()
        }else {
            console.log('listar dastro ')
            times.forEach((times, index) => {
                console.log(`${index +1}. ${times.nome}`)
            })
            
            rl.question ("digite o numero do time que deseja editar", (numero) => {
                if (numero > 0 && numero <= times.length) {
                    rl.question('digite o nome do clube:' , (nome) => {
                        rl.question('digite a colocação:', (valor) =>{
                            rl.question('digite o saldo de gols', (saldo) => {
                            times[numero - 1] = {
                                nome, 
                                valor,
                                saldo
                            }
                            console.log("times editado com sucesso!")
                            menu()
                        })
                        })
                    })
                }else {
                    console.log('times inválido, tente novamente.')
                    menu()
                }
        })
    }
    }
 ```

### Registrar partida 
* Vai registrar qm ganhou e qm perdeu 
``` javascript
function registrar() {
    if (times.length === 0) {
        console.log("ainda não há times cadastrados.");
        menu();
    } else {
        console.log('lista de times cadastrados:');
        times.forEach((time, index) => {
            console.log(`${index + 1}. ${time.nome}`);
        });

        rl.question("digite o número do time que venceu: ", (numeroVencedor) => {
            let vencedorIndex = parseInt(numeroVencedor) - 1;

            rl.question("digite o número do time que perdeu: ", (numeroPerdedor) => {
                let perdedorIndex = parseInt(numeroPerdedor) - 1;

                if (vencedorIndex < 0 || vencedorIndex >= times.length || perdedorIndex < 0 || perdedorIndex >= times.length) {
                    console.log("número de time inválido.");
                    menu();
                    return;
                }

                let timeVencedor = times[vencedorIndex]
                let timePerdedor = times[perdedorIndex]

                if (timeVencedor.valor > timePerdedor.valor) {
                   
                    let temp = times[vencedorIndex]
                    times[vencedorIndex] = times[perdedorIndex];
                    times[perdedorIndex] = temp

                    console.log(`partida registrada: ${timeVencedor.nome} venceu ${timePerdedor.nome}`);
                    console.log("tabela atualizada.")

                } else {
                    console.log(`partida registrada: ${timeVencedor.nome} venceu ${timePerdedor.nome}`);
                    console.log("não houve mudança na tabela.")
                }

                menu()
            })
        })
    }
}
```
### Artileiro do time
* O Registra o artileiro 
``` javascript
function Artilheiro() {
    if (times.length === 0) {
        console.log("ainda não há times cadastrados.")
        menu()
    } else {
        console.log('lista de times cadastrados:')
        times.forEach((time, index) => {
            console.log(`${index + 1}. ${time.nome}`)
        });

        rl.question("digite o número do time do artilheiro: ", (numeroTime) => {
            const index = parseInt(numeroTime) - 1
            if (index >= 0 && index < times.length) {
                rl.question("digite o nome do artilheiro: ", (artilheiro) => {
                    times[index].artilheiro = artilheiro
                    console.log(`artilheiro ${artilheiro} cadastrado para o time ${times[index].nome}.`);
                    menu()
                })
            } else {
                console.log("número de time inválido.")
                menu()
            }
        })
    }
}
```
### Tabela
* Imprime a ordem dos times na tabela 
``` javascript
function tabela() {
                if (times.length === 0) {
                    console.log("ainda não há times cadastrados para exibir na tabela.");
                } else {
                   times.sort((a,b)=> a.valor-b.valor)
            
                    console.log("tabela do campeonato:")
                   
                    times.forEach((time, index) => {
                        console.log(`${index + 1}. ${time.nome} - colocação: ${time.valor}`);
                    })
                }
                menu();
            }
```                
### Excluir
* Exclui os times
``` javascript
             function excluir() {
                if (times.length == 0){
                    console.log("Não há nenhum times cadastrado.")
                    menu()
                }else {
                    console.log('lista de times')
                    
                    times.forEach((times, index) => {
                        console.log(`${index + 1}. ${times.nome}`)
                    })
                    rl.question("Digite o numero do time que deseja remover", (numero) =>{
                        if (numero > 0 && numero <= times.length) {
                            times.splice(numero - 1, 1)
                            console.log('time removido com sucesso!')
                            menu()
                        }else {
                            console.log("Nome inválido.")
                            menu()
                        }
                    })
                }
            }
```            