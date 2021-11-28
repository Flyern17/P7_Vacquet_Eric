<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div>
                <a v-if="isConnected" class="navbar-brand mx-md-3" href="/#/accueil">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
                <a v-if="!isConnected" class="navbar-brand mx-md-3" href="/#">
                    <img width="80" height="70" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania">
                </a>
            </div>

            <div class="navbar-nav flex-grow-1">
                <div class="navbar-nav mr-auto navbar-collapse collapse" id="navbarToggler">
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
