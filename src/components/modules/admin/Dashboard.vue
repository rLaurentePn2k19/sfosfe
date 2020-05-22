<template>
  <v-app>
    <br>
    <!-- <div class="text-center">
      <h1 style="font-style: italic;">Viands</h1>
    </div>-->
    <!-- <MyViands :viandDetails="Viands" v-if="progress"></MyViands> -->
    <MyViands v-if="progress"></MyViands>
    <!-- <v-item-group v-if="progress">
      <v-container>
        <v-row>
          <v-col v-for="viand in Viands" :key="viand.id" cols="12" md="4">
            <v-item>
              <MyViands :viandDetails="viand" v-if="progress"></MyViands>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>-->
    <Progress v-else/>
  </v-app>
</template>

<script>
import MyViands from "@/components/modules/admin/MyViands.vue";
import Progress from "@/components/frame/Progress.vue";

export default {
  data() {
    return {
      progress: false
    };
  },
  components: {
    MyViands,
    Progress
  },
  computed: {
    Viands() {
      return this.$store.getters.getViands;
    }
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
    if (this.Viands.length == 0) {
      this.progress = true;
    } else {
      this.progress = false;
      setTimeout(() => {
        this.progress = true;
      }, 1500);
    }
  }
};
</script>