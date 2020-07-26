import React from 'react'
import Loading from '../../components/Loading'
import { useApiMonth } from '../../API'


const InfoMonth = ({ month }) => {
    const { infoMonth, changeMonth } = useApiMonth(month)
    const changePrevisaoEntrada = (evt) => {
        changeMonth({ previsao_entrada: evt.target.value })
    }
    const changePrevisaoSaida = (evt) => {
        changeMonth({ previsao_saida: evt.target.value })
    }

    if (infoMonth.loading) {
        return <Loading />
    }

    if (infoMonth.data) {
        return (
            <div>
                <span>Entrada: {infoMonth.data.entrada}
                 / Saída: {infoMonth.data.saida}
                </span><br />
                <span>
                    Previsão Entrada: {infoMonth.data.previsao_entrada} <input type='text' onBlur={changePrevisaoEntrada} /> /
                    Previsão Saída: {infoMonth.data.previsao_saida}<input type='text' onBlur={changePrevisaoSaida} />
                </span>
            </div>
        )
    }

    return null
}

export default InfoMonth