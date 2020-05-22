<template>
  <v-container class="grey lighten-5" style="margin-top: 2%;">
    <v-row justify="space-around">
      <v-col class="text-center">
        <v-date-picker v-model="picker" color="green lighten-1"></v-date-picker>
      </v-col>
      <v-col class="text-center" style="font-style: italic">
        <br>
        <h1>Fact of the day!</h1>
        <br>
        <div>
          <h2>Amazon.com employees spend two days every two years working at the customer service desk — even the CEO — in order to help all workers understand the customer service process.</h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10)
    };
  }
};
</script>

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
  /*background-color:#E6E6E6;*/
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
</style>
