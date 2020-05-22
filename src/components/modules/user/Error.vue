<template>
  <div id="test" class="text-center">
    <v-img :src="require('@/assets/error_page.png')"/>
    <h1>Page Not Found</h1>
    <h3>
      <router-link to="/home" style="text-decoration: none;">
        <a>Go to home</a>
      </router-link>
    </h3>
  </div>
</template>

<style>
#test {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>


<script>
export default {};
</script>
