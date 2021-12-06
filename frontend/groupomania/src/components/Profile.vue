<template>
    <div class="h4 mt-5 container bg-dark text-white rounded-1rem">
        <h1 class="h3 mb-3 pt-3 text-decoration-underline">Mes informations personnelles</h1>
        <div class="pb-2 w-100">
            <div class="px-2 pt-2 mb-3">
                <div class="w-100 font-height">Pseudo: {{ member.username }}</div>
                <div class="w-100 font-height">Email: {{ member.email }}</div>
                <div class="w-100 font-height">Grade: {{ userGrade() }}</div>
                <div class="w-100 font-height">Prénom: {{ member.firstname }}</div>
                <div class="w-100 font-height">Nom de famille: {{ member.lastname }}</div>
                <div class="w-100 font-height">Travail: {{ member.job }}</div>
                <div class="w-100 font-height">Date d'anniversaire: {{ member.birthdate | moment("DD/MM/YYYY") }}</div> 
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: 'Profil',
    components: {},
    props: {
        member: {
            type: Object
        }
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            job: '',
            birthdate: '',
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        // On défini le grade en fonction du grade de l'utilisateur
        userGrade() {
            if (this.member.grade > 1) {
                return "Administrateur"
            } else if (this.member.grade == 1) {
                return "Membre"
            }
        },
    }
}
</script>

<style lang="scss">
.rounded-1rem {
    border-radius: 1rem;
}
.font-height {
    line-height: 1.5;
}
</style>