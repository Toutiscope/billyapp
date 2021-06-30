<template>
  <div class="home" v-if="display">
    <img alt="Illustration" src="../assets/home-illu.svg" />
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav
  },
  data() {
    return {
      display: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/auth");
    } else {
      this.display = true;
    }
  }
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.home {
  height: 100%;
}

.home img {
  position: fixed;
  right: 35px;
  top: -15px;
  min-height: 100%;
}
</style>
