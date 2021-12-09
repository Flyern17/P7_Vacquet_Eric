<template>
  <div class="">
    <div class="mx-3">
      <h1 class="col-lg-10 col-md-11 col-sm-12 h4 mx-auto text-decoration-underline">
        Bienvenue
        <span class="font-weight-bolder text-danger">{{ user.username }}</span>
      </h1>
    </div>
    <new-message @created="addPost"></new-message>
    <div v-for="message in messages" :key="message.id">
      <message :item='message' @refresh="refresh" @added="newComment"></message>
    </div>
  </div>
</template>

<script>
import http from "../http";
import Message from "../components/Message.vue";
import NewMessage from "../components/NewMessage.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    "new-message": NewMessage,
    message: Message
  },
  data: function() {
    return {
      username: "Username",
      messages: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  // On appelle la fonction refresh 
  mounted: function() {
    this.refresh()
  },
  methods: {
    showReactionOnMessage(tableReaction) {
      for (let a in this.messages) {
        // On défini le compteur des réactions de chaque message à 0
        this.$set(this.messages[a], "totalReaction_1", 0);
        this.$set(this.messages[a], "totalReaction_2", 0);

        for (let b in tableReaction) {
          // On regarde les réactions mises pour chaque message
          if(tableReaction[b].postid == this.messages[a].id) {
            // Si la réaction est du type 1 (Un like)
            if (tableReaction[b].type == 1) {
              // On ajoute au compteur des réactions likes la réaction
              this.messages[a].totalReaction_1 += tableReaction[b].sumReaction;
            } 
            // Si la réaction est du type -1 (Un dislike)
            else if (tableReaction[b].type == -1) {
              // On ajoute au compteur des réactions dislikes la réaction
              this.messages[a].totalReaction_2 += tableReaction[b].sumReaction;
            }
          }
        }
      }
    },

    // On ajoute un post dans l'array this.messages, en premier
    addPost(data) {
      this.messages.unshift(data)
    },
    
    // Appel API sur la route d'affichage des posts et des réactions mises sur les posts
    refresh() {
      http.get('/post/')
        .then(res => {
          // On enregistre le résultat dans la variable this.messages
          this.messages = res.data;
          //On affiche les réactions mises 
          http.get(`/post/${this.message_id}/reaction`)
          .then(res => {
            // On récupère les réactions postés sur les différents messages
            this.showReactionOnMessage(res.data);
          })
        })
    },

    // On ajoute un commentaire dans l'array this.comments, en premier (Ne sert à rien, la fonction est déjà définie sur le composant enfant)
    newComment(data){
      this.comments.unshift(data)
    }
  }
}

</script>
