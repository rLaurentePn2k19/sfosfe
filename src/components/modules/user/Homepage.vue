<template>
  <div>
    <parallax/>
    <dateTrivia/>
  </div>
</template>

<style>
</style>


<script>
import parallax from "@/components/modules/user/core-view/Parallax.vue";
import dateTrivia from "@/components/modules/user/core-view/Date_trivia.vue";

export default {
  data() {
    return {};
  },
  components: {
    parallax,
    dateTrivia
  }
};
</script>