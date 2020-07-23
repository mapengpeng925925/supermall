<template>
 <div class="tab-control">
   <div v-for="(item,index) in titles" :key="item"
   class="tab-control-item"
   :class="{active:index === currentIndex}"
   @click="itemClick(index)"
   >
     <span>{{item}}</span>
   </div>
 </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {
       currentIndex:0
     }
   },
   props:{
     titles:Array
   },
   components: {

   },
   methods:{
     itemClick(index){
       this.currentIndex = index
       this.$emit('tabClick',index)
     }
   }
 }
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  /* justify-content: space-around; */
}

.tab-control-item{
  line-height: 40px;
  font-size: 15px;
  flex: 1;
}

.active span{
  border-bottom: 2px solid var(--color-high-text);
  padding: 5px;
}

.active{
  color: var(--color-high-text);
}
</style>
