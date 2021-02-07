<template>
  <div class="estimation">
    <div class="head">
      <div class="head--client">
        <router-link to="/client" class="client-id" v-if="client">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path
              d="M12 5.9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <p>Monsieur Dupont</p>
          <p>Nom de Société</p>
          <p>4 rue Anita Conti</p>
          <p>44300 NANTES</p>
          <p>06 01 02 03 04</p>
          <p>adresse-mail@gmail.com</p>
        </router-link>
        <router-link class="add-client" to="/client" v-if="!client">
          <div class="circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <g fill="none" stroke="#fff" stroke-width="5">
                <path d="M16 0v32M32 16H0" />
              </g>
            </svg>
          </div>
          <p>Ajouter un client</p>
        </router-link>
      </div>
      <div class="head--meta">
        <h1>Devis n°1</h1>
        <p>{{ moment(new Date()).format("DD/MM/YYYY") }}</p>
      </div>
    </div>

    <ul class="table">
      <li>
        <p>Désignation</p>
        <p>Prix unitaire HT</p>
        <p>Quantité</p>
        <p>Total HT</p>
      </li>

      <li>
        <p>Pièce n°1 {{ currentUrl }}</p>
        <p>20 €</p>
        <p>2</p>
        <p>40 €</p>
      </li>
    </ul>

    <router-link to="#" class="add-product">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <g fill="none" stroke="#7de8dd" stroke-width="4">
          <path d="M8 0v16M16 8H0" />
        </g>
      </svg>
      <p>Ajouter une pièce</p>
    </router-link>

    <div class="delivery-options">
      <p>Délai estimé</p>
      <input type="text" placeholder="Optionnel" />
      <p>Frais de livraison</p>
      <div>
        <input
          type="radio"
          value="0"
          name="delivery"
          id="no-delivery"
          :checked="!checked"
          v-on:change="checkDelivery"
        />
        <label for="no-delivery">Non</label>
        <input
          type="radio"
          value="1"
          name="delivery"
          id="delivery-yes"
          v-on:change="checkDelivery"
        />
        <label for="delivery-yes">Oui</label>
      </div>
      <p v-if="checked">Montant</p>
      <input
        v-if="checked"
        required
        type="text"
        placeholder="Frais de livraison en €"
      />
    </div>

    <div class="validations">
      <router-link to="#">
        <button class="btn btn--secondary">Imprimer</button>
      </router-link>
      <router-link to="/">
        <button class="btn btn--main">Enregistrer</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";

Vue.prototype.moment = moment;

var currentUrl = window.location;

export default {
  data() {
    return {
      checked: false,
      client: false,
      currentUrl: currentUrl,
    };
  },
  methods: {
    checkDelivery: function() {
      this.checked = !this.checked;
    },
  },

  mounted() {
      this.currentUrl = this.$route.query.c;
  },
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.estimation {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  width: 90%;
}

.head {
  display: flex;
  justify-content: space-between;
  letter-spacing: remCalc(2);
  padding-top: remCalc(50);
  width: 100%;

  .client-id {
    display: flex;
    flex-flow: column wrap;
    letter-spacing: 0;
    margin: remCalc(10) auto;
    max-height: remCalc(115);
    text-align: left;

    svg {
      height: 80px;
      margin: auto;
      width: 80px;
    }

    path {
      fill: var(--main-color);
      transform: scale(3.5);
    }

    p {
      line-height: remCalc(20);
    }

    p:nth-of-type(1) {
      margin-top: remCalc(6);
      text-align: center;
    }

    p:nth-of-type(5) {
      margin-top: remCalc(6);
    }

    p:nth-of-type(5),
    p:nth-of-type(6) {
      font-weight: 300;
    }
  }

  &--client {
    border: 3px solid var(--main-light);
    box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.16);
    width: 45%;

    .add-client {
      align-items: center;
      background: var(--main-light);
      display: flex;
      font-weight: bold;
      text-transform: uppercase;

      .circle {
        margin: remCalc(33) remCalc(36);
      }
    }
  }

  h1 {
    font-size: remCalc(24);
    font-weight: bold;
    margin-bottom: remCalc(20);
    text-transform: uppercase;
  }

  &--meta {
    text-align: right;
  }
}

.table {
  margin-top: remCalc(95);

  li {
    display: grid;
    grid-template-columns: auto 18% 18% 18%;
    width: 100%;
    text-align: center;
    margin: remCalc(10) 0;

    &:first-child {
      font-weight: bold;
    }

    p:first-child {
      padding-left: remCalc(54);
      text-align: left;
    }

    &:not(:first-child) {
      background: white;
      box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.16);
      padding: remCalc(31) 0;
    }
  }
}

.add-product {
  align-items: center;
  display: flex;
  max-width: 12em;

  p {
    font-weight: bold;
    letter-spacing: 1px;
    margin-left: remCalc(10);
  }
}

.delivery-options {
  align-items: center;
  column-gap: remCalc(30);
  display: grid;
  grid-template-columns: 30% remCalc(250);
  grid-template-rows: auto auto;
  justify-content: flex-end;
  margin: remCalc(60) 0 remCalc(40);
  row-gap: remCalc(25);

  p {
    font-weight: bold;
    letter-spacing: 2px;
    text-align: right;
    text-transform: uppercase;
  }

  input {
    border: none;
    box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.1);
    padding: 0.4em;
  }

  label {
    margin-right: 1rem;
    margin-left: 0.2rem;
  }

  div {
    text-align: left;
  }
}

.validations {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  margin-bottom: remCalc(40);

  a:last-child {
    margin-left: remCalc(28);
  }
}
</style>
