<template>
<div class="container mt-5">
    <div class="card col-md-8 offset-md-2">
        <div class="card-body text-center">
            <div class="header my-4">
                <h1>My Profile</h1>
            </div>

            <div class="text-center mb-5">
                <img src="../assets/hllogo.jpg" class="g-header__profile-photo rounded-circle" alt=""><br><br>
                 <mark>Fields with ( * ) are optional</mark>
            </div>
            <div class="form text-center">
                <i class="fas fa-2x fa-theater-masks"></i><br>
                <input type="text" class="text-center" placeholder="Your Name" v-model="name">
                    <div class="errors" v-if="errors.name">
                        <small class="text-danger" v-for="error in errors.name" :key="error">{{error}}</small>
                    </div>
                <hr>
                <i class="fas fa-2x fa-baby"></i><br>
                <input type="text" class="text-center" placeholder="DoB (YYYY-MM-DD)" v-model="DoB">
                    <div class="errors" v-if="errors.DoB">
                        <small class="text-danger" v-for="error in errors.DoB" :key="error">{{error}}</small>
                    </div>
                <hr>
                <i class="fas fa-2x fa-map-marker-alt"></i><br>
                <input type="text" class="text-center" placeholder="Place You Live" v-model="place">
                    <div class="errors" v-if="errors.place">
                        <small class="text-danger" v-for="error in errors.place" :key="error">{{error}}</small>
                    </div>
                <hr>
                <i class="fas fa-2x fa-graduation-cap"></i><br>
                <input type="text" class="text-center" placeholder="Your Education *" v-model="education">
                <hr>
                <i class="fas fa-2x fa-at"></i><br>
                <input type="text" class="text-center" placeholder="Your Email *" v-model="email">
                <hr>
                <i class="fas fa-2x fa-mobile-alt"></i><br>
                <input type="text" class="text-center" placeholder="Your Contact(phone) *" v-model="phone">
                <hr>
                <br>

                <button class="btn btn-primary btn-sm mt-5 form-control" @click="makeProfile()" :disabled="loading">
                    <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                        {{loading ? ' ':'Save'}}
                </button>

            </div>
        
        </div>
    </div>

</div>
</template>

<script>
import Axios from 'axios'
import config from '@/config'

export default {

    computed: {

    authUser(){

      return this.$root.auth.user;

    }
  },

    data(){

        return{
            errors:{},
            name:'',
            DoB:'',
            place:'',
            education:'',
            email:'',
            phone:'',
            loading: false,

        }
    },

    methods: {

        makeProfile(){
            this.loading = true

             Axios.post(`${config.apiUrl}/profile`,  {
                nick_name: this.name,
                birthday: this.DoB,
                city: this.place,
                email: this.email,
                phone: this.phone,
                education: this.education,
            }, {
                headers:{
                    Authorization: `Bearer ${this.$root.auth.auth.access_token}`
                }
            }).then(response => {

                console.log(response);

                this.loading = false

                this.$noty.success("Successfully created")

                this.$router.push('/')


            }).catch(({response}) => {

                this.loading = false

                console.log(response);

                this.$noty.error("Oops, Something went wrong!")

                if(response.status === 500){
                    this.errors = {
                        name: ['Your name is cumpolsory.'],
                        DoB: ['Your birth date is cumpolsory.'],
                        place: ['Place where you live/used to live is cumpolsory.']
                    }
                }
                
            })     
        }
    }
    
}
</script>

<style>
.form input[type="text"]{
 border: none;
 outline: none;
 background: transparent;
 margin-top: 5px;
}
</style>


