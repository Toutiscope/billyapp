<template>
  <div class="login">
    <h1>Inscription</h1>
    <form>
      <label for="email">Votre email</label>
      <input type="text" id="email" />
      <label for="password">Votre mot de passe</label>
      <input type="text" id="password" />
      <label for="password2">Confirmation du mot de passe</label>
      <input type="text" id="password2" />
      <button type="submit" class="btn btn--main">Inscription</button>
    </form>
  </div>
</template>

<style lang="scss">
@import "../styles/globalStyles.scss";
</style>
