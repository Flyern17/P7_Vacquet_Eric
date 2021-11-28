<template>
    <div class="h1 mt-3 pt-3 container border-top ">
        <div class="bg-dark mx-4">
            <h1 class="h5 font-weight-bold col-12 mx-1 text-decoration-underline">Ajouter un commentaire</h1>
            <div class="bg-dark text-white container">
                <div class="h6 row">
                    <div class="col-12">
                        <a href="/#/profil" class="text-light row mx-3 font-weight-bold mb-2 mt-1 w-10">{{ user.username }}</a>
                        <form class="form-inline my-1">
                            <div class="form-group col-11 flex inline-block">
                                <label for="newComment" class=""></label>
                                <input v-model="commentInput" type="newComment" name="newComment" placeholder="Ecrivez un commentaire ici!" id="newComment" class="my-0 text-dark font-weight-bold bg-white rounded p-2 w-100">
                            </div>
                            <div class="form-group my-3">
                                <button type="button" aria-label="Poster un commentaire" @click.prevent="postComment" class="pull-right bg-danger rounded mx-3 py-2 border-danger text-white">Envoyer le commentaire</button>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import http from "../http";
import { mapState } from "vuex";

export default {
    components: {},
    name : 'newComment',
    props: {
        message_id: Number,
    },
    data() {
        return {
            commentInput: '',
        }
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        postComment() {
            if(this.commentInput.trim() == '') {
                alert('Impossible de poster un commentaire vide!')
                return
            }

            // $attrs = Props non défini

            const payload = {
                body: this.commentInput,
                userid: this.user.id,
                postid: this.message_id
            }


            http.post(`/post/${this.message_id}/comment/`, payload)
                .then(res => {
                    this.$emit('', res.data)
                    this.commentInput = ''
                })
                .catch(() => {
                    alert('Impossible de poster le commentaire!')
                })
        }
    }

}
</script> 
<style lang="scss">
.text-decoration-underline {
    text-decoration: underline;
}

.bg-dark-dark {
    background-color: #282d31;
}

.btn-dark-dark {
    background-color: #282d31;
    border-color: #282d31;
}

.w-10 {
    width: 10%;
}
</style>