<template>
  <div>
    <v-container fluid>
      <v-data-table :headers="headers" :items="Orders" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Orders</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="success" v-text="'Get all orders'"></v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="getViands">Reset</v-btn>
        </template>-->
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "OrderedViand",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Viand",
        align: "start",
        sortable: false,
        value: "viands[0]._name"
      },
      {
        text: "Order by",
        value: "costumer_name",
        sortable: false,
        align: "center"
      },
      { text: "Quantity", value: "viands[0]._qty", align: "center" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: []
  }),
  mounted() {
    this.$store
      .dispatch("GetOrders")
      .then(res => {
        console.log(res);
        this.$store.commit("setOrderToDisplay", res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.Orders, " Orders");
  },
  computed: {
    Orders() {
      return this.$store.getters.getOrderToDisplay;
    },
    Viands() {
      return this.viand._name;
    }
  },

  methods: {
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    }
  }
};
</script>