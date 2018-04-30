<template>
	<div class="goods">
		<div class="menu-warp" ref='menuWarp'>
			<ul>
				<li v-for='(val, index) in goods' class="menu-item" :class="{'current':currentIndex === index}"  @click='selectMenu(index, $event)'>
					<p class='text'>
						<i v-show='val.type>0' class='icon' :class='classMap[val.type]'></i>
					{{val.name}}
					</p>
				</li>
			</ul>
		</div>
		<div class="foods-warp" ref='foodsWarp'>
			<ul>
				<li v-for='(item, index) in goods' class='good-list food-list-hook'>
					<h1 class='title' v-text='item.name'></h1>
					<ul>
						<li class='food-item' v-for='food in item.foods' @click='checked(food)'>
							<router-link to="/detail">
								<div class="icon">
									<img :src="food.icon" width="80" alt="">
								</div>
							</router-link>
							<div class="content">
								<router-link to="/detail">
									<h2 class='name' v-text='food.name'></h2>
									<p class='desc' v-text='food.description' v-show='food.description'></p>
									<div class="extra">
										<span>月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
								</router-link>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-warp">
									<v-cartcontrol :food='food' :key='index' :event-hub='eventHub'></v-cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<v-shopcart :selectFoods='foods' :seller='seller' ref='shopcart' :event-hub='eventHub'></v-shopcart>
		<router-view :food='checkedFood'></router-view>
	</div>
</template>
<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import Shopcart from '@/components/shopcart/Shopcart.vue'
	import Cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	const ERR_OK = 0;
	export default{
		props:{
	      seller: {
	        type: Object
	      }
	    },
		data(){
			return {
				goods: [],
				classMap: [],
				menuScroll: {},
				foodsScroll: {},
				listHeight: [],
				scrollY: 0,
				isClick: [],
				scrollIndex: 0,
				checkedFood: {},
				eventHub: new Vue()
			}
		},
		mounted: function () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('api/goods').then((res) => {
		        this.goods = res.data.data;
				this.$nextTick(()=>{
		       		this._calculateHeight();
					this._initScroll();

				})
		    });
			this.eventHub.$on('cartAdd', this._drop)
		},
		components: {
			'v-shopcart': Shopcart,
			"v-cartcontrol": Cartcontrol
		},
		methods: {
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWarp, {click: true});
				this.foodsScroll = new BScroll(this.$refs.foodsWarp, {
					probeType: 3,
					click: true
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs( Math.round(pos.y));
				})
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWarp.getElementsByClassName('good-list');
				let H = 0;
				this.listHeight.push(H);
				for(let i=0; i<foodList.length; i++){
					let item = foodList[i];
					H += item.clientHeight;
					this.listHeight.push(H);
					this.isClick.push(false)
				}
			},
			selectMenu (index, event) {
				let foodList = this.$refs.foodsWarp.getElementsByClassName('good-list');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300)
			},
			_drop(target){
				this.$refs.shopcart.drop(target)
			},
			checked(food){
				this.checkedFood = food;
			}

		},
		computed: {
			currentIndex () {
				for(var i=0; i<this.listHeight.length; i++){
					var height1 = this.listHeight[i];
					var height2 = this.listHeight[i + 1];
					if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0;
			},
			foods(){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					})
				});
				return foods;
			}
		}
	}
</script>
<style>
	.goods{
		display: flex;
		position: absolute;
		top: 177px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-warp{
		flex: 0 0 80px;
		width: 56px;
		background-color: #f3f5f7;
	}
	.menu-warp .menu-item{
		display: table;
		height: 54px;
		width: 56px;
		padding: 0 12px;
		background-color: #f3f5f7;
	}
	.menu-warp .menu-item.current{
		position: relative;
		top: -1px;
		background-color: #fff;
		z-index: 9;
	}
	.menu-warp .menu-item .text{
		display: table-cell;
		font-size: 12px;
		line-height: 14px;
		font-weight: 200;
		vertical-align: middle;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	.menu-warp .menu-item.current .text{
		font-weight: 700;
		border-bottom: none;
	}
	.menu-warp .menu-item:last-child  .text{
		border-bottom: none;
	}
	.menu-warp .menu-item .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		vertical-align: bottom;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.menu-warp .menu-item .icon.decrease{
		background-image: url('decrease_3@2x.png');
	}
	.menu-warp .menu-item .icon.discount{
		background-image: url('discount_3@2x.png');
	}
	.menu-warp .menu-item .icon.special{
		background-image: url('special_3@2x.png');
	}
	.menu-warp .menu-item .icon.invoice{
		background-image: url('invoice_3@2x.png');
	}
	.menu-warp .menu-item .icon.guarantee{
		background-image: url('guarantee_3@2x.png');
	}
	.foods-warp{
		flex: 1;
	}
	.foods-warp .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147, 153, 159);
		background-color: #f3f5f7;
	}
	.foods-warp .good-list .food-item{
		display: flex;
		margin: 0 18px;
		padding: 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.foods-warp .good-list .food-item:last-child{
		border-bottom :none;
	}
	.good-list .food-item .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.good-list .food-item .icon img{
		border-radius: 2px;
	}
	.good-list .food-item .content{
		position: relative;
		flex:1;
	}
	.good-list .food-item .content .name{
		margin: 2px 0 8px 0;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.food-item .content  .desc,.food-item .content .extra{
		line-height: 10px;
		font-size: 10px;
		margin: 8px 0;
		line-height: 13px;
		color: rgb(147, 153, 159);
	}
	.food-item .content .extra{
		margin-right: 12px;
	}
	.food-item .content .extra span:first-child{
		margin-right: 12px;
	}
	.food-item .content .price{
		font-weight: 700;
		line-height: 24px;
	}
	.food-item .content .price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.food-item .content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.food-item .content .cartcontrol-warp{
		position: absolute;
		float: none;
		right: 0;
		bottom: 4px;
	}
</style>