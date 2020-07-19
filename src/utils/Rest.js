import {useReducer,useEffect} from 'react'
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

  const Rest = baseURL =>{

    const useGet = resource =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:true,
            data:{}
        })

        const loading = async()=>{
            const res = await axios.get(baseURL+resource+'.json')
            dispatch({
                type:'SUCCESS',
                data:res.data
            })
        }

        useEffect(()=>{
           loading() 
        },[resource])

        return{
            ...data,
            refetch: loading
        }
    }

    const usePost = resource =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:false,
            data:{}
          })
    
        const post = async (data) =>{
           const res = await axios.post(baseURL+resource+'.json',data)
           dispatch({type:'SUCCESS',data:res.data})
        }
    
        return [data,post]
    }

    const useRemove = () =>{
        const [data,dispatch] = useReducer(reducer,{
            loading:false,
            data:{}
          })
    
        const remove = async (resource) =>{
            await axios.delete(baseURL+resource+'.json')
            dispatch({type:'SUCCESS'})
            
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