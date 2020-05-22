<template>
  <div style="margin-top: 10%">
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal" style="padding: 2%">
          <strong class="subheading">Get connected with us on social networks!</strong>
          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="white--text text-center" style="padding: 1%">
          {{ new Date().getFullYear() }} —
          <strong>Softype Ph Food Order</strong><br>
          <v-divider class="mx-1" inset vertical></v-divider>By: Rangie Laurente
          <v-divider class="mx-1" inset vertical></v-divider>Credits: Care Parba
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-github", "mdi-linkedin", "mdi-git"]
  })
};
</script>