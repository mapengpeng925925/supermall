<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
   <scroll class="goods-wrapper" ref="scroll"
   :probeType='3'
   @scroll='contentScroll' :pullUpLoad='true' >
     <home-swiper :banners='banners' />
     <recommend-view :recommends='recommends' />
     <feature-view/>
     <tab-control class='tab-control'
     :titles="['流行','新款','精选']"
     @tabClick='tabClick'
     />
    <goods-list :goods="goods[type].list" />
   </scroll>
   <back-top @click.native='backClick' v-show="isShowBackTop"/>
 </div>
</template>

<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/contents/tabcontrol/TabControl'
import GoodsList from 'components/contents/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/contents/backtop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

 export default {
   name: '',
   data () {
     return {
       banners: [],
       recommends: [],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
       type:'pop',
       isShowBackTop:false
     }
   },
   components: {
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodsList,
     Scroll,
     BackTop
   },
   created(){
    //  请求多个数据
      this.getHomeMultidata()
     //console.log(this.result) 不能验证 因为上面的是异步操作
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      //监听图片加载事件
      this.$bus.$on('ItemImageLoad',() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
   },
   methods:{
     //网络请求相关方法
     getHomeMultidata(){
       getHomeMultidata().then(res => {
       console.log(res)
       this.banners = res.data.data.banner.list
       this.recommends = res.data.data.recommend.list
     })
     },
     getHomeGoods(type){
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res => {
         this.goods[type].list.push(...res.data.data.list)
         this.goods[type].page += 1
       })
     },
     //事件监听相关方法
     tabClick(index){
       const type = Object.keys(this.goods)[index]
       this.type = type
     },
     backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
     contentScroll(position){
       this.isShowBackTop = (-position.y) > 1000
     },
   }
 }
</script>

<style scoped>
#home{
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 11;
}

.goods-wrapper{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

</style>
