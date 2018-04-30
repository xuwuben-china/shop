<template>
	<div class="cartcontrol clearfix">
		<transition name='move'>
			<div class="cart-decrease icon-remove_circle_outline" v-show='food.count>0' @click.stop='removeCart'></div>
		</transition>
		<div class="cart-count" v-show='food.count>0' v-text='food.count'></div>
		<div class="cart-add icon-add_circle" @click.stop='addCart'></div>
	</div>
</template>
<script>
	export default{
		props:{
			food:{
				type: Object
			},
			eventHub: {
				type: Object
			}
		},
		methods:{
			addCart(e){
				if(!this.food.count){
					this.$set(this.food, 'count', 1)
				}else{
					this.food.count++;
				}
				this.eventHub.$emit('cartAdd', e.target);
			},
			removeCart(){
				this.food.count--;
			}
		}
	}
</script>
<style scoped>
	.cartcontrol > div{
		float: left;
	}
	.cart-decrease,.cart-add{
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
	}
	.cart-count{
		width: 12px;
		line-height: 24px;
		padding: 6px 0;
		text-align: center;
		font-style: 10px;
		color: rgb(127,153,159);
	}
	.move-enter,.move-leave-to{
		opacity: 0;
		transform: translate3d(24px,0,0) rotate(180deg);
	}
	.move-enter-active,.move-leave-active{
		transition: 0.4s linear;
	}
</style>