<template>
  <div class="estimation">
    <div class="head">
      <div class="head--client">
        <router-link to="#">
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
        <p>02/01/2021</p>
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
        <p>Pièce n°1</p>
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
      <input v-if="checked" type="text" placeholder="Frais de livraison en €" />
    </div>

    <div class="validations">
      <router-link to="#">
        <button>Imprimer</button>
      </router-link>
      <router-link to="/">
        <button>Enregistrer</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    checkDelivery: function() {
      this.checked = !this.checked;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.estimation {
  width: 90%;
  margin: auto;
}

.head {
  display: flex;
  justify-content: space-between;
  letter-spacing: remCalc(2);
  padding-top: remCalc(50);
  width: 100%;

  &--client {
    background: var(--main-light);
    box-shadow: 4px 4px 9px rgba(0, 0, 0, 0.16);
    min-width: 45%;

    a {
      display: flex;
      align-items: center;
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
  margin: remCalc(60) 0 remCalc(60);
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

  button {
    border: 3px solid var(--second-color);
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  a:first-child button {
    background: transparent;
    color: var(--second-color);
    padding: remCalc(14) remCalc(48);
  }

  a:last-child {
    margin-left: remCalc(28);

    button {
      background: var(--second-color);
      color: white;
      padding: remCalc(14) remCalc(80);
    }
  }
}
</style>
