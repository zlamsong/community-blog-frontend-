<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand offset-md-1" to="/cover">
      <img src="../assets/logo.png" width="25px" height="25px" alt=""> Blog
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto mr-3">

      <li class="nav-item" v-if="!authUser">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li class="nav-item" v-if="!authUser">
        <router-link class="nav-link" to="/signup">Signup</router-link>
      </li>
      <li class="nav-item" v-if="authUser">
        <router-link class="nav-link" to="/articles/create"><i class="fas fa-plus-circle"></i> New</router-link>
      </li>
      <li class="nav-item" v-if="authUser">
        <router-link class="nav-link" to="/"> Home </router-link>
      </li>
       <li class="nav-item" v-if="authUser"> 
        <router-link class="nav-link" :to="{ path: `/profile/${authUser.id}`, query: { userId: Id }}"> Profile </router-link>
      </li>
      <li class="nav-item dropdown" v-if="authUser">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hey {{authUser.name}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="logoutUser()">Log out</a>
        </div>
        <!-- <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="profileUser()">My profile</a>
        </div> -->
      </li>
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
</nav>
</template>

<script>
// import Axios from 'axios';
// import config from '@/config';

export default {
  
  mounted(){

    console.log(this.$root);
    // this.getProfiles();
  },

  //  data(){

  //       return {
  //           profiles: {},
  //           loading: true,

  //       }
  //   },

  computed: {

    authUser(){

      return this.$root.auth.user;

    },

    Id(){

      return this.$root.auth.user.id;
    }
  },

  methods: {
    logoutUser(){

      localStorage.removeItem("auth");
      this.$root.auth = {};
      this.$noty.success("Successfully logged out!")
      this.$router.push('/cover')
    },

    // getProfiles(url = `${config.apiUrl}/profile`){

    //   this.loading = true

    //   Axios.get(url, {
    //   headers:{
    //     Authorization: `Bearer ${this.$root.auth.auth.access_token}`
    //   }
    //   }).then(response => {
    //     console.log(response);
    //     this.loading = false;

    //     this.profiles = response.data;
    //   });                                                                                                     

    // },
  }
}
</script>

