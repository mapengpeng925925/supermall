<template>
 <div class="cart">
   <!-- 导航 -->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>

   <!-- 商品列表 -->
   <scroll class="content">
       <cart-list/>
   </scroll>

   <!-- 底部汇总 -->
   <cart-bottom-bar/>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'
 export default {
   name: '',
   data () {
     return {

     }
   },
   components: {
     NavBar,
     CartList,
     CartBottomBar,
     Scroll
   },
   computed:{
     //mapgetters仅仅是将store中的getter映射到局部计算属性
     ...mapGetters([
       'cartLength'
     ])
   }
 }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}


.content{
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
