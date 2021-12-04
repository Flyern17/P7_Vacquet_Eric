<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
                <a v-if="isConnected" class="navbar-brand mx-md-3" href="/#/accueil">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
                <a v-if="!isConnected" class="navbar-brand mx-md-3" href="/#">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
            </div>

            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav navbar-collapse collapse" id="navbarToggler">
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
        isConnected(){
            if(this.user.id > 0) {
                return true    
            } 
            return false
        }
    },
    methods: {
        logout: function() {
            this.$store.commit('logout');
            window.location.href='/';
        }
    }
}
</script>
