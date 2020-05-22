<template>
  <v-bottom-navigation :value="activeBtn" grow color="green" permanent app>
    <v-btn @click="showOrderList" v-show="$route.name == 'viands' ">
      <span>Order</span>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn
      v-if="$route.name =='dashboard' || $route.name =='orders' || $route.name =='facts'"
      @click="goDashboard"
    >
      <span>Dashboard</span>
      <v-icon>mdi-food</v-icon>
    </v-btn>
    <v-btn
      v-if="$route.name =='dashboard' || $route.name =='orders' || $route.name =='facts'"
      @click="goOrders"
    >
      <span>Orders</span>
      <v-icon>mdi-dropbox</v-icon>
    </v-btn>
    <v-btn
      v-if="$route.name =='dashboard' || $route.name =='orders' || $route.name =='facts'"
      @click="goFacts"
    >
      <span>Facts</span>
      <v-icon>mdi-share</v-icon>
    </v-btn>
    <v-btn
      v-if="$route.name =='dashboard' || $route.name =='orders' || $route.name =='facts'"
      @click="goLogout"
    >
      <span>Logout</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template> 
<script>
import ROUTER from "@/router";

export default {
  name: "Bottom-Nav",
  data() {
    return {
      activeBtn: 1,
    };
  },
  methods: {
    showOrderList() {
      this.$bus.$emit("order-viand", true);
    },
    goLogout(e) {
      e.preventDefault();
      this.$store.dispatch("Logout");
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: "warning",
        title: "Admin! You're logging out."
      });
    },
    goDashboard() {
      ROUTER.push("/dashboard");
    },
    goOrders() {
      ROUTER.push("/orders");
    },
    goFacts() {
      ROUTER.push("/facts");
    }
  }
};
</script>