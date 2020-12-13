<template>
  <div class="container" id="parameters">
    <form method="post">
      <h3>Matière</h3>
      <label for="materialName">Nom du matériau</label>
      <input class="string" v-model="materialName" required />

      <label for="priceMaterialKg">Prix de la bobine au kilo</label>
      <input v-model="priceMaterialKg" class="data" required />

      <label for="fdp">Frais de port</label>
      <input class="data" v-model="fdp" required />

      <label for="nbMaterialOrdered">Nb de bobines par commande</label>
      <input class="data" v-model="nbMaterialOrdered" required />

      <label for="fdpandMaterial">1 bobine + fdp divisés</label>
      <input class="data dataResult" v-model="fdpandMaterial" />
      <button @click="insertParams()">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import uri from "../db";
console.log(uri);

export default {
  data() {
    return {
      materialName: "PLA",
      priceMaterialKg: 0,
      fdp: 0,
      nbMaterialOrdered: 0,
      fdpandMaterial: 0,
    };
  },
  methods: {
    insertParams: function(e) {
      e.preventDefault();
      console.log("params inserted");
    },
  },
};
</script>

<style lang="scss">
#parameters form {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  text-align: left;

  input {
    margin-bottom: 1rem
  }
}
</style>