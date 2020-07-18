import {useReducer,useEffect} from 'react'
import axios from 'axios'

//const baseURL = 'https://mymoney-e344c.firebaseio.com/'

const reducer = (status,action)=>{
    if(action.type==='SUCCESS')
      return{
        ...status,
        loading:false,
        data:action.data
      }
    
    return status
  }

  const Rest = baseURL =>{

    const useGet = resource =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:true,
            data:{}
        })

        useEffect(()=>{
            axios.get(baseURL+resource+'.json')
            .then(res=>{
            dispatch({
                type:'SUCCESS',
                data:res.data
            })
            })
        })

        return data
    }

    const usePost = resource =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:false,
            data:{}
          })
    
        const post = (data) =>{
            axios.post(baseURL+resource+'.json',data)
            .then(res =>{
                dispatch({type:'SUCCESS',data:res.data})
            })
        }
    
        return [data,post]
    }

    const useRemove = () =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:false,
            data:{}
          })
    
        const remove = (resource) =>{
            axios.delete(baseURL+resource+'.json')
            .then( () =>{
                dispatch({type:'SUCCESS'})
            })
        }
        return [data,remove]
    }


    return{
        useGet,
        usePost,
        useRemove
    }
}

export default Rest