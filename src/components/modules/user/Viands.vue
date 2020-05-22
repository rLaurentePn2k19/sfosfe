<template>
  <v-lazy
    v-model="isActive"
    :options="{
          threshold: .5
        }"
    min-height="300"
    transition="fade-transition"
  >
    <v-item-group multiple>
      <h1 class="text-center" style="font-style: italic; margin-top: 2%;">Available Viands</h1>
      <v-container>
        <v-row>
          <v-col v-for="viand in viands_To_Display" :key="viand.id" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="200"
                @mouseenter="toggle"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="viand._image[0]"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-scroll-y-transition>
                    <div v-if="active" class="display-3 flex-grow-1 text-center">
                      <v-btn
                        color="primary"
                        medium
                        @click="addToCart(viand._id)"
                      >{{viand._selected ? added : add }}</v-btn>
                      <v-form>
                        <v-text-field
                          label="Quantity"
                          :prepend-icon="'mdi-plus'"
                          type="number"
                          class="test"
                          v-model="viand._qty"
                          @change="changeQuantity(viand._id)"
                          outlined
                        />
                      </v-form>
                    </div>
                  </v-scroll-y-transition>
                  <v-card-title>{{viand._name}}</v-card-title>
                </v-img>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <Order></Order>
      </v-container>
    </v-item-group>
  </v-lazy>
</template>

<style scoped>
.test {
  width: 135px !important;
  position: absolute !important;
  right: 0 !important;
  margin-right: 10px;
}
</style>

<script>
import Order from "@/components/modules/user/Order.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      added: "Added",
      add: "Add"
    };
  },
  components: {
    Order
  },
  computed: {
    ...mapState(["viands_To_Display", "viands_To_Order"])
  },
  mounted() {
    this.$store
      .dispatch("GetUploadedViands")
      .then(res => {
        console.log(res);
        this.$store.commit("setViands", res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.viands_To_Display);
  },
  methods: {
    changeQuantity(id) {
      console.log(id);
      this.viands_To_Display.forEach(viand => {
        console.log(viand._qty, " this qty");
      });
    },
    addToCart(id) {
      this.viands_To_Display.filter(viand => {
        if (viand._id == id) {
          if (viand._selected == true) {
            this.$swal.fire({
              icon: "warning",
              title: `${viand._name} is already added.`
            });
          } else {
            this.$store.commit("setOrders", viand);
            viand._selected = true;
          }
        }
      });
      console.log(this.viands_To_Order, " order viands");
    }
  }
};
</script>

