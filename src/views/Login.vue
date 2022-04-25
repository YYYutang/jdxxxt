<template>
  <div>
    <el-form  element-loading-text="正在登陆..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
     ref="loginForm" 
     :model="loginForm" 
     :rules="rules"  
     class="loginContainer">
        <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="id">
          <el-input type="text" auto-complete="false" v-model="loginForm.id" placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item prop="psw">
          <el-input type="password" auto-complete="false" v-model="loginForm.psw" placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item prop="code">
          <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width:250px;margin-right:5px"></el-input>
            <img :src="captchaUrl" @click="updatecaptcha">
      </el-form-item>
            <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
            <el-button type="primary" style="width:100%" @click="submitlogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {postRequest} from '../utils/api'
export default {
    name:"Login",
    data(){
        return{
            captchaUrl:'/captcha?time='+new Date(),
            loginForm:{
                id:'',
                psw:'',
                code:''
            },
            loading:false,
              checked:true,
              rules:{
                  id:[
                      {required:true,message:'请输入用户名',trigger:'blur'}
                      ],
                  psw:[
                      {required:true,message:'请输入密码',trigger:'blur'}
                      ],
                  code:[
                      {required:true,message:'请输入验证码',trigger:'blur'}
                       ]
              }
        }
    },
    methods:{
        submitlogin(){

            this.$refs.loginForm.validate((valid) => {
          if (valid) {
              this.loading=true;
            postRequest('/login',this.loginForm).then(resp=>{
               if(resp){
                   this.loading=false;
                   const tokenStr =resp.obj.tokenHead+resp.obj.token;
                   window.sessionStorage.setItem('tokenStr',tokenStr);
                   this.$router.replace('/home');
               }
            })
          } else {
          this.$message.error('请输入所有字段');
            return false;
          }
        });

    
        
    //     let params=this.loginForm
    //  let url='http://localhost:8081/login' 
	//   this.$axios.post(url,params).then(res =>{
	//     console.log('请求成功')
	//     console.log(res)
	//   }).catch(error =>{
	//     console.log('请求失败')
	//     console.log(error )
	//   })


        },
        updatecaptcha(){
            this.captchaUrl='/captcha?time='+new Date();
        }
    
    }
}
</script>

<style>
.loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin:180px auto;
    width:350px;
    padding:15px 35px 15px 35px;
    background: white;
    border:1px solid #eaeaee;
    box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
    margin: 0px auto 40px auto;
    text-align: center;
}
.loginRemember{
    text-align: left;
    margin: 0px 0px 15px 0px;
}
.el-form-item__content{
    display:flex;
    align-items:center;
}
</style>  