<template>
  <div id="customersList" v-cloak>
    <form>
      <div class="bar">
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
          <p><strong>{{ customer.company }}</strong></p><p> {{ customer.lastName }} {{ customer.name }}</p><p>{{ customer.mail }}</p><p>{{ customer.tel }}</p><p>{{ customer.street }}</p><p>{{ customer.city }}</p><p><em>{{ customer.note }}</em></p>
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
  computed: {
    filteredCustomers: function() {
      var customers_array = this.customers,
        searchCustomer = this.searchCustomer;

      if (!searchCustomer) {
        return customers_array;
      }

      searchCustomer = searchCustomer.trim().toLowerCase();

      customers_array = customers_array.filter(function(item) {
        if (item.name.toLowerCase().indexOf(searchCustomer) !== -1 || item.company.toLowerCase().indexOf(searchCustomer) !== -1) {
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
  ul {
      padding: 2em;

    li {
        display: flex;
        padding: 0.5em;
        text-align: left;
    }
    li:nth-child(odd) {
      background: #e4e4e4;
    }

    li:nth-child(even) {
      background: white;
    }

    p {
        margin: auto 0.5em;
    }
  }
}
</style>
