<template>
  <v-container fluid>
    <br>
    <div class="text-center">
      <h1 style="font-style: italic;">
        <v-icon medium>mdi-lightbulb-outline</v-icon>
        {{text}}
      </h1>
      <div class="align-end"></div>
    </div>
    <CardFact/>
  </v-container>
</template>

<script>
import CardFact from "@/components/modules/admin/CardFact.vue";

export default {
  data: () => ({
    text: "Facts"
  }),
  components: { CardFact },
  mounted() {
    this.$store
      .dispatch("GetFacts") 
      .then(res => {
        console.log(res.data);
        this.$store.commit("setFacts", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>