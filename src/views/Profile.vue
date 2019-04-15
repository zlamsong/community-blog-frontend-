<template>

<div class="container my-5">
    <div class="card col-md-9 offset-md-2 mt-5 sad" v-if="this.errors == 500">
        <div class="card-body mt-5">
            <div class=" card-body text-center mt-5 color" v-if="this.errors == 500 && authUserId == userId">
                <h1>Create Profile</h1>
                <router-link class="btn btn-info" to="/profiles/create">Now</router-link> 
            </div>
            <div class="card-body text-center mt-5 color" v-else>
                {{userId}}
                <h1>Oops! No Profile Found</h1>
               
            </div>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-md-8 offset-md-2">
            <div class="card" v-if="!loading">
               <div class="card-body text-center">
                    <div class="header my-4">
                        <h2 style="color:grey;"><i class="fas fa-user-ninja"> </i> Profile <i class="fas fa-user-ninja"> </i></h2>
                    </div>

                    <div class="text-center mb-5">
                        <img src="../assets/hllogo.jpg" class="g-header__profile-photo rounded-circle" alt="">
                    </div>
                    <i class="fas fa-2x fa-theater-masks"></i><br>
                    <b>Name : </b><i>{{profile.nick_name}}</i>
                    <hr>
                    <i class="fas fa-2x fa-baby"></i><br>
                    <b>Date Of Birth : </b><i>{{profile.birthday}}</i>
                    <hr>
                    <i class="fas fa-2x fa-map-marker-alt"></i><br>
                    <b>Place : </b><i>{{profile.city}}</i>
                    <hr>
                    <i class="fas fa-2x fa-graduation-cap"></i><br>
                    <b>Education : </b><i>{{profile.education}}</i>
                    <hr>
                    <i class="fas fa-2x fa-at"></i><br>
                    <b>Email : </b><i>{{profile.email}}</i>
                    <hr>
                    <i class="fas fa-2x fa-mobile-alt"></i><br>
                    <b>Phone : </b><i>{{profile.phone}}</i>
                    <hr>
               </div>
               <div class="col-md-2 offset-md-5 mb-5" v-if="authUserId == userId">
                   <router-link class="btn btn-warning btn-sm form-control" :to="`/editProfile/${this.profile.id}`"><i class="fas fa-edit"></i></router-link>
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
// import Article from '@/components/Article.vue'

export default {

    beforeRouteEnter (to, from, next) {
        if(!localStorage.getItem('auth')){
            return next({path: '/login'});
        }

        next()
    },

    props: ['userId'],

     computed: {

        authUserId(){

        return this.$root.auth.user.id;

    }
  },

    
    mounted(){
        
        this.getProfile();
    },

    data(){

        return {
            profile: {},
            errors:{},
            loading:false,
            url: window.location.href,
        }
    },

    methods: {

        getProfile(){
            this.loading = true

             Axios.get(`${config.apiUrl}/profile/${this.$route.params.id}`, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(response => {
                console.log(response);

                this.loading = false

                this.profile = response.data;
            }).catch(({response}) => {
                this.$noty.error("Oops, no profile found")

                this.loading = false

                console.log(response);

                if(response.status === 500){
                    this.errors = response.status;
                }

                
                
            })     
        }
    }
}
</script>

<style>
.g-header__profile-photo {
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.sad {
  background-image: url("../assets/scene.jpg");
  height: 450px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border: 0px;
}
.color{
    color: white;
}
</style>

