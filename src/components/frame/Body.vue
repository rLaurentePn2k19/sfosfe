<template>
  <transition-group>
    <router-view :key="0"></router-view>
  </transition-group>
</template>


<script>

export default {
  name: "appbody",
};
</script>
