import Rest from '../utils/Rest'


export const useApiMonth = (month)=>{
    const infoMonth = useGet(`meses/${month}`)
    const [, changeMonth] = usePatch(`meses/${month}`)
    return{infoMonth,changeMonth}
}

export const useApiTransaction = (month)=>{
    const transactions = useGet(`movimentacoes/${month}`)
    const [, newTransaction] = usePost(`movimentacoes/${month}`)
    const [, removeTransaction] = useRemove()
    return{transactions,newTransaction,removeTransaction}
}

const baseURL = 'https://mymoney-e344c.firebaseio.com/'
const { useGet, usePost, useRemove,usePatch } = Rest(baseURL)