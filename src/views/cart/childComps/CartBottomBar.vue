<template>
 <div class="bottom-bar">
   <div class="content">
     <check-button @click.native='btnClick'
     :isChecked='isSelectAll' class="check-button"/>
     <span>全选</span>
   </div>

   <div class="total">
     合计：{{totalPrice}}
   </div>

   <div class="calculate">
     去计算：{{checkLength}}
   </div>
 </div>
</template>

<script>
import CheckButton from './CheckButton'
import {floatAdd} from 'common/utils'
 export default {
   name: '',
   data () {
     return {

     }
   },
   components: {
     CheckButton
   },
   computed:{
     totalPrice(){
       return '￥' + this.$store.state.cartList.filter(item => item.checked).reduce((pre,cur) => {
         return floatAdd(pre,cur.price*cur.count)
       },0)
     },
     checkLength(){
       return this.$store.state.cartList.filter(item => item.checked).reduce((pre,cur) => {
         return pre + cur.count
       },0)
     },
     isSelectAll(){
       if(this.$store.state.cartList.length === 0) return false
       return this.$store.state.cartList.every(item => item.checked)
     }
   },
   methods:{
     btnClick(){
       if(this.isSelectAll){ //全部选中
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        })
        }else{
          this.$store.state.cartList.forEach(item => {
            item.checked = true
          })
       }
     }
   }
 }
</script>

<style scoped>
.bottom-bar{
  position: relative;
  height: 40px;
  background-color: #eee;
  bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content{
  display: flex;
  /* line-height: 40px; */
  /* justify-content: center; */
  align-items: center;
  line-height: 40px;
  margin-left: 10px;
  /* margin-right: 20px; */
}
.check-button{
  height: 20px;
  width: 20px;
  line-height: 20px;
  /* margin-top: 10px; */
  margin-right: 5px;
}

.calculate{
  height: 100%;
  background-color: red;
  line-height: 40px;
}

</style>
