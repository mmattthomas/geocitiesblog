<template>
  <div id="app">
    <div class="navbar">
      <ul class="nav navbar-nav">
        <li v-if="!authUser">
          <router-link to="/sign-in">SignIn</router-link>
        <li v-if="!authUser">
          <router-link to="/sign-up">SignUp</router-link>
        </li>
        <li v-if="authUser">
          <a @click="logout"> Logout</a>
          <a href="#">{{authUser.identifier}}</a>
       </li>
       <li v-if="authUser">
          <router-link to="/new">Create a new URL</router-link>
       </li>
       <li>
         <router-link to="/about">About</router-link>
       </li>
      </ul>
    </div>

    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      authUser:null
    }
  },
  watch:{
    '$route':'setAuthUser'    
    // watching in case route (url path) changes ...btw can be '$route'(to,from)
    // https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5976606?start=0
    // or new way: https://github.com/vuejs/vue-router/tree/dev/examples/route-props
  },
  methods:{
    setAuthUser(){
      this.authUser=firebase.auth().currentUser;
    },
    logout(){
      firebase.auth().signOut()
        .then(()=>{
          this.$router.replace('/sign-in')
          // this.$router.push('/path') would be common way to properly route if not logging out
        })
        .catch((e)=>{
          alert(e.message)
        })
    }
  },
  created(){
    this.setAuthUser();    
  }
}
</script>

<style>
  li {
    font-weight: bolder
  }
	body {
    background-image: url("./assets/blinkstars.gif");
    background-repeat: repeat;
	}
  .panel-default {
  opacity: 0.9;
  margin-top:30px;
  }
  .form-group.last {
  margin-bottom:0px;
  }

  a {
    cursor: pointer;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }
</style>