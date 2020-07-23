<template>
 <div class="recommend">
   <div v-for="item in recommends" :key="item.image" class="recommend-item">
     <a :href="item.link">
       <img :src="item.image" alt="">
       <div>{{item.title}}</div>
     </a>
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
   props:{
     recommends:Array
   },
   components: {

   }
 }
</script>

<style scoped>
.recommend{
  display: flex;
  margin-top: 10px;
  border-bottom: 8px solid #eee;
  padding-bottom: 15px;
}

.recommend-item{
  flex:1;
  text-align: center;
}

.recommend-item img{
  width: 65px;
  margin-bottom: 10px;
}

</style>
