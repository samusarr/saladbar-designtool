<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <router-link class="navbar-brand" to="/">Salaattibaari</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link to="/home" class="nav-link">
          Home
        </router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <router-link to="/vaunusuunnittelu" class="nav-link">
          Vaunusuunnittelu
        </router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <router-link to="/raaka-aineet" class="nav-link">
          Raaka-aineet
        </router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <a to="/logout" class="nav-link" @click.prevent="logoutUser">
          Logout
        </a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed:{
    ...mapGetters(["isLoggedIn"]) 
  },
  methods:{
    ...mapActions(['logout']),
    logoutUser(){
      this.logout();
    }
  }
}
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>