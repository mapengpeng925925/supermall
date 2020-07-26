<template>
 <div class="toast" v-show="show">
   <div>{{message}}</div>
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
     message:String,
     show:{
       type:Boolean,
       default:false
     }
   },
   components: {

   }
 }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  background-color: rgba(0,0,0,.7);
  transform: translate(-50%,-50%);
  padding: 5px 8px;
}

</style>
