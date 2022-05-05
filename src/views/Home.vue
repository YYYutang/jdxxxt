<template>
  <div>
    <el-container >
  <el-header class="homeHeader">
      <div class="title" @click="returnHome" style="cursor:pointer" >计算机科学导论学习系统</div>
        <div>
         <el-dropdown @command="commandHandler">
      <span class="el-dropdown-link" >
        <el-avatar :src=user.avatar></el-avatar>
        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-circle-plus" command="userinfo">个人信息</el-dropdown-item>
       <el-dropdown-item icon="el-icon-circle-plus" command="setting">设置</el-dropdown-item>
       <el-dropdown-item icon="el-icon-circle-plus" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        </div>
      </el-header>
  <el-main >
        <router-view/>
  </el-main>
</el-container>
    </div>
</template>

<script>

export default {
name: 'Home',
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
    computed: {
    // 从 vuex 获取 routes


    },
    methods: {
    // 注销登录
    commandHandler(command) {
      if (command === 'logout') {
        // 弹框提示用户是否要删除
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          console.log("in")
          this.$axios.post('/logout').then(res =>{
	    console.log('请求成功')
	    console.log(res)
	  }).catch(error =>{
	    console.log('请求失败')
	    console.log(error )
	  })
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('user')
          // 路由替换到登录页面
          // this.$router.replace('/')
          // 清空菜单信息；在src/utils/menus.js 中初始化菜单信息
          //this.$store.commit('initRoutes', [])
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });
      }
      if (command === 'userinfo') {
        this.$router.push('/user')
      }
    },
    returnHome(){
      this.$router.push('/home')
    }
  },
}
</script>

<style>
.homeHeader{
    background:rgba(29, 110, 216, 0.738);
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
}

.homeHeader .title {
  font-size: 25px;
  /*font-family: 微软雅黑;*/
  font-family: 微软雅黑;
  color: white;
   align-items: center;
}


</style>