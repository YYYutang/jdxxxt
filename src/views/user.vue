<template>
  <div class="main_div">
      <div class="user_header">
          <div class="header_avator">
               <el-avatar :size="60"  :src=user.avatar ></el-avatar>
          </div>
      </div>
      <div class="user_operate">
          <div class="operate" v-on:click="studyClick" v-bind:class = "{operateActive:currentIndex===1}">
              <p>学习进度</p>
          </div>
          <div class="operate" v-on:click="infoClick" v-bind:class = "{operateActive:currentIndex===2}">
              <p>个人信息</p>
          </div>
      </div>
      <div class="user_content">
          <study-pro  v-if="currentIndex === 1" :progress="progress"/>
          <user-mes v-if="currentIndex === 2"/>
      </div>
  </div>
</template>

<script>
import studyPro from '../components/userCom/studyPro.vue'
import UserMes from '../components/userCom/userMes.vue'
export default {
  components: { studyPro, UserMes },
    name: "User",
    data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      progress: 50,
      currentIndex: 1, // 当前展示， 1表示学习进度 2表示个人信息
    }
  },

  methods: {
      studyClick(){
          this.currentIndex = 1
      },

        infoClick() {
            this.currentIndex = 2;
        }
  }
    
}
</script>

<style scoped>
.main_div {
    width: 70%;
    margin: 0 auto;
    min-width: 900px;
}

.user_header {
    width: 100%;
    height: 300px;
    background-image: url('../assets/userHeader.jpg');
    background-size: cover;
    position: relative;
}

.header_avator {
   position: absolute;
   bottom: -30px;
   left: 50%;
   transform: translate(-50%);
}

.user_operate {
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
}

.operate {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    position: relative;
}

.operate:hover {
    color : #0984e3;
    cursor: pointer;
    /* border-bottom: 2px solid #0984e3; */
}

.operateActive {
    color: #0984e3;
}

.operateActive::after {
    content:'';
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 30px;
    border-bottom: 2px solid #0984e3;
}

.operate:hover:after {
    content:'';
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 30px;
    border-bottom: 2px solid #0984e3;
}



.user_content {
    width: 100%;
    margin-top: 20px;
    height: 500px;
    background-color: #fff;
    padding-top: 20px;
}
</style>