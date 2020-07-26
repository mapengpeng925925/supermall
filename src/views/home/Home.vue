<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>
   <tab-control class='tab-control'
     :titles="['流行','新款','精选']"
     @tabClick='tabClick'
     ref="tabControl1"
     v-show="isTabFixed"
     />
   <scroll class="goods-wrapper" ref="scroll"
   :probeType='3'
   @scroll='contentScroll' :pullUpLoad='true' @pullingUp='loadMore'>
     <home-swiper :banners='banners' @swiperImageLoad.once='swiperImageLoad'/>
     <recommend-view :recommends='recommends' />
     <feature-view/>
     <tab-control
     :titles="['流行','新款','精选']"
     @tabClick='tabClick'
     ref="tabControl2"
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

import {debounce} from '@/common/debounce'

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
       isShowBackTop:false,
       tabOffsetTop:0,
       isTabFixed:false,
       saveY:0
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
   },
   mounted(){
     const refresh = debounce(this.$refs.scroll.refresh, 100, false)
      this.$bus.$on('ItemImageLoad', () => {
        this.$refs.scroll && refresh()
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

       //完成上拉加载更多
       this.$refs.scroll && this.$refs.scroll.finishPullUp()
     },
     //事件监听相关方法
     tabClick(index){
       const type = Object.keys(this.goods)[index]
       this.type = type
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
     backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
     contentScroll(position){
       //判断bactop是否显示
       this.isShowBackTop = (-position.y) > 1000

       //决定tabcontrol是否吸顶
       this.isTabFixed = (-position.y) > this.tabOffsetTop - 4
     },
     loadMore(){
       this.getHomeGoods(this.type)
     },
     swiperImageLoad(){
       //获取tabcontrol offsetTop
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
     }
   },
   activated(){
     this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
   },
   deactivated(){
     //1、保存y值
     this.saveY = this.$refs.scroll.getScrollY()
   }
 }
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* 浏览器原生滚动实现fixed */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.tab-control{
  /* position: sticky;
  top: 44px;
  z-index: 11; */
  position: relative;
  z-index: 9;
  background-color: #fff;
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
