import { useReducer, useEffect } from 'react'
import axios from 'axios'

axios.defaults.validateStatus = code => code < 500


const reducer = (status, action) => {

    switch (action.type) {
        case ('SUCCESS'):
            return {
                ...status,
                loading: false,
                data: action.data
            }
        case ('FAILURE'):
            return {
                ...status,
                loading: true,
                error: action.error,
                code: action.code
            }
        default:
            return status
    }
}

const INICIAL_STATE = {
    loading: true,
    data: {},
    error: ''
}

const getAuth = () => {
    const token = localStorage.getItem('token')
    if(token){return '?auth=' + token}
    return ''
}

const Rest = baseURL => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INICIAL_STATE)

        const loading = async () => {
            try {
                const res = await axios.get(baseURL + resource + '.json' + getAuth())
                if (res.data.error && Object.keys(res.data.error).length > 0) {
                    dispatch({
                        type: 'FAILURE',
                        error: res.data.error,
                    })
                }
                else {
                    dispatch({
                        type: 'SUCCESS',
                        data: res.data
                    })
                }
            } catch (error) {
                dispatch({
                    type: 'FAILURE',
                    error: 'Unknow'
                })
            }
        }

        useEffect(() => {
            loading()
        }, [resource])

        return {
            ...data,
            refetch: loading
        }
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, INICIAL_STATE)

        const post = async (data) => {
            const res = await axios.post(baseURL + resource + '.json'+ getAuth(), data)
            dispatch({ type: 'SUCCESS', data: res.data })
        }

        return [data, post]
    }

    const useRemove = () => {
        const [data, dispatch] = useReducer(reducer, INICIAL_STATE)

        const remove = async (resource) => {
            await axios.delete(baseURL + resource + '.json'+ getAuth())
            dispatch({ type: 'SUCCESS' })

        }
        return [data, remove]
    }

    const usePatch = (resource) => {
        const [data, dispatch] = useReducer(reducer, INICIAL_STATE)

        const patch = async (data) => {
            await axios.patch(baseURL + resource + '.json', data)
            dispatch({ type: 'SUCCESS' })

        }
        return [data, patch]
    }


    return {
        useGet,
        usePost,
        useRemove,
        usePatch
    }
}

export const usePostLogin = resource => {
    const [data, dispatch] = useReducer(reducer, INICIAL_STATE)

    const post = async (data) => {
        try {
            const res = await axios.post(resource, data)
            if (res.data.error && Object.keys(res.data.error).length > 0) {
                dispatch({
                    type: 'FAILURE',
                    error: res.data.error.message
                })
            }
            else {
                dispatch({
                    type: 'SUCCESS',
                    data: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: 'FAILURE',
                error: 'Unknow error'
            })
        }
    }

    return [data, post]
}

export default Rest