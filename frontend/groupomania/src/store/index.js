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
  // On enregistre un modele du user de base
  state: {
    status: '',
    user: {
      id: 0,
      token: '',
      username: '',
      grade: 1,
    },
  },
  // On défini des fonctions qui serviront de manière globale
  mutations: {
    // On défini un user via les informations de connexion
    initUser(state, data) {
      console.log("abc", data);
      state.user.id = data.userid;
      state.user.username = data.username;
      state.user.grade = data.grade;
    },
    // On remet la valeur de l'id et du token en null et on supprime le token du localStorage
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
  // Appel d'un plugin permettant d'actualiser la page et de ne pas perdre les données du state
  plugins: [createPersistedState()],
})
