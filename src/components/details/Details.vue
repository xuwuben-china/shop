<template>
	<transition name='move'>
		<div class="detailWarp" ref='detailWarp'>
			<div class='detail'>
				<div class="img">
					<img :src="food.image" alt=""/>
					<p class="back" @click='back'>
						<i class='icon-arrow_lift return'></i>
					</p>
				</div>
				<div class="content">
					<div class="head">
						<h1 class='title' v-text='food.name'></h1>
						<div class="market">
							<span class="sell-count" >月售{{food.rating}}份</span>
							<span class="rating">好评率{{food.rating}}%</span>
						</div>
						<div class="price-warp">
							<div class="price">
								<span class="now">￥{{food.price}}</span>
								<span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-warp" v-show='food.count>=1'>
								<v-cartcontrol :food='food'></v-cartcontrol>
							</div>
							<transition name='buy-show'>
								<div class="buy" v-show='!food.count || food.count===0' @click='addFirst'>加入购车
								</div>
							</transition>
						</div>
					</div>
					<div class="message" v-show='food.info'>
						<h2 class='caption'>商品介绍</h2>
						<p class="text" v-text='food.info'></p>
					</div>
					<div class="ratings-warp">
						<v-ratingselect :ratings='food.ratings' :select-type='selectType' :only-content='onlyContent' :desc='desc' :title-show='true' :appraise-type='type'></v-ratingselect>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll'
	import Cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
	import Ratingselect from '@/components/ratingselect/Ratingselect.vue'
	const ALL = 2;
	const COMMODITYRATING = 0;
	export default{
		props: {
			food: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data(){
			return {
				selectType: ALL,
				onlyContent: false,
				desc:{
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				},
				type: COMMODITYRATING
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.scroll = new BScroll(this.$refs.detailWarp,{
					click: true
				})
			})
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			addFirst(){
				this.$set(this.food,'count',1)
			}
		},
		components: {
			"v-cartcontrol": Cartcontrol,
			'v-ratingselect': Ratingselect 
		}
	}
</script>
<style scoped>
	.detailWarp{
		position: fixed;
		z-index: 1;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translate3d(0,0,0);
		background-color: #fff;
	}
	.detail{
		padding-bottom: 46px;
	}
	.move-enter,.move-leave-to{
		transform: translate3d(500px,0,0);
	}
	.move-enter-active,.move-leave-active{
		transition: 0.5s linear;
	}
	.back{
		position: absolute;
		top: 10px;
		left: 0;
		border-radius: 15px;
		box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
		background-color: rgba(0,0,0,0.3);
	}
	.back .return{
		display: block;
		padding: 10px;
		font-size: 20px;
		color: #fff;
	}
	.img,.img img{
		width: 100%;
	}
	.content {
		background-color: #f3f5f7;
	}
	.content > div{
		background-color: #fff;
	}
	.content .head{
		margin-bottom: 16px;
		padding: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.head .title{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);

	}
	.content .market{
		margin-bottom: 16px;
		line-height: 10px;
	}
	.content .market .sell-count,.content .market .rating{
		font-size: 10px;
		color: rgb(147,153,159)
	}
	.content .market .rating{
		margin-left: 12px;
	}
	.head .price-warp{
		position: relative;
	}
	.price{
		font-weight: 700;
		line-height: 24px;
	}
	.price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.cartcontrol-warp{
		position: absolute;
		bottom: -4px;
		right: 0;
	}
	.buy{
		position: absolute;
		top: 0;
		right: 0;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		font-size: 10px;
		color: #fff;
		box-sizing: border-box;
		border-radius: 10px;
		background-color: rgb(0,160,220);
	}
	.buy-show-enter,.buy-show-leave-to{
		opacity: 0;
	}
	.buy-show-enter-active,.buy-show-leave-active{
		transition: 0.3s;
	}
	.content .message{
		padding: 18px;
		margin: 18px 0;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.message .caption{
		font-size: 14px;
		font-weight: 550;
		margin-bottom: 6px;
	}
	.message .text{
		font-size: 12px;
		line-height: 24px;
		padding: 0 8px;
		font-weight: 200;
		color: rgb(77,85,93);
	}
	.ratings-warp{
		margin-top: 18px;
	}
	
</style>