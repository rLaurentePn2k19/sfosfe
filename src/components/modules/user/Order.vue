<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350" scrollable>
      <v-card>
        <v-toolbar color="orange" dark flat>
          <v-toolbar-title>Order</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <br>
        <v-card-text>
          <v-form>
            <v-text-field label="Name" :prepend-icon="'mdi-account'" type="text" v-model="name"/>
          </v-form>
          <v-list flat>
            <v-subheader>Viand/s you order:</v-subheader>
            <v-list-item-group>
              <v-list-item v-for="(order, i) in viands_To_Order" :key="i._id">
                <v-list-item-icon>
                  <v-btn fab small color="error" text @click="removeViand(order._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="order._name +' : '+ order._qty "></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelOrder">Cancel</v-btn>
          <v-btn color="primary" @click="sendOrder">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<style>
#orderBtn {
  margin-right: 25px !important;
}
</style>


<script>
import { mapState } from "vuex";

export default {
  name: "Order-Form",
  data() {
    return {
      loading: false,
      dialog: false,
      name: "",
      temp_order: []
    };
  },
  computed: {
    ...mapState(["viands_To_Order"]),
    GetOrders(){
      return this.$store.getters.getOrders
    }
  },
  mounted() {
    this.$bus.$on("order-viand", bol => {
      if (this.viands_To_Order.length) {
        this.dialog = bol;
      } else {
        this.$swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You should choose viand/s first."
        });
      }
    });
  },
  methods: {
    cancelOrder() {
      this.dialog = false;
      this.name = "";
      this.$store.state.viands_To_Display.filter(viand => {
        viand._selected = false;
        viand._qty = 1;
      });
      this.$store.commit("clearOrders");
    },
    removeViand(id) {
      console.log("removed", id);
      // remove selected viand from the order list
      this.GetOrders.forEach(viand => {
        if (id == viand._id) {
          this.$store.commit("removeOrder", viand._id)
        }
      });
    },
    sendOrder() {
      // a method for sending the order to the back end
      if (this.name == "") {
        this.$swal.fire({
          icon: "warning",
          title: "Hey!",
          text: "Please indicate you nickname/name."
        });
      } else {
        const new_Order = {
          costumer_name: this.name,
          orders: this.$store.getters.getOrders
        };
        console.log(new_Order, " new Order");
        this.$store
          .dispatch("SendOrder", new_Order)
          .then(res => {
            setTimeout(() => (this.loading = false), 2000);
            setTimeout(() => (this.dialog = false), 500);
            this.$store.state.viands_To_Display.filter(viand => {
              viand._selected = false;
              viand._qty = 1;
            });
            this.name = "";
            this.$swal.fire("Yehey!", "Successfully order.", "success");
            this.$store.commit("clearOrders");
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
