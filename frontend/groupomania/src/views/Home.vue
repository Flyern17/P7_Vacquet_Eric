<template>
  <div class="">
    <h1 class="h4 container">
      Bienvenue
      <span class="">{{ user.username }}</span>
    </h1>
    <new-message></new-message>
    <div v-for="message in messages" :key="message.id">
      <message :item='message'></message>
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
  }
}

</script>
