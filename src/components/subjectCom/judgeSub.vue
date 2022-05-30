<template>
  <div class="subDiv">
        <div class="sub_header">小节题目</div>
      <el-form ref="form" :model="form">
 <el-form-item label="题目">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="答案">
      <el-select v-model="form.answer" placeholder="请选择" @blur="onFinish">
          <el-option
      v-for="item in selectList"
      :key="item.label"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
  </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
    name: 'JudgeSub',
    props: {
        getValue: Function
    },
    data() {
        return {
            form: {
             name: '',
             answer: '',
             type: 'judge'
            },
            selectList: [
                {
                    label: '正确',
                    value: true,
                },
                {
                    label: '错误',
                    value: false,
                }
            ]
        }
    },
     methods: {
        onFinish() {
            this.getValue(this.form)
        }
    }
}
</script>

<style scoped>
.subDiv {
    width: 400px;
    border-radius: 10px;
    background-color: #dfe4ea;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
}
.sub_header {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}
.el-form {
    width: 300px;
}
</style>