<template>
    <header>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div>
                <a v-if="isConnected" class="navbar-brand mx-md-3" href="/#/accueil">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
                <a v-if="!isConnected" class="navbar-brand mx-md-3" href="/#">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
            </div>
            <div class="navbar-nav navbar-collapse" id="navbarToggler">
                <div class="navbar-nav mr-auto">
                    <router-link v-if="isConnected" to="/accueil" class="nav-link text-white">Accueil</router-link>
                    <router-link v-if="isConnected" to="/profil" class="nav-link text-white">Mon compte</router-link>
                </div>
                    <button v-if="isConnected" @click.prevent="logout" href="#" type="submit" aria-label="Se déconnecter" class="bg-danger rounded p-2 border-danger text-white">
                        <span>Se déconnecter</span>
                    </button>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapState } from "vuex"

export default {
    name: "Header",
    props: {

    },
    computed: {
        ...mapState(["user"]),
        // On vérifie que l'utilisateur est bien connecté, sinon, nous n'affichons pas les différents liens du header (Et le bouton de deconnexion)
        isConnected(){
            if(this.user.id > 0) {
                return true    
            } 
            return false
        }
    },
    methods: {
        // On applique la fonction enregistrée dans le store 'logout'
        logout: function() {
            this.$store.commit('logout');
            window.location.href='/';
        }
    }
}
</script>
