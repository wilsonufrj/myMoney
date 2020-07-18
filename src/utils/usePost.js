
import {useReducer} from 'react'
import Axios from 'axios'

const reducer = (status,action)=>{
    if(action.type==='SUCCESS')
      return{
        ...status,
        loading:false,
        data:action.data
      }
    
    return status
  }


const UsePost =(URL)=>{
    const [data,dispatch] = useReducer(reducer,{
        loading:false,
        data:{}
      })

    const post = (data) =>{
        Axios.post(URL,data)
        .then(res =>{
            dispatch({type:'SUCCESS',data:res.data})
        })
    }

    return [data,post]
}

export default UsePost