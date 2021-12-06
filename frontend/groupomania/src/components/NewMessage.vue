<template>
    <div class="h1 mt-5 mx-3">
        <h1 class="mx-auto col-lg-10 col-md-11 col-sm-12 h4">Nouveau message</h1>
        <div class="mx-auto bg-dark text-white rounded-1rem col-lg-10 col-md-11 col-sm-12">
            <div class="h6 row">
                <div class="col-12">
                    <a href="/#/profil" class="text-light row mx-3 font-weight-bold my-3">{{ user.username }}</a>
                    <form class="form-inline my-1">
                        <div class="form-group col-12 flex inline-block">       
                            <input v-model="body" type="newMessage" name="newMessage" aria-label="Ecrivez votre texte ici" placeholder="Que voulez-vous raconter aujourd'hui?" id="newMessage" class="w-100 py-1">
                        </div>
                        <div class="form-group mx-3 my-md-3 my-sm-2">
                            <input type="file" class="" @change="uploadImage($event)" id="image-input" ref="imageInput" aria-label="Ajouter une image">
                        </div>
                        <div class="form-group my-lg-3 ml-3 my-sm-2">
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
        // Appel API sur le post d'un message
        postMessage(){
            // On vérifie que le post est bien rempli, sinon, on envoie une erreur
            if(this.body.trim() == '') {
                alert('Impossible de poster un message vide!')
                return
            }
            // Si il y'a une image enregistré dans les champs, on crée une constante formData ou on assignera les nouvelles valeurs des champs
            if(this.file) { 
                const formData = new FormData();
                formData.append('body', this.body);
                formData.append('userid', this.user.id);
                formData.append('file', this.file, this.file.name);

                // On envoie formData dans la route post
                http.post('/post/', formData)
                .then(res => {
                    // On actualise le composant message avec le nouveau message crée
                    this.$emit('created', res.data)
                    // On remet une valeur '' aux champs utilisées
                    this.body = '',
                    this.file = ''    
                })
                .catch(() => {
                    alert('Impossible de poster ce message!');
                }) 
            } else {
                // Si il n'y a pas d'image, on enregistre une constante payload
                const payload = {
                    body: this.body,
                    userid: this.user.id
                }
                // On ajoute le payload à la route
                http.post('/post/', payload)
                .then(res => {
                    // On actualise le composant message avec le nouveau message crée
                    this.$emit('created', res.data)
                    // On remet une valeur '' aux champs utilisées
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