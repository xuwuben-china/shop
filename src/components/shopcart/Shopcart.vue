<template>
	<div class="shopdetails">
		<transition name='shade'>
			<div class="shade" v-show='listShow' @click='foldShow'></div>
		</transition>
		<div class="shopcart">
			<div class="content">
				<ul class="content-left clearfix"   @click='foldShow'>
					<li class="logo-warp" :class="{'highling':totalCount>0}">
						<i class="icon icon-shopping_cart"></i>
						<i class='num' v-text='totalCount' v-show='totalCount>0'></i>
					</li>
					<li class="price" :class="{'highling':totalPrice>0}">￥{{totalPrice}}</li>
					<li class="desc">另需配送费￥{{seller.deliveryPrice}}元</li>
				</ul>
				<div class="content-right" :class='payClass'>
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition name='fold'>
			<div class="shopcart-list" v-show='listShow' >
				<div class="list-head clearfix">
					<h1 class='title'> 购物车</h1>
					<span class='empty' @click='empty'>清空</span>
				</div>
				<div class='list-content' ref='listConent'>
					<ul>
						<li class="list-item" v-for='(food,index) in selectFoods'>
							<span class="name" v-text='food.name'></span>
							<span class="price">￥{{food.price*food.count}}</span>
							<div class='cartcontrol-warp'>
								<v-cartcontrol :food='food' :key='index' :event-hub='eventHub'></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<div class="ball-warp">
			<transition name='drop' @before-enter='beforeEnter'  @after-enter='afterEnter'  @enter='enter' v-for='(ball,index) in balls'>
				<div class="ball" v-show='ball.show'>
					<div class="inner"></div>
				</div>
			</transition>
		</div>
	</div>

