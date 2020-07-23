<template>
 <div>
   <swiper>
     <swiper-item v-for="item in banners" :key="item.key">
       <a :href="item.link">
         <img :src="item.image" alt="">
       </a>
     </swiper-item>
   </swiper>
 </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 export default {
   name: '',
   data () {
     return {

     }
   },
   props:{
     banners:Array
   },
   components: {
     SwiperItem,
     Swiper
   }
 }
</script>

<style scoped>


</style>
