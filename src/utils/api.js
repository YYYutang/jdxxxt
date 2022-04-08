import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
axios.interceptors.response.use(success=>{
    if(success.status&&success.status==200){
        if(success.data.code==500||success.data.code==403){
            Message.error({message: success.data.message});
            return;
        }
        if(success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data;
},error=>{
    if(error.response.code==504||error.response.code==404){
        Message.error({message:'找不到服务器了'});
    }
    else if(error.response.code==403){
        Message.error({message:'权限不足，请联系管理员'});
    }
    else if(error.response.code==401){
        Message.error({message:'尚未登陆，请登录'});
        router.replace('/');
    }
    else{
        if(error.response.data.message){
            Message.error({message:error.response.data.message});
        }else{
            Message.error({message:'未知错误'})
        }
    }
    return;
})
let base ='';
export const postRequest=(url,params )=>{
    return axios({
        method:'post',
        url:'${base}${url}',
        data:params
    })
}