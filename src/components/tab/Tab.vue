<template>
  <div class='link'>
  	<ul class='tab'>
  	  <li>
  		<router-link to='/goods'>商品</router-link>
  	  </li>
  	  <li>
  		<router-link to='/ratings'>评价</router-link>
  	  </li>
  	  <li>
  		<router-link to='/seller'>商家</router-link>
  	  </li>
  	</ul>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
	  
	
  </div>
</template>
<script>
  export default {
    props:{
      seller: {
        type: Object
      }
    }
  }
</script>
<style scoped>
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .tab li{
	flex: 1;
    text-align: center;
  }
  .tab li a{
  	display: block;
	font-size: 14px;
  }
  .tab li a.router-link-active{
  	color: rgb(240, 20, 20);
  }
</style>