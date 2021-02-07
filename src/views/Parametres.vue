<template>
  <div class="parameters">
    <div class="title">
      <h3>Matériau</h3>

      <svg
        aria-hidden="true"
        data-prefix="fas"
        data-icon="cubes"
        class="svg-inline--fa fa-cubes fa-w-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"
        />
      </svg>
    </div>
    <form @submit="updateMaterial">
      <div id="material">
        <label class="name" for="materialName">Nom du matériau</label>
        <input type="text" id="materialName" v-model="material.name" required />

        <label for="priceMaterialKg">Prix de la bobine au kilo</label>
        <input
         id="priceMaterialKg"
          type="number"
          min="0"
          step="0.01"
          v-model="material.priceKg"
          required
        />

        <label for="fdp">Frais de port</label>
        <input
        id="fdp"
          type="number"
          min="0"
          step="0.01"
          v-model="material.shippingFees"
          required
        />

        <label for="nbMaterialOrdered">Nb de bobines par commande</label>
        <input
        id="nbMaterialOrdered"
          type="number"
          min="0"
          step="0.01"
          v-model="material.nbOrdered"
          required
        />

        <label for="fdpandMaterial">1 bobine + fdp divisés</label>
        <input
        id="fdpandMaterial"
          type="number"
          min="0"
          step="0.01"
          v-model="material.feesandMaterial"
        />
      </div>
      <!-- <span>{{ calcul() }}</span> -->
      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// https://www.smashingmagazine.com/2020/01/data-components-vue-js/

export default {
  data() {
    return {
      material: {
        name: null,
        priceKg: null,
        shippingFees: null,
        nbOrdered: null,
        feesandMaterial: null,
        id: null,
      },
    };
  },

  created() {
    this.fetchData();
  },

  updated() {
    this.calcul();
  },

  methods: {
    fetchData: function() {
      let material = this.material;
      axios
        .get("http://localhost:3000/material")
        .then(function(response) {
          // console.log(response.data);

          material.id = response.data[0]._id;

          material.name = response.data[0].name;
          material.priceKg = response.data[0].priceKg;
          material.shippingFees = response.data[0].shippingFees;
          material.nbOrdered = response.data[0].nbOrdered;
          // material.feesandMaterial =
          //   response.data[0].shippingFees / response.data[0].nbOrdered +
          //   response.data[0].priceKg;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    calcul: function() {
      let material = this.material;

      material.feesandMaterial = (
        material.shippingFees / material.nbOrdered +
        material.priceKg
      ).toFixed(2);

      return material.feesandMaterial;
    },
    // newMaterial: function() {
    //   let material = this.material;
    //   axios
    //     .post("http://localhost:3000/material", {
    //       name: material.name,
    //       priceKg: material.priceKg,
    //       shippingFees: material.shippingFees,
    //       nbOrdered: material.nbOrdered,
    //       feesByNb: material.feesandMaterial,
    //     })
    //     .then(function(reponse) {
    //       alert(reponse);
    //     })
    //     .catch(function(error) {
    //       alert(error);
    //     });
    // },

    updateMaterial: function() {
      let material = this.material;
      axios
        .put(`http://localhost:3000/material/${material.id}`, {
          name: material.name,
          priceKg: material.priceKg,
          shippingFees: material.shippingFees,
          nbOrdered: material.nbOrdered,
          feesByNb: material.feesandMaterial,
        })
        .then(function() {
          alert("Enregistré");
        })
        .catch(function(error) {
          alert(error);
        });
    },
  },
};

// export default {
//   props: {
//     value: Object
//   },
//   data() {
//     return {
//       material: {...this.value},
//       // result: material.shippingFees / material.nbOrdered + material.priceKg
//     }
//   },
//   methods: {
//     newMaterial: function() {
//       this.$emit("submit");
//     },
//   },
// };
</script>

<style lang="scss">
@import "../styles/globalStyles.scss";

.title {
  align-items: center;
  border-bottom: 2px solid #662483;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 5px -2px;
  margin: 0 0 4rem 0;
  padding: 0.5rem 2.5rem;

  svg {
    height: 35px;
    fill: #54cac0;
  }

  h3 {
    margin-left: 1em;
    margin-right: 1em;
  }
}

#material {
  align-items: center;
  display: grid;
  grid-template-columns: 50% 35%;
  margin: 0 5vw;
  row-gap: 1.7rem;
  text-align: right;

  .name {
    font-weight: bold;
  }

  input {
    margin-left: 4vw;
    text-align: center;

    &:last-child {
      border: 1px solid rgb(219, 219, 219);
      background: #f5f5f5;
      box-shadow: none;
    }
  }
}

button {
  color: #ffffff;
  font-weight: bold;
  background: #54cac0;
  border: none;
  border-radius: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin-top: 10vh;
  margin-left: 32%;
  padding: 0.8em 2em;
  min-width: 40%;
}
</style>
