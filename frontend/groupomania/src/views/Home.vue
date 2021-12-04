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
  mounted: function() {
    this.refresh()
  },
  methods: {
    showReactionOnMessage(tableReaction) {
      console.log(tableReaction)
      for (let a in this.messages) {
        // On défini le compteur des réactions de chaque message à 0
        this.$set(this.messages[a], "totalReaction_1", 0);
        this.$set(this.messages[a], "totalReaction_2", 0);

        for (let b in tableReaction) {
          // On regarde les réactions mises pour chaque message
          if(tableReaction[b].postid == this.messages[a].id) {
            if (tableReaction[b].type == 1) {
              this.messages[a].totalReaction_1 += tableReaction[b].sumReaction;
            } else if (tableReaction[b].type == -1) {
              this.messages[a].totalReaction_2 += tableReaction[b].sumReaction;
            }
          }
        }
      }
    },

    addPost(data) {
      this.messages.unshift(data)
    },

    refresh() {
      http.get('/post/')
        .then(res => {
          this.messages = res.data;
          http.get(`/post/${this.message_id}/reaction`)
          .then(res => {
            this.showReactionOnMessage(res.data);
          })
        })
    },

    newComment(data){
      this.comments.unshift(data)
    }
  }
}

</script>
