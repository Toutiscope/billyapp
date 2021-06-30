<template>
  <div class="login">
    <h1>Connexion</h1>
    <form name="form" @submit.prevent="handleLogin">
      <label for="email">Votre email</label>
      <input v-model="user.mail" type="text" id="email" name="mail" />
      <label for="password">Votre mot de passe</label>
      <input
        v-model="user.password"
        type="password"
        id="password"
        name="password"
      />
      <button type="submit" class="btn btn--main" :disabled="loading">
        Connexion
      </button>
    </form>
    <div v-if="message" role="alert" class="wrong">{{ notification }}</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        mail: null,
        password: null
      },
      loading: false,
      message: null,
      notification: null
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
      console.log("Yet logged");
    }
  },
  methods: {
    handleLogin() {
      //   this.loading = true;
      //   this.$validator.validateAll().then(isValid => {
      //     if (!isValid) {
      //       this.loading = false;
      //       return;
      //     }

      if (this.user.mail && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.message = "Bonjour !";
            this.$router.push("/");
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(error.response.status);
            if (error.response.status === 401) {
              this.notification =
                "L'identifiant et/ou le mot de passe sont incorrects";
            }
          }
        );
      }
      //   });
    }
  }
};
</script>

<style lang="scss">
.wrong {
  color: red;
}
</style>
