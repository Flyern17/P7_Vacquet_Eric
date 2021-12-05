<template>
    <div class="mt-5 col-sm-12 col-md-11 col-lg-10 mx-auto">
        <div class="bg-dark text-white rounded-1rem">
            <div>
                <div class="mb-4 mx-2">
                    <p class="mx-2 pt-3 mb-0 font-weight-bold">{{ item.username }}</p>
                    <span class="mx-2 text-decoration-underline">{{ item.date_post | moment("from", "now", true) }} ago</span>
                </div>
            </div>
            <div class="mx-2">
                <p class="mx-2 text-dark font-weight-bold p-1 bg-white rounded">{{ item.body }}</p>
                <img v-if="(item.image != null)" :src="item.image" alt="" class="mx-2 pb-2 w-50">
            </div>
            <div class="my-3 mx-2">
                <a @click.prevent="addReaction(1)" href="/#/accueil" class="button bg-danger rounded p-1 text-white m-2" aria-label="J'aime le message">
                    <span class="pr-2"><i class="far fa-thumbs-up"></i></span>
                    <span>{{item.totalReaction_1}}</span>
                </a>
                <a @click.prevent="addReaction(-1)" href="/#/accueil" class="button bg-danger rounded p-1 text-white m-2" aria-label="Je n'aime pas le message">
                    <span class="pr-2"><i class="far fa-thumbs-down"></i></span>
                    <span>{{item.totalReaction_2}}</span>
                </a>
                <button v-if="isGoodUser" type="button" aria-label="Supprimer un message" @click.prevent="deleteMessage()" class="bg-danger rounded border-danger text-white"><i class="fas fa-trash"></i></button>
            </div>
            
            <Comment v-for="comment in comments" :key="comment.id" :comment="comment" @refresh="refresh" class="p-2"></Comment> 
            <NewComment :message_id="item.id" @created="addComment"></NewComment> 

        </div>
    </div>
</template>



<script>


import http from "../http";
import {mapState} from "vuex";
import Comment from "./Comment.vue";
import NewComment from "./NewComment.vue";

export default {
    components: { NewComment, Comment },
    name: 'message',
    props : {
        item: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    data() {
        return {
            comments: []
        }
    },
    computed: {
        ...mapState(['user']),
        // On défini si l'utilisateur est le bon ou si il s'agit d'un administrateur
        isGoodUser() {
            if(this.item.userid == this.user.id) {
                return true; 
            } else if (this.user.grade == 2) {
                return true
            } else {
                return false
            }
        },
    },
    // On appelle une fonction refresh lorsque la page se charge
    mounted: function() {
        this.refresh()
    },
    methods: {
        // On ajoute un commentaire dans un tableau, au début de celui-ci 
        addComment(data){
            this.comments.unshift(data)
        },
        // Appel API pour voir les commentaires d'un post donné
        refresh() {
            http.get(`/post/${this.item.id}/comment/`)
                .then(res => {
                this.comments = res.data;
                })      
        },
        // Ajout d'une reaction via un appel API
        addReaction(reactionId) {
            // Définition d'une constante payload
            const payload = {
                userid: this.user.id,
                postid: this.item.id,
                type: reactionId,
            }

            console.log(payload)
            // Envoi du payload dans la route
            http.post(`/post/${this.item.id}/reaction`, payload) 
            .then(() => {
                // Actualise la page sans devoir recharger via Alt+R
                this.$emit('refresh')
            })
            .catch(() => {
                console.log('Impossible de poster cette reaction!');
                alert('Impossible de poster cette reaction!');
            })
        },
        // Suppression d'un message 
        deleteMessage() {
            http.delete(`/post/${this.item.id}`)
            .then(() => {
                alert('Le message a bien été supprimé!');
                this.$emit('refresh');
            })
        },
    }
}
</script>
<style lang="scss">
.text-decoration-underline {
    text-decoration: underline;
}

.bg-dark-dark {
    background-color: #2c3135;
}

.color-white{
    color: white;
}

.rounded-1rem {
    border-radius: 1rem;
}
</style>