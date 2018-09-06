<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <strong>Login to GEOCITIES</strong>
        </div>
        <div class="panel-body">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-3 control-label">
                Email</label>
              <div class="col-sm-9">
                <input type="email" class="form-control" id="inputEmail3" v-model="formData.email" placeholder="Email" required="">
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword3" class="col-sm-3 control-label">
                Password</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="inputPassword3" v-model="formData.password" placeholder="Password" required="">
              </div>
            </div>
            <div class="form-group last">
              <div class="col-sm-offset-3 col-sm-9">
                <button @click.prevent="signIn" class="btn btn-success btn-sm">
                  Sign in</button>
                <button @click="resetForm" class="btn btn-default btn-sm">
                  Reset</button>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          Not Registered? <a href="/sign-up">Register here</a>
        </div>
        <div v-if="errMessage" class="alert alert-danger">
          {{ errMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      formData: {
        email: "",
        password: ""
      },
      errMessage: ""
    };
  },
  methods: {
    signIn() {
			//
			console.log('sign-in clicked')
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formData.email, this.formData.password)
        .then(user => {
					console.log("Signed in Successfully... redirecting:")
					this.$router.replace("/new");
					
        })
        .catch(e => {
					console.log("Error on signin ...:" + e.message)
          this.errMessage = e.message;
          //alert(e.message);
        })
    },
    resetForm() {
      this.formData.email = ""
      this.formData.password = ""
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>