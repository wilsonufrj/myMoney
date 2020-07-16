import {useEffect,useReducer} from 'react'
import axios from 'axios'

const reducer = (status,action)=>{
    if(action.type==='SUCCESS')
      return{
        ...status,
        loading:false,
        data:action.data
      }
    
    return status
  }

const DataGet = url =>{
    const [data,dispatch] = useReducer(reducer,{
        loading:true,
        data:{}
      })

      useEffect(()=>{
        axios.get(url)
        .then(res=>{
          dispatch({
            type:'SUCCESS',
            data:res.data
          })
        })
      })

      return data
}

export default DataGet