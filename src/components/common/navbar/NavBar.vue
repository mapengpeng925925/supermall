<template>
 <div class="nav-bar">
   <div class="left">
     <slot name="left"></slot>
    </div>
   <div class="center">
     <slot name="center"></slot>
    </div>
   <div class="right">
     <slot name="right"></slot>
    </div>
 </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style scoped>
.nav-bar{
  display: flex;
  /* 设置高度 */
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

.left,.right{
  width: 60px;
  /* background-color: blue; */
}

.center{
  flex: 1;
  /* background-color: aqua; */
  text-align: center;
}


</style>
