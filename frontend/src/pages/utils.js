import {toast} from 'react-toastify';
export const handleSuccess=(msg)=>{
    toast.success(msg, {
        position:'top-right',
        type:'success',
        theme:'colored'
    })
}
export const handleError=(error)=>{
    toast.error(error, {
        position:'top-right',
        type:'error',
        theme:'colored'
    })
}
