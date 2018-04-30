import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
	addCart: (food, event)=>{
		console.log(this)
		if(!food.count){
			food.count = 1;
		}else{
			food.count++;
		}
		
	}
}



export default new Vuex.Store({
	actions
});