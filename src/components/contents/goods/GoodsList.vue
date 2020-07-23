<template>
 <div class="goods">
   <goods-list-item
    v-for="item in goods"
    :key="item.link"
    :goodsItem='item'
   />
 </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
 export default {
   name: '',
   data () {
     return {

     }
   },
   props:{
     goods:Array
   },
   components: {
     GoodsListItem
   }
 }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
