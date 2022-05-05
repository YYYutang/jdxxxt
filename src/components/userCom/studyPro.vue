
<template>
    <div class="main_div1">
        <div class="study">
            <p>目前学习进度</p>
            <el-progress :percentage="learned/all*100"></el-progress>
        </div>
        <div class="test">
            <div>
                <p>已完成考试</p>
            </div>
            <div>
                <p>未完成考试</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StudyPro',

    data() {
        return {
                user:JSON.parse(window.sessionStorage.getItem('user')),
                learned:0,
                all:30
        }
    },
    mounted(){
        this.initlearned()
    },
    methods:{
        initlearned(){
    
            console.log("id"+this.user.id)
            
        this.postRequest('/getuserlearncount',this.user.id).then(resp=>{
            console.log("resp"+resp)
            this.learned=resp;
        })
          console.log("learned"+this.learned)
        }
    }
}
</script>

<style scoped>

    .main_div1 {
        width: 100%;
    }
    .study {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 20px 0 0 20px;
        font-weight: bold;
    }

    .el-progress {
        width: 60%;
        margin-left: 60px;
    }

    .test {
        margin-left: 20px;
    }
</style>