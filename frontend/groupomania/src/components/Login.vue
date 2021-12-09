<template>
    <div class="text-center">
        <h1 class="h2" v-if="mode == 'login'">Connexion</h1>
        <h1 class="h2" v-else>Inscription</h1>
        <p v-if="mode == 'login'">Tu n'as pas encore de compte? <span class="ml-1 font-weight-bold text-dark cursor-pointer" @click="switchToCreateAccount()"><u>Créer un compte</u></span></p>
        <p v-else>Tu as déjà un compte?<span class="ml-1 font-weight-bold text-dark cursor-pointer" @click="switchToLogin()"><u>Se connecter</u></span></p>
        <div class="m-auto rounded col-lg-4 col-md-6 col-sm-12 bg-dark">
            <form action="#" class="py-3">
                <div class="form-group">
                    <label for="email" class="text-white">Adresse mail: </label>
                    <input v-model="email" @keyup="invalidEmail" type="email" name="email" id="email" class="w-100" placeholder="aaa@bbb.cc">
                    <div v-if="errors.email == true" class="text-white font-weight-bold">Veuillez entrer une email valide!</div>
                </div>
                <div class="form-group" v-if="mode == 'create'">
                    <label for="username" class="text-white">Pseudo: </label>
                    <input v-model="username" @keyup="invalidUsername" type="username" name="username" placeholder="Exemple: JeanxFred12" id="username" class="w-100">
                    <div v-if="errors.username == true" class="text-white font-weight-bold ml-2">Veuillez entrer un pseudo de plus de 1 caractère !</div>
                </div>
                <div class="form-group">
                    <label for="password" class="text-white">Mot de passe: </label>
                    <input v-model="password" @keyup="invalidPassword" type="password" name="password" id="password" class="w-100">
                    <div v-if="errors.password == true" class="text-white font-weight-bold">Veuillez indiquer un mot de passe compris entre 8-100 caractères, avec des majuscules et des chiffres!</div>
                </div>
                <div class="form-group" v-if="mode == 'create'">
                    <label for="password" class="text-white">Confirmer votre mot de passe: </label>
                    <input v-model="confirmPassword" @keyup="invalidConfirmPassword" type="password" name="c_password" id="c_password" class="w-100">
                    <div v-if="errors.confirmPassword" class="text-white font-weight-bold ml-2">Veuillez entrer le même mot de passe!</div>
                </div>
                <div class="form-group text-white" v-if="mode == 'login' && status == 'error_login'"> 
                    Adresse mail et/ou mot de passe incorrect
                </div>
                <div class="form-group text-white" v-if="mode == 'create' && status == 'error_create'"> 
                    Adresse mail déjà utilisée
                </div>

                <div>
                    <button @click.prevent="login" type="submit" aria-label="Se connecter" class="bg-danger rounded p-2 border-danger text-white" v-if="mode == 'login'">
                        <span v-if="status == 'loading'">Connexion en cours..</span>
                        <span v-else>Se connecter</span>
                    </button>
                    <button @click.prevent="createAccount" type="submit" aria-label="Se connecter" class="bg-danger rounded p-2 border-danger text-white" v-else>
                        <span v-if="status == 'loading'">Création en cours</span>
                        <span v-else>Créer mon compte</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import { mapMutations } from "vuex"
import http from "../http"

export default{
    name: 'login',
    data: function() {
        return {
            mode: 'login',
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
            errors: {
                email: false,
                username: false,
                password: false,
                confirmPassword: false
            }
        }
    },
    computed: {
        ...mapState(['status']),
    },
    mounted: function () {
        if(this.$store.state.user.id != 0) {
            this.$router.push('/accueil')
            return;
        }
        console.log(this.$store.state.user.id)
    },
    methods: {
        // On switch sur le mode de création de compte
        switchToCreateAccount: function() {
            this.mode = 'create'
        },
        // On switch sur le mode de connexion à un compte
        switchToLogin: function() {
            this.mode = 'login'
        },
        // Ajout d'une regex pour le mot de passe
        regExPassword: function(value) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
        },
        // Fonction qui vérifie l'email utilisé
        invalidEmail: function() {
            if(this.email.length <= 5) {
                this.errors.email = true;
            } else {
                this.errors.email = false;
            }
        },
        // Fonction que vérifie le username de l'utilisateur
        invalidUsername: function() {
            if(this.username.length <= 1) {
                this.errors.username = true;
            } else {
                this.errors.username = false;
            }
        },
        // Fonction que vérifie le mot de passe de l'utilisateur en fonction de la regex
        invalidPassword: function() {
            if(this.regExPassword(this.password)) {
                this.errors.password = false;
            } else {
                this.errors.password = true;
            }
        },
        // Fonction qui vérifie que le mot de passe et que la confirmation soit identique
        invalidConfirmPassword: function() {
            if(this.password == this.confirmPassword) {
                this.errors.confirmPassword = false
            } else {
                this.errors.confirmPassword = true
            }
        },
        ...mapMutations(['initUser']),

        // On fait un appel API pour vérifier la route de connexion
        login: function() {
            // On enregistre un payload qui contient les informations dont on a besoin
            const payload = {
                email: this.email,
                password: this.password
            }
            // On envoie ce payload dans la route
            http.post('/user/login', payload)
                .then(res => {
                    // On utilise la réponse dans la fonction initUser du store
                    console.log(res.data)
                    this.initUser(res.data)
                    // On enregistre le token dans le localStorage
                    localStorage.setItem('token', res.data.token)
                    // On renvoie vers la page d'accueil
                    setTimeout(() => { this.$router.push('accueil'); }, 100);
                })
                .catch(() => {
                    console.log('Adresse mail ou mot de passe incorrect!')
                    localStorage.removeItem('token')
                    alert('Adresse mail ou mot de passe incorrect!')
                })
        },
        // On fait un appel API pour vérifier la route d'inscription
        createAccount: function() {
            // On vérifie que les champs remplissent les conditions demandées
            if(this.email.length <= 5) {
                alert('Veuillez entrer un email valide!')
                return false
            }
            if(this.username.length <= 5) {
                // alert('Veuillez entrer un pseudo valide')
                return false
            }
            if(this.password != this.confirmPassword) {
                // alert('Veuillez entrer le même mot de passe!')
                return false
            }
            // On enregistre un payload qui contient les informations dont on a besoin
            const payload = {
                email: this.email,
                password: this.password,
                username: this.username
            }
            // On envoie ce payload dans la route
            http.post('/user/signup', payload)
                .then(() => {
                    // On appelle la fonction login, afin de ne pas devoir se connecter juste après
                    this.login()
                })
                .catch(() => {
                    console.log('Veuillez entrer un mot de passe sécurisé!');
                    alert("Veuillez entrer un mot de passe sécurisé! (8 caractères minimum / 2 chiffres / 1 majuscule!")
                })
        },
    }
}
</script>
<style lang="scss">
.cursor-pointer {
    cursor: pointer;
}
</style>