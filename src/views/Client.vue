<template>
  <div class="client">
    <h1>Client</h1>
    <form>
      <div class="client-status">
        <div id="status">
          <div>
            <input
              type="radio"
              id="professional"
              name="status"
              value="professionnel"
              checked
            />
            <label for="professional">Professionnel</label>
          </div>

          <div>
            <input
              type="radio"
              id="particular"
              name="status"
              value="particulier"
            />
            <label for="particular">Particulier</label>
          </div>
        </div>

        <label for="company" class="pro">Nom de l'entreprise</label>
        <input class="string pro" id="company" name="company" v-model="customer.company" />

        <label for="lastName">Nom de famille du contact</label>
        <input class="string" id="lastName" name="lastName" v-model="customer.lastName" />

        <label for="contactName">Prénom du contact</label>
        <input class="string" id="contactName" name="name" v-model="customer.name" />
      </div>

      <div>
        <label for="street">Numéro et nom de rue</label>
        <input class="string" id="street" name="street" v-model="customer.street" />

        <label for="city">Code postal et Ville</label>
        <input class="string" id="city" name="city" v-model="customer.city" />

        <label for="complement">Complément d'adresse</label>
        <input class="string" id="complement" name="complement" v-model="customer.complement" />

        <label for="tel">Numéro de téléphone</label>
        <input class="string" id="tel" name="tel" v-model="customer.tel" />

        <label for="mail">Adresse email</label>
        <input class="string" id="mail" name="mail" v-model="customer.mail" />

        <label for="note">Remarque</label>
        <input class="string" id="note" name="note" v-model="customer.note" />
      </div>

      <div>
        <button class="btn btn--main" @click.stop.prevent="createCustomer">
          Enregistrer
        </button>
      </div>
    </form>
    <router-link to="/devis">
      Retour Devis
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
// https://www.smashingmagazine.com/2020/01/data-components-vue-js/
// Redirect with data https://stackoverflow.com/questions/49599274/how-to-submit-a-form-in-vue-redirect-to-a-new-route-and-pass-the-parameters

var currentUrl = window.location;

export default {
  data() {
    return {
      customer: {
        status: 2,
        company: null,
        lastName: null,
        name: null,
        street: null,
        city: null,
        complement: null,
        tel: null,
        mail: null,
        note: null,
      },
    };
  },

  created() {
    this.fetchData();
  },

  mounted() {
    console.log(currentUrl);
  },

  methods: {
    fetchData: function() {
      axios
        .get("http://localhost:3000/customer")
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createCustomer: function() {
      let self = this;
      let customer = this.customer;
      axios
        .post(`http://localhost:3000/customer/`, {
          status: customer.status,
          company: customer.company,
          lastName: customer.lastName,
          name: customer.name,
          street: customer.street,
          city: customer.city,
          complement: customer.complement,
          tel: customer.tel,
          mail: customer.mail,
          note: customer.note,
        })
        .then(function(response) {
          if (response.status === 201) {
            self.$router.push("/devis?c=" + response.data._id);
            console.log(response.data._id);
            console.log(self.$router);
          }
        })
        .catch(function(error) {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.client > form > * {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: remCalc(500);
  text-align: left;
}

.client {
  input {
    margin-bottom: 1.2em;
  }
}

#status {
  display: flex;
  margin: 1em 0;

  & > div {
    margin-right: 1.5em;
  }
}
</style>
