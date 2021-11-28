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
    updateReactionOnMessage(tabReaction) {
      for (let i in this.messages) {
        this.$set(this.messages[i], "totalReaction_1", 0);
        this.$set(this.messages[i], "totalReaction_2", 0);

        for(let j in tabReaction) {
          if(tabReaction[j].message_id == this.messages[i].id){
            switch(tabReaction[j].reaction_id){
              case 1 : this.messages[i].totalReaction_1 = tabReaction[j].sumReaction; break
              case 2 : this.messages[i].totalReaction_2 = tabReaction[j].sumReaction; break
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
            this.updateReactionOnMessage(res.data)
          })
        })
    },
  }
}

</script>
