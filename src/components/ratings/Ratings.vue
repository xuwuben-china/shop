<template>
	<div class='ratings-warp' ref='rating'>
		<div class="rating">
			<div class="rating-head">
				<div class="overview-left">
					<h1 class="score" v-text='seller.score'></h1>
					<p class='title'>综合评分</p>
					<p class="text">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overview-right">
					<ul>
						<li class='clearfix grade-warp'>
							<p class='text'>商品评分</p>
							<div class='grade'>
								<v-star :size='36' :score='seller.foodScore'></v-star>
							</div>
							<span class='score' v-text='seller.foodScore'></span>
						</li>
						<li class='clearfix grade-warp'>
							<p class='text'>服务态度</p>
							<div class='grade'>
								<v-star :size='36' :score='seller.serviceScore'></v-star>
							</div>
							<span class='score' v-text='seller.serviceScore'></span>
						</li>
						<li class='clearfix grade-warp'>
							<p class='text'>送达时间</p>
							<p class='time'>{{seller.deliveryTime}}分钟</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="rating-warp">
				<v-ratingselect :ratings='ratings' :select-type='selectType' :only-content='onlyContent' :desc='desc' :appraise-type='type'></v-ratingselect>
			</div>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	const MERCHANTRATING = 1;
	import Star from '../star/star.vue'
	import BScroll from 'better-scroll'
	import Ratingselect from '@/components/ratingselect/Ratingselect.vue'
	export default{
		props:{
	      seller: {
	        type: Object
	      },
	      goods:{
	      	type: Array
	      }
	    },
	    data(){
	    	return{
	    		ratings: [],
	    		selectType: ALL,
	    		onlyContent: true,
	    		type: MERCHANTRATING,
	    		desc: {
	    			all: '全部',
					positive: '满意',
					negative: '不满意'
	    		}
	    	}
	    },
	    created(){
	    	this.$http.get('/api/ratings').then((res)=>{
	    		res = res.data;
	    		if(res.errno === 0){
	    			this.ratings = res.data;
	    			this.$nextTick(()=>{
			    		this.scroll = new BScroll(this.$refs.rating, {click: true});
			    	});
	    		}
	    	})
	    },
	    components: {
	      "v-star": Star,
	      'v-ratingselect': Ratingselect
	    }
	}
</script>
<style scoped>
	.ratings-warp {
		position: absolute;
		top: 174px;
		z-index: -1;
		bottom: 0;
		left: 0;
		overflow: hidden;
		width: 100%;

	}
	.rating{
		background-color: #f3f5f7;
	}
	.rating > div{
		background-color: #fff;
	}
	.rating-head{
		display: flex;
		width: 100%;
		padding: 18px 0;
		margin-bottom: 18px;
		border-bottom: 2px solid rgba(7,17,27,0.1)
	}
	.overview-left{
		flex: 0 0 137px;
		width: 137px;
		text-align: center;
		border-right: 1px solid rgba(7,17,27,0.2);
	}
	.overview-left .score{
		line-height: 28px;
		font-size: 24px;
		margin-bottom: 6px;
		color: rgb(225,153,0);
	}
	.overview-left .title{
		line-height: 12px;
		font-size: 12px;
		color:rgb(7,17,27);
		margin-bottom: 12px;
	}
	.overview-left .text{
		padding-bottom: 6px;
		line-height: 10px;
		font-size: 10PX;
		color: rgba(7,17,27,0.5);
	}
	.overview-right{
		flex: 1;
		padding-left: 24px;
	}
	.overview-right .grade-warp{
		margin-bottom: 8px;
		font-size: 12px;
		line-height: 18px;
	}
	.overview-right .grade-warp .grade{
		float: left;
		margin: 2px 10px 0 10px;
	}
	.overview-right .grade-warp .text{
		float: left;
		color: rgb(7,17,27);
	}
	.overview-right .grade-warp .time{
		float: left;
		margin-left: 10px;
		color: rgb(147,153,159);
	}
	.overview-right .grade-warp .score{
		font-size: 12px;
		line-height: 18px;
		color: rgb(255,153,0);
	}
	@media screen and (max-width:320px){
		.overview-right{
			padding-left: 6px;
		}
		.overview-left{
			flex: 0 0 120px;
			width: 120px;
		}
	}
</style>