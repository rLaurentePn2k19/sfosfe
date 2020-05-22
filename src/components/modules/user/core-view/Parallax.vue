<template>
  <div>
    <v-lazy
      v-model="isActive"
      :options="{
          threshold: .5
        }"
      transition="fade-transition"
    >
      <v-parallax dark :src="require('@/assets/food.jpg')">
        <v-row align="center" justify="center" v-if="!isSmall">
          <v-col class="text-center" cols="12">
            <br>
            <br>
            <br>
            <div id="myDiv" >
              <h1
                class="display-2 font-weight-thin mb-2"
                style="border: 5px solid white; margin-left: 18%; margin-right: 18%; padding: 4%;"
              >
                We are
                <strong class="ball">ONE</strong>, we eat as
                <strong>FAMILY<v-icon color="red" class="ball">mdi-heart</v-icon></strong>
              </h1>
            </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-else-if="isSmall">
          <v-col class="text-center" cols="12">
            <div class="text-center">
              <div id="myDiv" >
                <h1
                  style="border: 5px solid white; padding: 5%;"
                  v-bind:class="isSmall ? this.smallClass : this.bigClass"
                >
                  We are
                  <strong>ONE</strong>, we eat as
                  <strong>FAMILY<v-icon color="red" class="ball">mdi-heart</v-icon></strong>
                </h1>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    </v-lazy>
  </div>
</template>

<style>

.ball {
  /* margin-top: 50px; */
  /* border-radius: 50%; */
  width: 50px;
  /* height: 50px; */
  /* background-color: cornflowerblue; */
  /* border: 2px solid #999; */
  animation: bounce 0.5s infinite alternate;
  -webkit-animation: bounce 0.5s infinite alternate;
}
@keyframes bounce {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-15px);
  }
}
@-webkit-keyframes bounce {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-15px);
  }
}

#myDiv {
  top: 10px;
  margin: auto;
  width: 60%;
  position: relative;
  -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
  animation-name: example;
  animation-duration: 6s;
  animation-iteration-count: infinite;
}


/* Safari 4.0 - 8.0 */
@-webkit-keyframes example {
  0% {
    left: 0px;
    top: 10px;
  }
  25% {
    left: 70px;
    top: 50px;
  }
  50% {
   left: -75px;
    top: 50px;
  }
  75% {
    left: -50px;
    top: -100px;
  }
  100% {
    left: 0px;
    top: 10px;
  }
}

/* Standard syntax */
@keyframes example {
  0% {
    left: 0px;
    top: 10px;
  }
  25% {
    left: 70px;
    top: 50px;
  }
  50% {
    left: -70px;
    top: 50px;
  }
  75% {
    left: -50px;
    top: -100px;
  }
  100% {
    left: 0px;
    top: 10px;
  }
}
</style>

<script>
export default {
  data: () => ({
    isActive: false,
    isSmall: false,
    smallClass: "display-1 font-weight-thin",
    bigClass: "display-2 font-weight-thin"
  }),
  mounted() {
    this.$bus.$on("mobile-view", mv => {
      this.isSmall = mv;
    });
    this.$bus.$on("desktop-view", dv => {
      this.isSmall = !dv;
    });
    console.log(this.$vuetify.breakpoint);
  },
  computed: {
    // imageHeight() {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case "xs":
    //       return "220px";
    //     case "sm":
    //       this.isSmall = true;
    //       return "400px";
    //     case "md":
    //       return "500px";
    //     case "lg":
    //       return "600px";
    //     case "xl":
    //       return "800px";
    //   }
    // }
  }
};
</script>