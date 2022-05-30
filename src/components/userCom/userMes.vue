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
        <div style="display: flex;justify-content: space-around;margin-top: 50px;margin-right: 300px;">
          <!-- 1-3 @click="showUpdateAdminInfoView" -->
          <el-button type="primary" size="mini" @click="showUpdateAdminInfoView">修改信息</el-button>
          <!-- 2-1 用户修改密码 @click="showUpdatePasswordView"  -->
          <el-button type="danger" size="mini" @click="showUpdatePasswordView">修改密码</el-button>
        </div>
            <!-- 1-1 编辑用户信息 -->
    <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <table>
          <tr>
            <td>用户昵称：</td>
            <td>
              <!-- 1-5 重新给每项赋值 admin2 -->
              <el-input v-model="user2.name"></el-input>
            </td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>
              <el-input v-model="user2.email"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 2-2 修改密码 -->
    <el-dialog
        title="更新密码"
        :visible.sync="passwordDialogVisible"
        width="30%">
      <div>
        <!-- 2-8 调整修改密码表单 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="请输入旧密码" prop="oldPass">
            <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserMes',
    data() {
          var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
        return {
             user: null,
             user2:null,
              dialogVisible: false, // 1-2 编辑用户信息
               passwordDialogVisible: false, // 2-3 修改密码

      ruleForm: { // 2-6 校验对象 规则
        pass: '',
        checkPass: '',
        oldPass: '', // 2-9
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        oldPass: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
        }
    },

    mounted() {
           this.initUser()
    },
    methods:{
         submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.ruleForm.userId = this.user.id
          this.putRequest('/user/pass', this.ruleForm).then(resp => {
            if (resp) {
              this.postRequest('/logout') 
              window.sessionStorage.removeItem('user')
              window.sessionStorage.removeItem('tokenStr')
              this.$router.replace('/') 

            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 2-7 重围修改密码表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 2-4 修改密码
    showUpdatePasswordView() {
      this.passwordDialogVisible = true
    },
    // 1-9 更新用户
    updateUserInfo() {
      this.putRequest('/user/info', this.user2).then(resp => {
        if (resp) {
          this.dialogVisible = false
          this.initUser()
        }
      })
    },
    // 1-4 编辑用户信息弹框
    showUpdateAdminInfoView() {
      this.dialogVisible = true
    },
    initUser(){
 
      this.getRequest('/user/info').then(resp => {
        if (resp) {
          this.user = resp
          this.user2 = Object.assign({}, this.user) // 1-6 对象拷贝给 admin2
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          this.$store.commit('INIT_ADMIN', resp)
        }
      })
    
    }
    }
}


</script>

<style>

    .user_div {
        width: 60%;
        margin: 50px 0 0 300px;
      
    }
</style>