<template>
<div v-if="!loading">

    <div class="d-flex mt-5 justify-content-between">
        <button @click="getPrevArticles()" :disabled="articles.links.prev === null" class="btn btn-warning">Prev page</button>
        <button @click="getNextArticles()" :disabled="articles.links.next === null" class="btn btn-warning">Next page</button>
    </div>

    <div class="card-body">

        <div class="row" v-if="!loading">
        <div class="col-md-8 offset-md-2 mb-5">
            <input type="text" v-model="search" placeholder="search article" class="form-control search">
        </div>

        <div class="col-md-8 offset-md-2" v-for="article in filteredArticle" :key="article.id">
            <Article :article='article'/>
        </div>
    </div>
    <div class="loader text-center" v-else>
        <!-- <img src="../assets/logo.png" width="100%" height="100%" alt=""> -->
         <i class="fas fa-6x fa-spin fa-spinner"></i>
    </div>

    </div>
            
</div>
<div class="loader text-center mt-5" v-else>
    <i class="fas fa-6x fa-spin fa-spinner"></i>
</div>

</template>

<script>
import Axios from 'axios';
import config from '@/config';
import Article from '@/components/Article.vue'

export default {

    components: {
        Article
    },

    mounted(){
        this.getArticles();
    },

    data(){

        return {
            search: '',
            articles: {},
            loading: true,

        }
    },

    methods: {

        getArticles(url = `${config.apiUrl}/article`){

            this.loading = true

            Axios.get(url, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(response => {
                console.log(response);
                this.loading = false;

                this.articles = response.data;
            });                                                                                                     

        },

        getNextArticles(){

            this.getArticles(this.articles.links.next);
        },

        getPrevArticles(){

            this.getArticles(this.articles.links.prev);
        },

    },

    computed: {

        filteredArticle: function(){

            return this.articles.data.filter((article) => {

                return article.title.match(this.search)
            
            })
        }
    }

}
</script>

<style>
.btn-warning{
    color: aliceblue
}
.search{
 border: none;
 outline: none;
 background: transparent;
 margin-top: 5px;
 border-bottom: 1px solid gray;
}
</style>