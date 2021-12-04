<template>
    <div class="">
        <div class="bg-dark-dark mx-2 rounded-1rem pb-2">
            <p class="mx-3 pt-3 mb-0 font-weight-bold">{{ comment.username }}</p>
            <span class="mx-3 text-decoration-underline">{{ comment.date_coms | moment("from", "now", true) }} ago</span>
            <div class="d-flex my-2">
                <p class="mr-3 mx-3 my-0 text-dark font-weight-bold bg-white rounded p-2 w-100">{{ comment.body }}</p>
                <button v-if="isGoodUser" type="button" aria-label="Supprimer un message" @click.prevent="deleteComment(comment.id)" class="bg-danger rounded px-2 mr-3 border-danger text-white"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../http";
import { mapState } from "vuex";

export default {
    name: 'comment',
    props: {
        comment: {
           type: Object,
           required: true,
           default: () => {}
        },
        props: {
            message_id: Number,
        }
    },
    computed: {
        ...mapState(['user']),
        isGoodUser() {
            if(this.comment.userid == this.user.id) {
                return true; 
            } else if (this.user.grade == 2) {
                return true
            } else {
                return false
            }
        },        
    },
    methods: {
        deleteComment(id) {
            http.delete(`/post/${this.message_id}/comment/${id}`)
            .then(() => {
                alert('Le commentaire à été supprimé!');
                this.$emit('refresh');
            })
        }
    }
}
</script>

<style lang="scss">

.rounded-1rem {
    border-radius: 1rem;
}

</style>