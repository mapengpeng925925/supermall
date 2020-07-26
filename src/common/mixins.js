import { debounce } from '@/common/debounce'

//监听图片加载事件
export const itemListenerMixin = {
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 100, false)
    this.$bus.$on('ItemImageLoad', () => {
    this.$refs.scroll && refresh()
  }),
  console.log('mixins')
  }
}
