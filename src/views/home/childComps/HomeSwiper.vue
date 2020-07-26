<template>
 <div>
   <swiper>
     <swiper-item v-for="item in banners" :key="item.key">
       <a :href="item.link">
         <img :src="item.image" alt="" @load='swiperImgLoad'>
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
   },
   methods:{
     swiperImgLoad(){
       this.$emit('swiperImageLoad')
     }
   }
 }
</script>

<style scoped>


</style>