</template>
<script>
	import BScroll from 'better-scroll'
	import Cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	export default{
		props: {
			selectFoods: {
				type: Array,
				default(){
					return 
						[];
				}
			},
			seller: {
				type: Object
			},
			eventHub: {
				type: Object
			}
		},
		components:{
			'v-cartcontrol': Cartcontrol
		},
		data: function () {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls: [],
				fold: true
			}
		},
		methods:{
			foldShow(){
				if(this.totalCount>0){
					this.fold = !this.fold;
				}
			},
			empty(){
				this.selectFoods.forEach((food)=>{
					food.count = 0;
				})
			},
			drop(el){
				for(let i=0; i<this.balls.length; i++){
					let ball = this.balls[i];
					console.log(i)
					if(!ball.show){
						ball.show = true;
						ball.el = el
						this.dropBalls.push(ball);
						return;
					}
				}

			},
			beforeEnter(el){
				let count = this.balls.length;
				while(count--){
					let ball = this.balls[count];
					if(ball.show){
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						el.style.webkitTransform = "translate3d(0,"+y+"px,0)";
						el.style.transform = "translate3d(0,"+y+"px,0)";
						let inner = el.getElementsByClassName('inner')[0];
						inner.style.webkitTransform = "translate3d("+x+"px,0,0)";
						inner.style.transform = "translate3d("+x+"px,0,0)";
					}
				}
			},
			enter(el, done){
				let rf = el.offsetHeight;
				this.$nextTick(()=>{
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
				});
				done()
				
			},
			afterEnter(el){
				let ball = this.dropBalls.shift();
				if(ball){
					setTimeout(function(){
						ball.show = false;
						el.style.display = 'none'
					},500)
				}
			}
		},
		computed: {
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food)=>{
					total += food.price * food.count;
				})
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count += food.count;
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return `￥${this.seller.minPrice}元起送`;
				}else if(this.totalPrice<this.seller.minPrice){
					let diff = this.seller.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`
				}else{
					return '去结算';
				}
			},
			payClass(){
				if(this.totalPrice >= this.seller.minPrice){
					return 'enough';
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false
				}else{
					if(!this.fold){
						this.$nextTick(()=>{
							if(!this.scroll){
								this.scroll = new BScroll(this.$refs.listConent,{
										click: true
									})
							}else{
								this.scroll.refresh();
							}
						})
					}
					return !this.fold;
				}
			}
		}
	}
</script>
<style>
	.shopdetails{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 46px;
	}
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 46px;
		background-color: #000;
	}

	.shopcart .content{
		display: flex;
		height: 100%;
		background-color: #141d27;
	}
	.shopcart .content-left{
		flex: 1;
	}
	.shopcart .content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.shopcart .content-left li{
		float: left;
		color: rgba(225, 225, 225, 0.4);
	}
	.shopcart .content-left .logo-warp{
		position: relative;
		top: -10px;
		left: 0;
		width: 44px;
		height: 44px;
		margin: 0 10px;
		border: 6px solid #141d27;
		border-radius: 50%;
		background-color: #141d27;
	}
	.shopcart .content-left .logo-warp.highling{
		background-color: rgb(0, 160, 220);
	}
	.content-left .logo-warp .icon{
		display: block;
		width: 44px;
		height: 44px;
		font-size: 24px;
		border-radius: 50%;
		text-align: center;
		line-height: 44px;
		background-color: rgba(225, 225, 225, 0.2);
	}
	.content-left .logo-warp .num{
		position: absolute;
		top: -6px;
		right: -6px;
		width: 24px;
		height: 16px;
		line-height: 16px;
		font-size: 9px;
		font-style: normal;
		font-weight: 700;
		text-align: center;
		color: #fff;
		border-radius: 16px;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
		background-color: rgb(240 ,20, 20);
	}
	.content-left .logo-warp.highling .icon{
		color: #fff;
	}
	.content-left .price{
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		margin: 12px 0;
		padding-right: 12px;
		border-right: 1px solid rgb(225, 225, 225, 0.1);
	}
	.content-left .price.highling{
		color: #fff;
	}
	.content-left .desc{
		font-size: 10px;
		line-height: 24px;
		margin: 12px;
	}
	@media screen and (max-width: 320px){
		.shopcart .content-left .logo-warp{
			margin: 0 2px;
		}
		.content-left .desc{
			margin: 12px 5px;
		}
		.content-left .price{
			padding-right: 2px;
		}
	}
	.content-right{
		flex: inherit;
		width: 105px;
		height: 100%;
		font-size: 12px;
		line-height: 48px;
		text-align: center;
		color: rgba(225, 225, 225, 0.4);
		font-weight: 700;
		background-color: rgba(225, 225, 225, 0.2);
	}
	.content-right.enough{
		color: #fff;
		background-color: #00b43c;
	}
	.shopcart-list{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		transform: translate3d(0,-100%,0);
	}
	.fold-leave-to,.fold-enter{
		transform: translate3d(0,0,0);
	}
	.fold-enter-active,.fold-leave-active{
		transition: 0.3s linear;
	}
	.shade{
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(7,17,27,0.6);
	}
	.shade-leave-to,.shade-enter{
		opacity: 0;
	}
	.shade-enter-active,.shade-leave-active{
		transition: 0.3s linear;
	}
	.shopcart-list .list-head{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;	
		background-color: #f3f5f7;
		border: 1px solid rgba(7,17,27,0.1);
	}
	.list-head .title{
		float: left;
		font-size: 14px;
		color:rgb(7,17,27);
	}
	.list-head .empty{
		float: right;
		font-style: 12px;
		color: rgb(0,160,220);
	}
	.list-content{
		padding: 0 18px;
		max-height: 217px;
		background: #fff;
		overflow: hidden;
	}
	.list-content .list-item{
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.list-content .list-item:last-child{
		border-bottom:none;
	}
	.list-content .list-item .name{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);

	}
	.list-content .list-item .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-weight: 700;
		font-size: 14px;
		color:rgb(240,20,20);

	}
	.list-content .list-item .cartcontrol-warp{
		position: absolute;
		right: 0;
		bottom: 5px;
	}
	.ball-warp{
		
	}
	.ball-warp .ball{
		position: fixed;
		z-index: 9;
		left: 32px;
		bottom: 22px;
		transition: 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
	}
	.ball-warp .ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: rgb(0,160,220);
		transition: 0.4s linear;
	}
</style>