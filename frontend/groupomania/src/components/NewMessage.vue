<template>
    <div class="h1 mt-5 container">
        <h1 class="h4 col-3">Nouveau message</h1>
        <div class="bg-dark text-white container rounded-1rem">
            <div class="h6 row">
                <div class="col-12">
                    <a href="/#/profil" class="text-light row mx-3 font-weight-bold my-3">{{ user.username }}</a>
                    <form class="form-inline my-1">
                        <div class="form-group col-11 flex inline-block">
                            <label for="newMessage" class=""></label>
                            <input v-model="body" type="newMessage" name="newMessage" placeholder="Que voulez-vous raconter aujourd'hui?" id="newMessage" class="w-100 py-1">
                        </div>
                        <div class="form-group mx-3 my-3">
                            <input type="file" class="" @change="uploadImage($event)" id="image-input" ref="imageInput" aria-label="Ajouter une image">
                        </div>
                        <div class="form-group my-3">
                            <button type="button" aria-label="Poster un message" @click.prevent="postMessage" class="pull-right bg-danger rounded p-2 border-danger text-white">Envoyer le message</button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import http from "../http"
import {mapState} from 'vuex'

export default {
    name: 'NewMessage',
    data: function() {
        return {
            body:'',
            file:''
        }
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        postMessage(){
            if(this.file) { 
                const formData = new FormData();
                formData.append('body', this.body);
                formData.append('userid', this.user.id);
                formData.append('file', this.file, this.file.name);

                http.post('/post/', formData)
                .then(res => {
                    this.$emit('', res.data)
                    this.body = '',
                    this.file = ''    
                })
                .catch(() => {
                    alert('Impossible de poster ce message!');
                }) 
            } else {
                const payload = {
                    body: this.body,
                    userid: this.user.id
                }
                http.post('/post/', payload)
                .then(res => {
                    this.$emit('', res.data)
                    this.body = ''
                })
                .catch(() => {
                    alert('Impossible de poster ce message!');
                })
            } 
        },
        uploadImage(e) {
            this.file = e.target.files[0];
        }
    }
}
</script>
<style lang="scss">

.rounded-1rem {
    border-radius: 1rem;
}
</style>