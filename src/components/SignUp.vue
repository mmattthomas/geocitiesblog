<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <strong>Register for GEOCITIES URL SHORTENR</strong>
        </div>
        <div class="panel-body">
          <div class="form-horizontal" role="form">
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-3 control-label">
                Email</label>
              <div class="col-sm-9">
                <input type="email" class="form-control" id="inputEmail3" v-model="formData.email" placeholder="jane.doe@email.com" required="">
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
                <button @click="signUp" class="btn btn-success btn-sm">
                  Sign Up</button>
                <button @click="resetForm" class="btn btn-default btn-sm">
                  Reset</button>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <div v-if="errMessage" class="alert alert-danger">
            {{ errMessage }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Signup",
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
    signUp() {
      console.log("[5] beginning signup");
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then(function() {
          this.$router.replace('/new')
        })
        // .then(user => {         
          // console.log("[4] signup success.  updating profile now");
          // user.updateProfile({            
          //   displayName: this.formData.name
          // }).then(function() {
          //   //success
          //   this.$router.replace("/new")
          // }).catch(e2 => {
          //   //error with userProfile update:
          //   this.errMesage = "Error updating profile with name: " + e2.message            
          // })})
        .catch(e => {
          this.errMessage = "Error with signing up: " + e.message          
        });
    },
     resetForm() {
      //this.formData.name = ""
      this.formData.email = ""
      this.formData.password = ""
      this.errMessage = ""
      this.$refs.userName.focus()
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