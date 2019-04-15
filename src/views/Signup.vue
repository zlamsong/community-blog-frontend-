<template>
<div class="row mt-5">
     <div class="col-md-5 offset-md-3">
        <div class="card">
            <div class="card-body">
                <h3 class="text-center my-3">Signup</h3>
                
                <div class="form-group">
                    <input v-bind:class="{'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted}" v-model="name" type="text" placeholder="Name" class="form-control" name="name" id="name">
                    <div class="errors" v-if="errors.name">
                        <small class="text-danger" v-for="error in errors.name" :key="error">{{error}}</small>
                    </div>
                </div>

                <div class="form-group">
                    <input v-bind:class="{'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted}" v-model="email" type="text" placeholder="Email" class="form-control" name="email" id="email">
                    <div class="errors" v-if="errors.email">
                        <small class="text-danger" v-for="error in errors.email" :key="error">{{error}}</small>
                    </div>
                </div>
                <div class="form-group">
                    <input v-bind:class="{'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted}" v-model="password" type="password" placeholder="Password" class="form-control" name="password" id="password">
                    <div class="errors" v-if="errors.password">
                        <small class="text-danger" v-for="error in errors.password" :key="error">{{error}}</small>
                    </div>
                </div>
                <div class="form-group text-center">
                    <button @click="registerUser()" class="btn btn-primary form-control" :disabled="loading">
                        <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                        {{loading ? '':'Signup'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Axios from 'axios';

import config from '@/config';
// import { error } from 'util';

export default {

    beforeRouteEnter (to, from, next) {
        if(localStorage.getItem('auth')){
            return next({path: '/'});
        }

        next()
    },

    data(){

        return{
            name: '',
            email: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false,
        }
    },

    methods: {

        registerUser(){

            this.loading = true
            // console.log(this.name, this.email, this.password);
            Axios.post(`${config.apiUrl}/register`, {

                name: this.name,
                email: this.email,
                password: this.password,

            }).then((response) =>{

                this.loading = false

                this.submitted = true

                // console.log(response);

                // const {data} = response.data

                //  localStorage.setItem("auth", JSON.stringify(data))

                localStorage.setItem('auth', JSON.stringify(response.data))

                this.$root.auth = response.data;

                this.$noty.success("Your profile has been saved!")

                this.$router.push('/')

            }).catch(({response}) => {

                this.$noty.error("Oops, something went wrong!")

                this.loading = false

                this.submitted = true

                // console.log(response);

                this.errors = response.data.errors;
            })


        }
    }
}



</script>