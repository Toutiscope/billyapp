<template>
  <div class="auth">
    <div class="box">
      <Login />
      <!-- <Signup /> -->
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
// import Signup from "../components/Signup.vue";
export default {
  name: "Auth",
  components: {
    Login
    // Signup
  }
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.auth {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}

h1 {
  font-size: remCalc(22);
  font-weight: bold;
  margin: 1.5em auto 2.5em;
  text-transform: uppercase;
}

.box {
  background: var(--grey-light);
  border: 5px solid var(--main-color);
  box-shadow: var(--main-shadow);
  height: 30em;
  width: 25em;

  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    padding: 2em;
  }

  label {
    text-align: left;
  }

  input {
    margin: 0.5em 0 2em;
    padding: 0.8em;
  }

  button {
    margin-top: 2.5em;
  }
}
</style>
