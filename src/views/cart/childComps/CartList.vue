<template>
 <div class="cart-list">
      <cart-list-item v-for="(item,index) in cartList"
      :key="index" :item-info='item'/>
 </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'

 export default {
   name: '',
   data () {
     return {

     }
   },
   components: {
     CartListItem
   },
   computed:{
     ...mapGetters([
       'cartList'
     ])
   }
 }
</script>

<style scoped>
.cart-list{
  height: 100%;
}
.content{
  height: calc(100% - 44px - 49px);
}

</style>
