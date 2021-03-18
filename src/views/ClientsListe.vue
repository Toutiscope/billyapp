<template>
  <div id="customersList" v-cloak>
    <form>
      <div class="search-nav">
        <h1>Sélectionnez un client</h1>

        <!-- Create a binding between the searchCustomer model and the text field -->
        <input
          type="text"
          v-model="searchCustomer"
          placeholder="Recherchez un client ou une entreprise"
        />
      </div>
      <!-- {{ filteredCustomers }} -->
      <ul>
        <li
          v-for="(customer, index) in filteredCustomers"
          :key="`customer-${index}`"
        >
          <button type="button" @click="storeCustomer(customer._id)">
            <p v-if="customer.company">
              <strong>{{ customer.company }}</strong>
            </p>
            <p>{{ customer.lastName }} {{ customer.name }}</p>
            <p>{{ customer.mail }}</p>
            <p>{{ customer.tel }}</p>
            <p>{{ customer.street }}</p>
            <p>{{ customer.city }}</p>
            <p>
              <em>{{ customer.note }}</em>
            </p>
          </button>
          <button type="button" class="modify" @click="modifyCustomer(customer._id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M6.4 36.4l32-32 6.5 6.4-32.1 32z" />
              <path
                d="M38.4 5.1l5.7 5.7-31.3 31.3-5.7-5.7L38.4 5.1m0-1.4L5.7 36.4l7.1 7.1 32.8-32.7-7.2-7.1z"
              />
              <g>
                <path d="M5.3 38.2l5.7 5.7L4.2 45z" />
                <path
                  d="M5.6 39.2l4.4 4.4-5.2.8.8-5.2m-.7-2.1l-1.4 8.5 8.5-1.3-7.1-7.2z"
                />
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchCustomer: "",
      customers: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/customer")
      .then((response) => (this.customers = response.data))
      .catch((error) => console.log(error));
  },
  methods: {
    storeCustomer(newCustomer) {
      sessionStorage.customer = newCustomer;
      return this.$router.push("/devis");
    },
    modifyCustomer(newCustomer) {
      sessionStorage.customer = newCustomer;
      return this.$router.push(`/client/${newCustomer}`);
    },
  },
  computed: {
    filteredCustomers: function() {
      var customers_array = this.customers,
        searchCustomer = this.searchCustomer;

      if (!searchCustomer) {
        return customers_array;
      }

      searchCustomer = searchCustomer.trim().toLowerCase();

      customers_array = customers_array.filter(function(item) {
        const namesAndCompany =
          item.name + " " + item.lastName + " " + item.company;

        if (namesAndCompany.toLowerCase().indexOf(searchCustomer) !== -1) {
          return item;
        }
      });
      return customers_array;
    },
  },
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

#customersList {
  p {
    font-size: 16px;
  }

  .search-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2em;

    h1 {
      font-size: remCalc(24);
      font-weight: bold;
      margin-bottom: remCalc(20);
      text-transform: uppercase;
    }

    input {
      min-width: 30vw;
    }
  }

  ul {
    border: 1px solid var(--main-light);
    margin: 2em;
    box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.3);

    li {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    li button {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      padding: 0.8em;
      text-align: left;
      width: 100%;

      &:focus,
      &:active {
        background: var(--main-color);
        outline: 1px solid var(--second-color);
      }
    }

    li:nth-child(odd) {
      background: white;
    }

    li:nth-child(even) {
      // background: #eeeeee;

      & button svg {
        fill: grey;
      }
    }

    p {
      margin: auto 0.5em;
    }
  }

  .modify {
    margin-right: 0.5em;
    padding: 0;
    width: 1.6em;

    svg {
      height: 1.6em;
    }
  }
}
</style>
