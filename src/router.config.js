
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
import Detail from '@/components/details/Details'



export default {
  routes: [
    {
      path: '/',
      name: 'goods',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      children: [
        {
          path: '/detail',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
}
