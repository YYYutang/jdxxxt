let proxyObj={}
proxyObj['/']={
    ws:false,
    //目标地址
    target:'http://localhost:8081',
    //发送请求头host会被设置成target
    changeOrigin:true,
    pathReWrite:{
        '^/':'/'
    }
}

module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}