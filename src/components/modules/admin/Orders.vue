<template>
  <div>
    <OrderedViand/>

    <!-- <v-data-table
        :loading="show"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="show ? test : desserts"
        item-key="name"
        group-by="category"
        class="elevation-1"
    ></v-data-table>-->
  </div>
</template>

<script>
import OrderedViand from "@/components/modules/admin/OrderedViand.vue";

export default {
  name: "Orders",
  data() {
    return {
      show: true,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name",
          sortable: false,
          groupable: false
        },
        {
          text: "Category",
          value: "category",
          groupable: false,
          align: "right",
          sortable: false
        },
        { text: "Dairy", value: "dairy", align: "right", sortable: false }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
          dairy: "Yes"
        },
        {
          name: "Ice cream sandwich",
          category: "Ice cream",
          dairy: "Yes"
        }
      ]
    };
  },
  components: {
    OrderedViand
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 2000);
  },
  computed: {
    test() {
      return [];
    }
  }
};
</script>