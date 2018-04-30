<template>
	<div class='seller-warp' ref='sellerScoll'>
		<div class='seller'>
			<div class="seller-head">
				<div class="title clearfix">
					<div class="title-left">
						<h1 class="name" v-text='seller.name'></h1>
						<div class="sales">
							<p class="star-warp">
								<v-star :size='36' :score='seller.score'></v-star>
							</p>
							<p class="text">({{seller.ratingCount}})</p>
							<p class="text">月售{{seller.sellCount}}单</p>
						</div>
					</div>
					<div class="title-right" @click='enshrine'>
						<i class='icon-favorite' :class='favoriteClass'></i>
						<p class='text' v-text='favoriteText'></p>
					</div>
				</div>
				<ul class='remark'>
					<li class='block'>
						<h2>起送价</h2>
						<span class='num' v-text='seller.minPrice'></span>
						<span class='nuit'>元</span>
					</li>
					<li class='block'>
						<h2>商家配送</h2>
						<span class='num' v-text='seller.deliveryPrice'></span>
						<span class='nuit'>元</span>
					</li>
					<li class='block'>
						<h2>平均配送时间</h2>
						<span class='num' v-text='seller.deliveryTime'></span>
						<span class='nuit'>分钟</span>
					</li>
				</ul>
			</div>
			<div class="seller-activity">
				<div class="text-warp">
					<h2 class='title'> 公告与活动</h2>
					<p class="text" v-text='seller.bulletin'></p>
				</div>
				<div class="supports-warp">
					<v-supports :seller='seller'></v-supports>
				</div>
			</div>
			<div class="pics">
				<h2 class='title'>商家实景</h2>
				<div class="banner-warp" ref='bannerWarp'>
					<ul class='clearfix banner' ref='bannerList'>
						<li v-for='pic in seller.pics' class='banner-item'>
							<img :src="pic" alt="" width='120' height='90'>
						</li>
					</ul>
				</div>
			</div>
			<div class="info">
				<h2 class='title'>商家信息</h2>
				<ul class='text'>
					<li class='text-list' v-for='msg in seller.infos' v-text='msg'></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import Star from '@/components/star/star.vue'
	import Supports from '@/components/supports/supports.vue'
	import {saveToLocal, loadFromLocal} from '@/js/store.js'
	export default{
		props:{
			seller:{
				type: Object 
			},
			goods: {
				type: Array
			}
		},
		data(){
			return {
				favorite: loadFromLocal(this.seller.id, 'favorite', false)
			}
		},
		watch:{
			'seller'(){
				this._initScroll();
			}
		},
		mounted(){
			this.$nextTick(()=>{
				if(this.seller.pics){
					this._initScroll();
				}
			})
		},
		computed:{
			favoriteText(){
				return this.favorite ? '已收藏' : '收藏';
			},
			favoriteClass(){
				return this.favorite ? 'favorite' : 'unfavorite';
			}
		},
		methods:{
			_initScroll(){
				let picW = 120;
				let mar = 6;
				let W = (picW + mar) * this.seller.pics.length;
				this.$refs.bannerList.style.width = W + 'px';
				this.scroll = new BScroll(this.$refs.sellerScoll, {click: true});
				this.bannerScoll = new BScroll(this.$refs.bannerWarp, {
					scrollX: true,
					eventPassthrough: 'vertical'
				});
			},
			enshrine(){
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			}
		},
		components:{
			'v-star': Star,
			'v-supports': Supports
		}
	}
</script>	
<style>
	.seller-warp{
		position: absolute;
	    top: 177px;
	    bottom: 0;
	    left: 0;
	    overflow: hidden;
	    width: 100%;
	}
	.seller{
		background-color: #f3f5f7;
	}
	.seller-head{
		padding: 18px;
		background-color: #fff;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-head .title{
		padding-bottom: 14px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-head .title .title-left{
		float: left;
	}
	.seller-head .title .title-left .name{
		font-size: 14px;
		font-weight: 600;
		line-height: 14px;
		margin-bottom: 8px;
		color: rgb(7,17,27);
	}
	.seller-head .sales .star-warp{
		float: left;
		margin-right: 8px;
	}
	.seller-head .sales .text{
		float: left;
		font-size: 10px;
		line-height: 18px;
		color: rgb(77,85,93);
		margin-right: 12px; 
	}
	.seller-head .title .title-right{
		float: right;
		width: 50px;
		text-align: center;
	}
	.seller-head .title .title-right .icon-favorite{
		font-size: 24px;
		line-height: 24px;
		color: red;
	}
	.seller-head .title .title-right .favorite{
		color: rgb(240,20,20);
	}
	.seller-head .title .title-right .unfavorite{
		color: #d4d6d9;
	}
	.seller-head .title .title-right .text{
		font-size: 10px;
		line-height: 10px;
		color: rgb(77,85,93);
		margin-top: 4px;
	}
	.seller-head .remark{
		display: flex;
		margin-top: 18px;
	}
	.seller-head .remark .block{
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.seller-head .remark .block:last-child{
		border-right: none;
	}
	.seller-head .remark .block h2{
		font-size: 10px;
		line-height: 10px;
		margin-bottom: 4px;
		color: rgb(147,153,159);
	}
	.seller-head .remark .block .num{
		font-size: 24px;
		font-weight: 200;
		line-height: 24px;
		color: rgb(7,17,27);
	}
	.seller-head .remark .block .nuit{
		font-size: 10px;
		margin-left: -4px;
	}
	.seller-activity,.seller .pics,.seller .info{
		margin-top: 18px;
		padding: 18px;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
		background-color: #fff;
	}
	.seller-activity .text-warp{
		margin-bottom: 16px;
	}
	.seller-activity .text-warp .title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		font-weight: 500;
		margin-bottom: 8px;
	}
	.seller-activity .text-warp .text{
		padding: 0 12px;
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
		color: rgb(240,20,20);
	}
	.supports-warp .supports .supports-item{
		padding: 16px 12px 0 12px;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.supports-warp .supports .supports-item .icon{
		width: 20px;
		height: 20px;
		margin: 0;
		background-size: 20px 20px;
	}
	.supports-warp .supports .supports-item .text{
		font-size: 12px;	
		font-weight: 200;
		line-height: 16px;
		color: rgb(7,17,27);
	}
	.seller .pics .title{
		font-size: 14px;
		font-weight: 700;
		margin-bottom: 12px;
	}
	.seller .pics .banner-warp{
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
	}
	.seller .pics .banner{
		width: 1000%;
	}
	.seller .pics .banner-item{
		float: left;
		margin-right: 6px;
	}
	.seller .info .title{
		font-size: 14px;
		font-weight: 700;
		margin-bottom: 12px;
	}
	.seller .info .text{
		font-size: 12px;
		line-height: 16px;
		font-weight: 200;
		color: rgb(7,17,27);
	}
	.seller .info .text .text-list{
		padding: 16px 12px;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
</style>