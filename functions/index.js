const functions = require('firebase-functions');
const admin = require('firebase-admin')

//Loggar no firebase admin
admin.initializeApp()

exports.soma = functions.database.ref('/movimentacoes/{dia}')
    .onWrite(async (change, context) => {
        const mesesRef = admin.database().ref('/meses/' + context.params.dia)
        const movimentacoesRef = change.after.ref
        const movimentacoesSS = await movimentacoesRef.once('value')
        const movimentacoes = movimentacoesSS.val()

        let entrada = 0
        let saida = 0

        Object.keys(movimentacoes).forEach(m => {
            if (movimentacoes[m].value > 0) {
                entrada += movimentacoes[m].value
            } else {
                saida += movimentacoes[m].value
            }
        })

        return mesesRef.transaction(current=>{
            if(current===null){
                return{
                    entrada,
                    saida,
                    previsao_entrada:0,
                    previsao_saida:0
                }
            }
            return {
                ...current,
                entrada,
                saida
            }
        })

    })

