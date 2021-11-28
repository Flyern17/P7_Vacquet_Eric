import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let user = localStorage.getItem('user');
if (!user) { 
  user =  {  
    id: 0,
    token: ''
  }
} else {
  user = JSON.parse(user);
}

export default new Vuex.Store({
  state: {
    status: '',
    user: {
      id: 0,
      token: '',
      username: '',
      grade: 1,
    },
  },
  mutations: {
    initUser(state, data) {
      console.log("abc", data);
      state.user.id = data.userid;
      state.user.username = data.username;
      state.user.grade = data.grade;
    },
    logout: function(state) {
      state.user = {
        id: 0,
        token: ''
      }
      localStorage.removeItem('token');
    }
    
  },
  actions: {

  },
  modules: {
    
  },
  plugins: [createPersistedState()],
})
