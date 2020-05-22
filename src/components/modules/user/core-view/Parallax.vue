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
            <div id="myDiv">
              <div class="artigo_nome">
                <h1
                  class="display-2 font-weight-thin mb-2"
                  style="border: 5px solid white; padding: 2%;"
                >
                  We are
                  <strong>ONE</strong>, we eat as
                  <strong>
                    FAMILY
                    <v-icon color="red" class="ball">mdi-heart</v-icon>
                  </strong>
                </h1>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-else-if="isSmall">
          <v-col class="text-center" cols="12">
            <div id="myDiv">
              <div class="artigo_nome">
                <h1 class="font-weight-thin mb-1" style="border: 5px solid white; padding: 2%; ">
                  We are
                  <strong>ONE</strong>, we eat as
                  <strong>
                    FAMILY
                    <v-icon color="red" class="ball">mdi-heart</v-icon>
                  </strong>
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
.categoria_lista_artigos .artigo_nome {
  color: #6e6e6e;
  width: 234px;
  height: 34px;
  margin-left: -2px;
  border-radius: 5px 5px 0 0;
  border-left: 2px #aeaeae solid;
  border-right: 2px #aeaeae solid;
  border-bottom: 1px #aeaeae solid;
  position: relative;
  font-weight: 600;
  -webkit-box-shadow: 0px -3px 5px #e2e2e2;
  -moz-box-shadow: 0px -3px 5px #e2e2e2;
  box-shadow: 0px -3px 5px #e2e2e2;
  background: #ffffff; /* Old browsers */
  background: -moz-linear-gradient(top, #ffffff 0%, #cfcfcf 100%); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #ffffff),
    color-stop(100%, #cfcfcf)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    #ffffff 0%,
    #cfcfcf 100%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    top,
    #ffffff 0%,
    #cfcfcf 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(top, #ffffff 0%, #cfcfcf 100%); /* IE10+ */
  background: linear-gradient(to bottom, #ffffff 0%, #cfcfcf 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#cfcfcf',GradientType=0 ); /* IE6-9 */
}

.categoria_lista_artigos .artigo_nome div {
  margin: auto;
  padding: 4px 13px;
  vertical-align: middle;
  line-height: 13px;
}
.ball {
  width: 50px;
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
  }
};
</script>