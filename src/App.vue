<template>
  <v-app id="app">
    <Header v-on:showSideNavEvent="showSideNav"></Header>
    <Sidebar
      v-if="(!width && $route.name =='dashboard' && isNav )|| ( !width && $route.name =='orders' && isNav) || ( !width && $route.name =='facts' && isNav)"
    ></Sidebar>
    <v-content>
      <Body></Body>
    </v-content>
    <BotNav v-if="$route.name =='viands' || width "></BotNav>
  </v-app>
</template>

<style>
#app {
  margin-bottom: 5%;
}
</style>

<script>
import Sidebar from "@/components/frame/Sidebar.vue";
import BotNav from "@/components/frame/BottomNav.vue";
import Header from "./components/frame/Header.vue";
import Body from "./components/frame/Body.vue";

export default {
  name: "App",
  data() {
    return {
      show: true,
      isLess: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  components: {
    Header,
    Body,
    Sidebar,
    BotNav
  },
  computed: {
    isNav() {
      return this.show;
    },
    width() {
      if (this.window.width < 600) {
        this.$bus.$emit("mobile-view", true);
        return true;
      } else {
        this.$bus.$emit("desktop-view", true);
        return false;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    showSideNav(e) {
      this.show = e;
    }
  },
  mounted() {
    this.$bus.$emit("viands", this.$store.getters.getViands);
  }
};
</script>
