<template>
  <div class="home">
    <img alt="Illustration" src="../assets/home-illu.svg" />
    <Nav/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav
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
