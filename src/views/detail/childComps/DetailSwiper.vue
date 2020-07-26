<template>
 <div class="detail-swiper">
   <swiper class="swiper-wrapper">
     <swiper-item v-for="item in topImages" :key="item">
       <img :src="item" alt="">
     </swiper-item>
   </swiper>
 </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

 export default {
   name: 'DetailSwiper',
   data () {
     return {

     }
   },
   props:{
     topImages:Array
   },
   components: {
     Swiper,
     SwiperItem
   }
 }
</script>

<style scoped>
.swiper-wrapper{
  height: 300px;
  overflow: hidden;
}

</style>
