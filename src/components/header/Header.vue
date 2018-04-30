<template>
  <!-- 头部 -->
  <div class='header'>
    <!-- 背景 -->
    <div class='bg'>
      <img :src="seller.avatar" alt="" width='100%' height='100%'>
    </div>
    <!-- 内容 -->
    <div class='content-warp clearfix'>
      <!-- logo -->
  		<div class="avatar">
  			<img :src="seller.avatar" alt="" width='64' height='64'>
  		</div>
      <!-- 信息 -->
  		<div class="container">
        <!-- 商家名 -->
  			<div class="title">
  				<i class='brand'></i>
  				<span class='name' v-text='seller.name'></span>
  			</div>
        <!-- 快递信息 -->
  			<div class="description">
  				{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
        <!-- 优惠 -->
  			<div class="support" v-if='seller.supports'>
  				<i class='icon' :class='classMap[seller.supports[0].type]'></i>
  				<span v-text='seller.supports[0].description'></span>
  			</div>
  		</div>
      <!-- 弹层按钮 -->
      <div class="support-count" v-if='seller.supports' @click='showDetail($event)'>
        <span class='count' >{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
  	</div>
    <!-- 公告 -->
    <div class='notice' @click='showDetail'>
      <span class="notice-title"></span>
      <span class="notice-text" v-text='seller.bulletin'></span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 弹层 -->
    <transition  name="fade">
      <div class="detail" v-show='detailShow'>
         <div class="detail-warp">
           <div class="detail-main">
            <!-- 店名 -->
            <h1 class="name" v-text='seller.name'></h1>
            <!-- 评分 -->
            <div class="star-warp">
              <v-star :size='48' :score='seller.score'></v-star>
            </div>
            <div class="title">
              <p class='line'></p>
              <p class='text'>优惠信息</p>
              <p class='line'></p>
            </div>
            <div class="support-warp">
              <v-supports :seller='seller'></v-supports>
            </div>
            <div class="title">
              <p class='line'></p>
              <p class='text'>商家公告</p>
              <p class='line'></p>
            </div>
            <div class="bulletin">
              <p class="content" v-text='seller.bulletin'></p>
            </div>
           </div>
         </div>
         <!-- 关闭弹层按钮 -->
         <div class="detail-close" @click="detailShow = !detailShow">
           <i class="icon-close"></i>
         </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Star from '@/components/star/star.vue'
  import Supports from '@/components/supports/supports.vue'
  export default{
    props:{
      seller: {
        type: Object
      }
    },
  	data: function () {
  		return {
        classMap: [],
        detailShow: false
  		}
  	},
  	created: function () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  	},
    methods: {
      showDetail: function (event) {
        this.detailShow = true;
      }
    },
    components: {
      "v-star": Star,
      'v-supports': Supports
    }
  }
</script>
<style scoped>
  .header{
    position: relative;
	  color: #fff;
    overflow: hidden;
	  background: rgba(7, 17, 27, 0.5);
  }
  .header .bg{
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .content-warp{
    position: relative;
	  padding: 24px 12px 18px 24px;
  }
  .content-warp > div{
  	float: left;
  }
  .avatar img{
  	vertical-align: top;
	border-radius: 5px;
  }
  .container{
	margin-left: 16px;
  }
  .container .title{
    margin-top: 2px;
    margin-bottom: 6px;
  }
  .container .title .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: top;
    background: url("brand@3x.png") left top/30px 18px no-repeat;
  }
  .container .title .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
  }
  .container .description{
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
  }
  .container .support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    vertical-align: middle;
    background: left top/12px 12px no-repeat;
  }
  .container .support .icon.decrease{
    background-image: url('decrease_2@3x.png');
  }
  .container .support .icon.discount{
    background-image: url('discount_1@3x.png');
  }
  .container .support .icon.special{
    background-image: url('special_1@3x.png');
  }
  .container .support .icon.invoice{
    background-image: url('invoice_1@3x.png');
  }
  .container .support .icon.guarantee{
    background-image: url('guarantee_1@3x.png');
  }
  .container .support span{
    font-size: 10px;
  }
  .support-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .support-count .count{
    font-size: 10px;
    vertical-align: middle;
  }
  .support-count .icon-keyboard_arrow_right{
    padding-top: 2px;
    line-height: 24px;
    font-size: 10px;
    vertical-align: middle;
  }
  .detail-main .support-warp{
    width: 80%;
    margin: 0 auto;
  }
  .notice{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
  }
   .notice .notice-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    vertical-align: middle;
    background: url("bulletin@3x.png") left top/22px 12px no-repeat;
  }
  .notice .notice-text{
    margin: 0 4px;
    font-size: 10px;
  } 
  .notice i{
    position: absolute;
    right: 12px;
    bottom: 7px;
    font-size: 10px;
  }
  
  .header .detail{
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: 0.2s;
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.8);
  }
  .fade-enter{
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
  }
  .fade-enter-active,.fade-leave-active{
    opacity: 0;
    background-color: rgba(7, 17, 27, 0.8);
  }
  .detail .detail-warp{
    min-height: 100%;
  }
  .detail .detail-warp .detail-main{
    padding-top: 64px;
    padding-bottom: 74px;
  }
  .detail-main .star-warp{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .detail .detail-warp .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .detail .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 32px;
    margin: -64px auto 0 auto;
  }
  .detail-main .title{
    display: flex;
    width: 80%;
    margin: 30px auto 24px auto
  }
  .detail-main .title .line{
    flex: 1;
    position: relative;
    top: 6px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  .detail-main .title .text{
    padding: 0 12px;
    font-size: 14px;
  }
  .detail-main .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .detail-main .bulletin .content{
    padding: 0 12px;
    font-size: 12px;
    line-height: 24px;
  }
</style>