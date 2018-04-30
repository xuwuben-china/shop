<template>
	<div>
		<div class="evaluate">
			<h1 class='title' v-show='titleShow'>商品评价</h1>
			<ul class='link clearfix'>
				<li class='all' :class="{'active':ratingType === 2}" @click='select(2)'>
					<span v-text='desc.all'></span><span class='num' v-text='ratings.length'></span>
				</li>
				<li class='good' :class="{'active':ratingType === 0}" @click='select(0)'>
					<span v-text='desc.positive'></span><span class='num' v-text='positives.length'></span>
				</li>
				<li class='bad' :class="{'active':ratingType === 1}" @click='select(1)'>
					<span v-text='desc.negative'></span><span class='num' v-text='negatives.length'></span>
				</li>
			</ul>
			<div class="condition" @click='toggleContent'>
				<i class='icon-check_circle icon' :class="{'on':onlyText}"></i>
				<span class='text'>只看有内容的评价</span>
			</div>
		</div>
		<ul class='ratings' v-show='ratings && appraiseType === 0'>
			<li class='rating' v-for='rating in ratings' v-show='needShow(rating.rateType,rating.text)'>
				<div class="head clearfix">
					<span class="time">{{rating.rateTime | time}}</span>
					<p class='user'>
						<span class="num" v-text='rating.username'></span>
						<img :src="rating.avatar" alt="">
					</p>
				</div>
				<p class="text">
					<i class=' icon' :class="{'icon-thumb_down':rating.rateType === 1,'icon-thumb_up':rating.rateType === 0}"></i>
					<span v-text='rating.text'></span>
				</p>
			</li>
		</ul>
		<ul class='ratings' v-show='ratings && appraiseType === 1'>
			<li v-for='item in ratings' v-show='needShow(item.rateType,item.text)' class='ratings-li'>
				<ul class='rating-item'>
					<li class='user clearfix'>
						<div class='img'>
							<img :src="item.avatar" alt="">
						</div>
						<p class="time">{{item.rateTime | time}}</p>
						<div class="grade">
							
							<div class="star-warp">
								<p class="user-name" v-text='item.username'></p>
								<p class='stars'>
									<v-star :size='24' :score='item.score'></v-star>
								</p>
								<p class='delivery'>{{item.deliveryTime}}分钟送达</p>
							</div>
						</div>
					</li>
					<li class='text' v-text='item.text'></li>
					<li class='foods'>
						<i :class="{'icon-thumb_down':item.rateType === 1,'icon-thumb_up':item.rateType === 0}"></i>
						<span class="food" v-for='food in item.recommend' v-text='food'></span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="no-rating" v-show='!ratings'>暂无评价</div>
	</div>
</template>
<script>
	import Star from '@/components/star/star.vue'
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	const MERCHANTRATING = 1;
	const COMMODITYRATING = 0;
	export default{
		props:{
			ratings: {
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type: Number,
				default: ALL,
			},
			onlyContent:{
				type: Boolean,
				default: false
			},
			desc:{
				type: Object,
				default(){
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			},
			titleShow:{
				type: Boolean,
				default: false
			},
			appraiseType:{
				type: Number
			}
		},
		data(){
			return{
				ratingType: this.selectType,
				onlyText: this.onlyContent
			}
		},
		components:{
				'v-star': Star
		},
		methods:{
			toggleContent(){
				this.onlyText = !this.onlyText;
			},
			select(type){
				this.ratingType = type;
			},
			needShow(type,text){
				if(this.onlyText){
					if(this.ratingType === 2){
						return true
					}else if(this.ratingType === type && text){
						return true;
					}else{
						return false
					}
				}else{
					if(this.ratingType === ALL){
						return true
					}else if(this.ratingType === type){
						return true;
					}else{
						return false
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === POSITIVE;
				})
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === NEGATIVE;
				})
			}
		}
	}
</script>
<style scoped>
	.evaluate{
		padding: 18px 18px 0 18px;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 2px solid rgba(7,17,27,0.1);
	}
	.evaluate .title{
		font-size: 14px;
		font-weight: 550;
		margin-bottom: 14px;
	}
	.evaluate .link{
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.evaluate .link li{
		float: left;
		padding: 2px 12px;
		color: rgb(78,85,93);
		line-height: 32px;
		font-size: 16px;
		margin-right: 8px;
		border-radius: 2px;
	}
	.evaluate .link li .num{
		font-size: 12px;
		margin-left: 5px;
	}
	.evaluate .link li.active{
		color: #fff;
	}
	.evaluate .link .all,.evaluate .link .good{
		background-color: rgba(0,160,220,0.2);
	}
	.evaluate .link .bad{
		background-color: rgba(77,85,93,0.2);
	}
	.evaluate .link .good.active,.evaluate .link .all.active{
		background-color: rgb(0,160,220);
	}
	.evaluate .link .bad.active{
		background-color: rgb(77,85,93);
	}
	.condition{
		width: 150px;
		padding: 12px 0;
	}
	.condition .icon{
		display: inline-block;
		font-size: 24px;
		color: rgb(147,153,159);
		line-height: 24px;
		vertical-align: middle;
	}
	.condition .icon.on{
		color:#00c850;
	}
	.condition .text{
		font-size: 10px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
	.ratings{
		padding: 0 16px;
	}
	.rating{
		padding: 16px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.rating:last-child{
		border-bottom: none;
	}
	.rating .head{
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.rating .head .user{
		float: right;
	}
	.rating .head .user img{
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.rating .text{
		font-size: 12px;
	}
	.rating .text .icon{
		line-height: 24px;
		color: rgb(147,153,159);
	}
	.icon-thumb_up{
		color: rgb(0,160,220);
	}
	.rating .text span{
		line-height: 16px;
		color: rgb(7,17,27);
	}
	.no-rating{
		padding: 5px;
		text-align: center;
		font-size: 16px;
		line-height: 20px;
		color: rgb(147,153,159);
	}
	.ratings-li{
		border-bottom: 1px solid rgba(7,17,27,0.1);	
	}
	.ratings-li:last-child{
		border-bottom:none;
	}
	.rating-item{
		padding: 18px 6px; 
		
	}
	.rating-item .user{
		font-size: 10px;
		line-height: 24px;
	}
	.rating-item .user .img{
		float: left;
		margin-top: 10px;
		margin-right: 12px;
	}
	.rating-item .user .img img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.rating-item .user .grade,.rating-item .user .grade .star-warp,.rating-item .grade .star-warp .delivery{
		float: left;
	}
	.rating-item .user .grade .user-name{
		color: rgb(7,17,27);
	}
	.rating-item .grade .star-warp .stars{
		float: left;
		margin-right: 6px;
	}
	.rating-item .user .time{
		float: right;
		color: rgb(147,153,159);
	}
	.rating-item .text{
		padding: 10px 30px;
		font-size: 12px;
		line-height: 18px;
		color: rgb(7,17,27);
	}
	.rating-item .foods .food{
		display: inline-block;
		font-size: 9px;
		color: rgb(147,153,159);
		line-height: 16px;
		margin-right: 8px;
		margin-bottom: 8px;
		padding: 5px 12px;
		white-space: normal; 
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 2px;
	}
</style>