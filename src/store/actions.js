export default {
  addCart(context,payload){
    //payload新添加的商品
    let oldProduct = null

    //判断商品列表含不含重复的商品
    oldProduct = context.state.cartList.find((item) => item.iid === payload.iid)

    if(oldProduct){
      // oldProduct.count += 1
      context.commit('addCounter',oldProduct)
      return '当前商品+1'
    }else{
      payload.count = 1
      context.commit('addToCart',payload)
      return '添加购物车成功'
    }
  }
}