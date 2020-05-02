import Vue from 'vue'
import Vuex from 'vuex'
import { User } from "firebase";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: undefined as User | null | undefined
	},
	mutations: {
		setUser(state, user) {
			console.log("setUser", state.user, user)
			state.user = user
		}
	},
	actions: {
	},
	modules: {
	}
})
