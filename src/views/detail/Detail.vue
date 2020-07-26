<template>
 <div id="detail">
   <detail-nav-bar @titleClick='titleClick' class="detail-nav" ref="nav"/>
   <scroll class="content" ref="scroll" @scroll='contentScroll' :probeType='3'>
     <detail-swiper :topImages='topImages'></detail-swiper>
     <detail-base-info :goods='goods'></detail-base-info>
     <detail-shop-info :shop='shop' />
     <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
     <detail-param-info ref="params" :param-info='paramInfo'/>
     <detail-comment-info ref="comment" :comment-info='commentInfo'/>
     <goods-list ref="recommend" :goods='recommends'/>
   </scroll>
   <back-top @click.native='backtop' v-if="isShowBackTop"/>
   <detail-bottom-bar @addToCart='addToCart'/>
   <toast :message='message' :show='show'/>
 </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/contents/backtop/BackTop'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/contents/goods/GoodsList'
import Toast from 'components/common/toast/Toast'
import { debounce } from '@/common/debounce'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin} from 'common/mixins'

 export default {
   name: 'Detail',
   data () {
     return {
       iid:null,
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{},
       recommends:[],
       themeTopYs:[],
       getThemeTopY:null,
       currentIndex:0,
       isShowBackTop:false,
       message:'',
       show:false
     }
   },
   mixins:[itemListenerMixin],
   components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     Scroll,
     DetailShopInfo,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo,
     DetailBottomBar,
     GoodsList,
     Toast,
     BackTop
   },
   created(){
     //保存传入的id
     this.iid = this.$route.params.iid
     console.log(this.iid)

     //根据iid请求详情数据
     getDetail(this.iid).then(res => {
       const data = res.data.result
       console.log(data)
       //1、获取顶部图片
       this.topImages = data.itemInfo.topImages

       //2、获取商品信息
       this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

       //3、获取店铺信息
       this.shop = new Shop(data.shopInfo)

       //4、获取商品详情信息
       this.detailInfo = data.detailInfo

       //5、保存参数信息
       this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

       //6、获取评论信息
       if(data.rate.cRate !== 0){
         this.commentInfo = data.rate.list[0]
       }

       //7、请求推荐数据
       getRecommend().then(res=>{
         this.recommends = res.data.data.list
         console.log(this.recommends)
       })
       //第一次获取值不对
       //原因：this.$refs.params.$el压根没渲染
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44)
          this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
          this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
          console.log(this.themeTopYs)

       this.$nextTick(() => {
         //虽然拿到数据 且渲染完dom但是图片不一定加载完
         //目前获取的offsetTop不包含其中的图片的
         //offsetTop一般值不对 都是因为图片的问题
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44)
          this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
          this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
          console.log(this.themeTopYs)
       })
     })
   },
   mounted(){
     this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44)
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44)
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44)
      console.log(this.themeTopYs)
     },100)
   },
   methods:{
     imageLoad(){
       console.log('------')
       this.$refs.scroll.refresh()
       this.getThemeTopY()
     },
     titleClick(index){
      //  console.log(index)
      this.$refs.scroll.scrollTo(0,this.themeTopYs[index],200)
     },
     contentScroll(position){
       //也可以直接在数组最后放一个大值 然后for循环判断
       const y = -position.y
       if(-this.themeTopYs[0] < y && y < -this.themeTopYs[1]){
         this.currentIndex = 0
       }else if(-this.themeTopYs[1] < y && y < -this.themeTopYs[2]){
         this.currentIndex = 1
       }else if(-this.themeTopYs[2] < y && y < -this.themeTopYs[3]){
         this.currentIndex = 2
       }else{
         this.currentIndex = 3
       }
       this.$refs.nav.currentIndex = this.currentIndex
      //  console.log(this.currentIndex)
      // console.log(y)
       this.isShowBackTop = y > 1000
     },
     backtop(){
      console.log(this.$refs.scroll)
      this.$refs.scroll.scrollTo(0,0,500)
     },
     addToCart(){
       //1、获取商品信息 （购物车需要展示的信息）
       const product = {}
       product.image = this.topImages[0]
       product.title = this.goods.title
       product.desc = this.goods.desc
       product.price = this.goods.realPrice
       product.iid = this.iid

       //2、将商品添加到购物车
       //切记直接修改state  到mutations中使用方法修改
       //  this.$store.cartList.push(product)
      //  this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{
        this.show = true
        this.message = res
        setTimeout(()=>{
          this.show = false
          this.message = ''
        },1500)
      })

      //3、添加购物车成功

     }
   }
 }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 12;
  /* padding-bottom: 50px; */
  background-color: #fff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 15;
  background-color: #fff;
}

.content{
  height: calc(100% - 44px);
}

</style>
