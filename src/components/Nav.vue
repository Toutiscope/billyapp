<template>
  <div class="home">
    <ul class="nav">
      <li>
        <router-link to="/devis">
          Nouveau devis
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <g fill="none" stroke="#fff" stroke-width="5">
              <path d="M16 0v32M32 16H0" />
            </g>
          </svg>
        </router-link>
      </li>
      <li>
        <a href="#">
          Nouveau client
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <g fill="none" stroke="#fff" stroke-width="5">
              <path d="M16 0v32M32 16H0" />
            </g>
          </svg>
        </a>
      </li>
      <li>
        <a href="#"> Mes devis / factures</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.nav {
  background: var(--main-color);
  box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 0 remCalc(70);
  position: fixed;

  li {
    background: var(--main-light);
    box-shadow: 2px 4px 9px 1px rgba(0, 0, 0, 0.35);
    margin: remCalc(20) 0;

    a {
      align-items: center;
      color: var(--font-color);
      display: flex;
      font-size: remCalc(18);
      font-weight: bold;
      justify-content: space-between;
      letter-spacing: remCalc(2);
      padding: remCalc(46);
      text-transform: uppercase;
    }

    svg {
      margin-left: remCalc(62);
    }
  }
}
</style>
