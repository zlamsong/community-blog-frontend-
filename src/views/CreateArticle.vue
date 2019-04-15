<template>
<div class="container">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="card my-5">
                <div class="card-body">
                    <picture-input 
                        accept="image/jpeg,image/png" 
                        size="5" 
                        button-class="btn btn-danger"
                        @change="onChange">
                    </picture-input>


                    
                    <input type="text" placeholder="Title" v-model="title" class="form-control my-3">
                    <wysiwyg v-model="content" />

                    <div class="text-center">
                        <button @click="createArticle()" :disabled="loading" class="btn btn-success mt-3 text-center">
                            <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                            {{loading ? '':'Create Article'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import Axios from 'axios'
import config from '@/config'

export default {

    beforeRouteEnter (to, from, next) {
        if(!localStorage.getItem('auth')){
            return next({path: '/login'});
        }

        next()
    },

    mounted(){

        console.log(process.env);
    },

    components: {

        PictureInput
    },

    data(){

        return {
            username: this.$root.auth.user.name,
            title: '',
            image: null,
            content: '',
            loading: false,
        }
    },
    
    methods: {

        onChange(image){

            this.image = image

        },

        createArticle(){

            if(!this.title || !this.image || !this.content) {
                this.$noty.error('Please fill in all fields!')
                return
            }

            this.loading = true

            const form = new FormData();
            form.append('file', this.image);
            form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
            form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

            Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(() =>
            Axios.post(`${config.apiUrl}/article`, {
                user_name: this.username,
                title: this.title,
                image: this.image,
                body: this.content,
            }, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(() => {

                this.loading = false

                this.$noty.success('Successfully created!')
                this.$router.push('/')

            }).catch(() => {

                this.loading = false
                this.$noty.error('Oops! something went wrong.')

            }).catch(() => {

                this.loading = false
                this.$noty.error('Oops! something went wrong.')

            // console.log(res)
            })
            );

        }
    }
}
</script>
