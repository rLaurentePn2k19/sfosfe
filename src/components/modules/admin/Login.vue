<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-toolbar color="orange" dark flat>
          <v-toolbar-title>Admin</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <br>
        <v-card-text>
          <v-form ref="login_form">
            <v-text-field
              v-model="username"
              label="Username"
              name="username"
              :prepend-icon="'mdi-account'"
              :rules="[rules.required]"
              @click:append="show1 = !show1"
              type="text"
              v-on:keyup.enter="Login"
            />
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Password"
              counter
              @click:append="show1 = !show1"
              :prepend-icon="'mdi-lock'"
              v-on:keyup.enter="Login"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="Login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Login-Form",
  data() {
    return {
      dialog: false,
      show1: false,
      username: "",
      password: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  mounted() {
    this.$bus.$on("login-form", showForm => {
      this.dialog = showForm;
    });
  },
  methods: {
    Login(e) {
      e.preventDefault();
      if (this.username == "" || this.password == "") {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in the provided fields."
        });
      } else {
        const obj = {
          username: this.username,
          password: this.password
        };
        this.$store
          .dispatch("Login", obj)
          .then(res => {
            const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              onOpen: toast => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: "success",
              title: "Admin! Signed in successfully"
            });
            this.dialog = false;
            this.$refs.login_form.reset();
            console.log(res);
          })
          .catch(err => {
            this.$refs.login_form.reset();
            this.$swal.fire(
              "Incorrect username or password!",
              "Please try again",
              "error"
            );
            console.log(err);
          });
      }
    }
  }
};
</script>