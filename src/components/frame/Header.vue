<template>
  <v-app-bar app color="orange" dark>
    <v-app-bar-nav-icon
      v-if="($route.name =='dashboard' && !isSmall)|| ($route.name =='orders' && !isSmall) || ($route.name =='facts' && !isSmall)"
      @click="showNav"
      v-show="!hide && !isSmall"
    ></v-app-bar-nav-icon>
    <v-btn
      v-if="($route.name =='dashboard' && !isSmall)|| ($route.name =='orders' && !isSmall) || ($route.name =='facts' && !isSmall)"
      text
      fab
      small
      v-show="hide && !isSmall"
      @click="showNav"
    >
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>

    <div class="d-flex align-center">
      <v-img
        class="shrink mr-2"
        contain
        :src="require('@/assets/logo2.png')"
        transition="scale-transition"
        width="40"
      />
    </div>
      <v-toolbar-title style="font-style: italic;" id="test">Softype Food Order System</v-toolbar-title>
    <v-spacer v-for="n in 40" :key="n"></v-spacer>
    <v-btn
      v-on:click="home"
      target="_blank"
      text
      small
      v-if="$route.name =='viands' || $route.name =='home' || $route.name =='' " 
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-divider class="mx-1" inset vertical v-if="$route.name =='viands' || $route.name =='home' || $route.name =='' " ></v-divider>
    <v-btn
      v-on:click="viewViands"
      target="_blank"
      text
      small
      v-if="$route.name =='viands' || $route.name =='home' || $route.name =='' " 
    >
      <v-icon>mdi-food-variant</v-icon>
    </v-btn>
    <v-divider class="mx-1" inset vertical v-if="$route.name =='viands' || $route.name =='home' || $route.name =='' " ></v-divider>
    <AddViand></AddViand>
    <v-btn
      text
      fab
      small
      @click="showViandForm"
      v-if="$route.name =='dashboard' ||$route.name =='facts' "
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn text small @click="showLoginForm" v-if="$route.name =='viands' || $route.name =='home' || $route.name =='' " >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <AdminLogin></AdminLogin>
  </v-app-bar>
</template>


<style>
@media only screen and (max-width: 600px) {
  #test {
    font-size: 13px;
  }
  @media screen and (max-width: 400px) {
    #test {
      font-size: 10px;
    }
  }
}
</style>

<script>
import ROUTER from "@/router";
import AddViand from "@/components/modules/admin/AddViand.vue";
import AdminLogin from "@/components/modules/admin/Login.vue";

export default {
  name: "Header",
  data() {
    return {
      hide: true,
      isSmall: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  components: {
    AdminLogin,
    AddViand
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    showViandForm() {
      this.$bus.$emit("viand-form", true);
    },
    showLoginForm() {
      this.$bus.$emit("login-form", true);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    viewViands() {
      ROUTER.push("/viands");
    },
    home() {
      ROUTER.push("/home");
    },
    showNav() {
      this.hide = !this.hide;
      this.$emit("showSideNavEvent", this.hide);
    }
  },
  mounted() {
    if (this.window.width < 600) {
      this.hide = true;
      this.isSmall = true;
    }
    this.$bus.$on("mobile-view", mv => {
      console.log(mv);
      this.isSmall = mv;
    });

    this.$bus.$on("desktop-view", dv => {
      console.log(dv);
      this.isSmall = !dv;
    });
  }
};
</script>