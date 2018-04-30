<template>
  <div id='app'>
    <v-header :seller='seller'></v-header>
    <v-tab :seller='seller'></v-tab>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
import {urlParse} from '@/js/util.js'

export default {
  name: 'App',
  data(){
    return {
      seller: {
        id: (()=>{
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  components: {
    'v-header': Header,
    'v-tab': Tab
  },
  created(){
    this.$http.get('/api/seller?id='+this.seller.id).then( (res) => {
        res = res.data
        if(res.errno === 0){
          this.seller = Object.assign({}, this.seller, res.data);
        }
      }).catch(function (error) {
        console.log(error)
      });
  }
}
</script>

<style>
@import 'css/iconfont.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}


</style>
