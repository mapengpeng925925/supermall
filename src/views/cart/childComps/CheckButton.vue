<template>
 <div class="check-button" :class="{check:isChecked}" @click='btnClick'>
   <img src="~assets/images/cart/tick.svg" alt="">
 </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {
     }
   },
   props:{
     isChecked:Boolean
   },
   methods:{
     btnClick(){
       if(this.$parent.itemInfo){
         const checked = this.$parent.itemInfo.checked
         this.$parent.itemInfo.checked = !checked
       }
     }
   }
 }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check{
  background-color: red;
  border-radius: 50%;
  border-color: red;
}

</style>
