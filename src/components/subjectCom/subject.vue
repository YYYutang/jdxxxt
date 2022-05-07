<template>
    <div class="subMain">
        <SelectSub v-if="type === 'select'" :getValue="getValue"/>
        <ShortAnsSub v-if="type === 'shortAns'" :getValue="getValue"/>
        <JudgeSub v-if="type === 'judge'" :getValue="getValue"/>
    </div>
</template>

<script>
import ShortAnsSub from './shortAnsSub.vue'
import SelectSub from './selectSub.vue'
import JudgeSub from './judgeSub.vue'
export default {
  components: { SelectSub, ShortAnsSub, JudgeSub },
    name: 'Subject',
    props: {
        type: String,
        getValue: Function
    },
    data() {
        return {
          
        }
    },

    mounted() {
        
    }
}
</script>

<style scoped>
   
</style>