
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


const UseRemove =()=>{
    const [data,dispatch] = useReducer(reducer,{
        loading:false,
        data:{}
      })

    const remove = (url) =>{
        Axios.delete(url)
        .then( () =>{
            dispatch({type:'SUCCESS'})
        })
    }

    return [data,remove]
}

export default UseRemove