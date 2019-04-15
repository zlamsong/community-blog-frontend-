<template>

<div class="card my-3">
    <div class="card-header font-weight-bolder" v-html="article.title.substring(0,50)" >
    </div>

    <div class="card-body">
        <div class="my-3" v-html="article.body.substring(0,200)">
        </div>
        <router-link :to="`/article/${article.id}`" class="btn btn-primary">Read more</router-link>     
    </div> 

    <div class="card-footer">
        <div class="row">
            <small class="col-md-4 mt-2">
                <b><router-link class="nav-link" :to="{ path: `/profile/${article.user_id}`, query: { userId: Id }}"> <i class="fas fa-user-ninja"></i> {{article.user_name}} | {{article.updated_at}} </router-link></b>
            </small>
            <div class="col-md-3 offset-md-5 mt-2">
                <button @click="deleteArticle()" class="btn btn-danger btn-sm ml-3" v-if="article.user_id === authId">
                    <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                    <i class="fas fa-trash-alt" v-else></i>
                </button>

                <router-link :to="`/edit/${article.id}`" class="btn btn-warning btn-sm ml-3" v-if="article.user_id === authId">
                    <i class="fas fa-edit"></i>
                </router-link>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Axios from 'axios';
import config from '@/config';



export default {

    props:["article"],

    data(){
        return {
            loading: false,
            Id: this.article.user_id

        }
    },

    computed: {
        
        authId(){

            return this.$root.auth.user.id;

        },

        // article_id(){

        // return this.article.id;

        // }
    },

    methods: {

        deleteArticle(){

            alert('Are you sure to delete your article?')

            this.loading = true

           Axios.delete(`${config.apiUrl}/article/${this.article.id}`, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(() =>{
                
                // console.log(res);
                 this.$noty.success('Successfully deleted!')
                 this.$router.push('/')
                 setTimeout(function () {
                        location.reload(true)
                    }, 1000)

            }).catch(() => {

                this.loading = false
                this.$noty.error('Oops! something went wrong.')

            })

        }
    }
}
</script>
