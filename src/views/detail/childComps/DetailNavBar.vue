<template>
 <div>
   <nav-bar>
     <div slot="left" class="left" @click='backClick'>
       <img src="~assets/images/common/back.svg" alt="">
     </div>
     <div slot="center" class="title">
       <div v-for="(item,index) in titles" :key="index"
       :class="{active:currentIndex == index}"
        @click='itemClick(index)'
       >
         {{item}}
       </div>
     </div>
   </nav-bar>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

 export default {
   name: 'DetailNavBar',
   data () {
     return {
       titles:['商品','参数','评论','推荐'],
       currentIndex:0
     }
   },
   components: {
     NavBar
   },
   methods:{
     itemClick(index){
       this.currentIndex = index
       this.$emit('titleClick',index)
     },
     backClick(){
       //back没记录？？go有
       this.$router.go(-1)
     }
   }
 }
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-evenly;
  font-size: 13px;
}

.active{
  color:var(--color-high-text);
}

.left{
  padding-top: 5px;
  padding-left: 15px;
}
</style>
