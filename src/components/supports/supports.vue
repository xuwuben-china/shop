<template>
	<ul v-if='seller.supports' class='supports'>
      <li class='supports-item' v-for='(item,index) in seller.supports'>
        <i class='icon' :class='classMap[seller.supports[index].type]'></i>
        <span class='text' v-text='seller.supports[index].description'></span>
      </li>
    </ul>
</template>
<script>
	export default{
		props:{
	      seller: {
	        type: Object
	      }
	    },
	    data: function () {
	  		return {
	        classMap: []
	  		}
	  	},
	  	created: function () {
	      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	  	},
	}
</script>
<style scoped>
  .supports .supports-item{
    padding: 0 12px;
    margin-bottom: 12px;
  }
  .supports .supports-item:last-child{
    margin: 0;
  }
  .supports .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .supports .icon.decrease{
    background-image: url('decrease_2@3x.png');
  }
  .supports .icon.discount{
    background-image: url('discount_1@3x.png');
  }
  .supports .icon.special{
    background-image: url('special_1@3x.png');
  }
  .supports .icon.invoice{
    background-image: url('invoice_1@3x.png');
  }
  .supports .icon.guarantee{
    background-image: url('guarantee_1@3x.png');
  }
  .supports .text{
    line-height: 16px;
    font-size: 12px;
  }
</style>