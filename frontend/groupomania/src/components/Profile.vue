<template>
    <div class="h4 mt-5 container bg-dark text-white rounded-1rem">
        <p class="mb-3 pt-3 text-decoration-underline">Mes informations personnelles</p>
        <div class="pb-2 w-100">
            <div class="border rounded px-2 pt-2 mb-3">
                <p class="w-100">Pseudo: {{ member.username }}</p>
                <p class="w-100">Email: {{ member.email }}</p>
                <p class="w-100">Grade: {{ userGrade() }}</p>
                <p class="w-100">Prénom: {{ member.firstname }}</p>
                <p class="w-100">Nom de famille: {{ member.lastname }}</p>
                <p class="w-100">Travail: {{ member.job }}</p>
                <p class="w-100">Date d'anniversaire: {{ member.birthdate | moment("DD/MM/YYYY") }}</p> 
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
</style>