<template>
    <div>
        <div v-for="member in members" :key="member.id">
            <Profile :member='member'></Profile>
        </div>
            <div class="h5 container bg-dark text-white rounded-1rem pt-2 pb-3">
                <p class="h4 text-decoration-underline">Modifier votre profil</p>
                <div class="form-group">
                    <label for="firstname" class="text-white">Prénom: </label>
                    <input v-model="firstname" type="text" name="firstname" placeholder="Exemple: Michel" id="firstname" class="w-100">
                </div>
                <div class="form-group">
                    <label for="lastname" class="text-white">Nom de famille: </label>
                    <input v-model="lastname" type="text" name="lastname" placeholder="Exemple: Dupont" id="lastname" class="w-100">
                </div>
                <div class="form-group">
                    <label for="job" class="text-white">Travail: </label>
                    <input v-model="job" type="text" name="job" placeholder="Exemple: Boulanger" id="job" class="w-100">
                </div>
                <div class="form-group">
                    <label for="birthdate" class="text-white">Date d'anniversaire: </label>
                    <input v-model="birthdate" type="date" name="birthdate" placeholder="Exemple: JeanxFred12" id="birthdate" class="w-100">
                </div>
                <button @click.prevent="updateMember" class="bg-danger rounded border-danger text-white mx-2">Modifier le profil</button>
                <button @click.prevent="deleteMember" class="bg-danger rounded border-danger text-white mx-2">Supprimer le profil</button>
            </div>
        
    </div>
</template>

<script>

import { mapState } from "vuex";
import http from "../http"
import Profile from "../components/Profile.vue"

export default {
    name: "Users",
    components: {Profile},
    props: {},
    data() {
        return {
            firstname: '',
            lastname: '',
            job: '',
            birthdate: '',
            members: []
        }
    },
    computed: {
        ...mapState(['user'])
    },
    mounted: function() {
        this.refresh()
    },
    methods: {
        refresh() {
            const payload = {
                id: this.user.id
            }

            console.log(payload)
            http.get(`/user/profile/${this.user.id}`, payload)
                .then(res => {
                    this.members = res.data;
                    console.log(this.members)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        updateMember() {
            const payload = {
                firstname: this.firstname,
                lastname: this.lastname,
                job: this.job,
                birthdate: this.birthdate
            }

            console.log(payload)

            http.put(`/user/update/${this.user.id}`, payload)
                .then(() => {
                    this.refresh();
                })
                .catch(() => {
                    alert("L'utilisateur n'a pas été mis à jour!")
                })
        },
        deleteMember() {
            // Modifier le modele pour la suppression d'un compte
            const payload = {
                id: this.user.id
            }

            http.delete(`/user/delete/${this.user.id}`, payload)
                .then(() => {
                    console.log('logout')
                })
                .catch(() => {
                    alert("L'utilisateur n'a pas été supprimé!")
                })
        },
    }    
}
</script>

<style lang="scss">
.rounded-1rem {
    border-radius: 1rem;
}
</style>