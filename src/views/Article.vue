<template>
<div class="container my-5">
    <div class="row">
        <div class="col-md-10 offset-md-1">
            <div class="card" v-if="!loading">
                <img height="100%" :src="article.image" alt="" class="card-img-top">

                <div class="card-body">
                    <h3 class="card-title text-center font-weight-bolder my-3">{{article.title | to-uppercase}}</h3>
                    <hr>
                    <div class="article-content" v-html="article.body"></div>
                    <div class="comments my-4">
                      <vue-disqus shortname="vue-blog" :identifier="article.id" url="url"></vue-disqus>
                    </div>   
                </div>
            </div>
            <div class="loader text-center" v-else>
                 <i class="fas fa-6x fa-spin fa-spinner"></i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Axios from 'axios'
import config from '@/config'


export default {
    
    mounted(){
        
        this.getArticle();
    },

    data(){

        return {
            article: {},
            loading:true,
            url: window.location.href,
        }
    },

    methods: {

        getArticle(){

             Axios.get(`${config.apiUrl}/article/${this.$route.params.id}`, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(response => {
                console.log(response);

                this.loading = false

                this.article = response.data.data;
            });     
        }
    }
}
</script>
