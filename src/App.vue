<template>
  <div id="app">
    <navbar />
   
    <div class="container">
      <!-- route is mount up right in this position when entered /login or /signup -->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';

export default {
  
  name: 'app',

  components: {

   Navbar

  }
}
</script>

<style>
  body{
    background-color:whitesmoke;
  }
  *{
    font-family: 'Poppins', sans-serif;
    border-radius: 0px !important;
  }
</style>