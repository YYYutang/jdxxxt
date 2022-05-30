<template>
   <div class="subDiv">
        <div class="sub_header">小节题目</div>
      <el-form ref="form" :model="form">
 <el-form-item label="题目">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="A选项">
      <el-input v-model="form.Ainput"></el-input>
  </el-form-item>
  <el-form-item label="B选项">
      <el-input v-model="form.Binput"></el-input>
  </el-form-item>
  <el-form-item label="C选项">
      <el-input v-model="form.Cinput"></el-input>
  </el-form-item>
  <el-form-item label="D选项">
      <el-input v-model="form.Dinput"></el-input>
  </el-form-item>
  <el-form-item label="答案">
       <el-select v-model="form.answer" placeholder="请选择" @blur="onFinish">
          <el-option
      v-for="item in selectList"
      :key="item.label"
      :label="item.label"
      :value="item.label">
    </el-option>
      </el-select>
  </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
    name: 'SelectSub',
    props: {
        getValue: Function
    },
    data() {
        return {
            form: {
                name: '',
                Ainput: '',
                Binput: '',
                Cinput: '',
                Dinput: '',
                answer: '',
                type: 'select'
            },
            selectList: [
                {
                    label: 'A',
                },
                {
                    label: 'B',
                },
                {
                    label: 'C',
                },
                {
                    label: 'D',
                },
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
.el-form-item:nth-child(2) {
    margin-left: -10px;
}
.el-form-item:nth-child(3) {
    margin-left: -10px;
}
.el-form-item:nth-child(4) {
    margin-left: -10px;
}
.el-form-item:nth-child(5) {
    margin-left: -10px;
}
.el-form {
    width: 300px;
}
</style>