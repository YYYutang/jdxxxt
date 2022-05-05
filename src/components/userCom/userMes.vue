<template>
    <div class="user_div">
        <div class="userName">
            <p>用户名:   {{user.name}}</p>
        </div>
        <div class="userGrade">
            <p>年级:   {{user.grade}}</p>
        </div>
        <div class="userClasses">
            <p>班级:   {{user.classes}}</p>
        </div>
        <div class="userEmail">
            <p>邮箱:   {{user.email}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserMes',
    data() {
        return {
             user: null,
        }
    },

    mounted() {
         this.getRequest('/user/info').then(resp => {
        if (resp) {
          this.user = resp
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          this.$store.commit('INIT_ADMIN', resp)
        }
      })
    }
}


</script>

<style>

    .user_div {
        width: 60%;
        margin: 0 0 0 30px;
    }
</style>