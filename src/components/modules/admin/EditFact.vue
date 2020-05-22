<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card max-width="350px" :loading="loading">
        <v-toolbar color="orange" dark flat>
          <v-toolbar-title>Edit fact</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <br>
        <v-card-text>
          <v-form ref="fact_form">
            <v-text-field label="Edit title" :prepend-icon="'mdi-food-variant'" v-model="title"/>
            <v-textarea
              :prepend-icon="'mdi-pencil-box'"
              auto-grow
              filled
              label="Edit details"
              rows="1"
              v-model="detail"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="$refs.fact_form.reset()">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="success" @click="submit">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      id: "",
      title: "",
      detail: ""
    };
  },
  computed: {
    ...mapState(["facts_To_Edit"])
  },
  mounted() {
    // Object.assign(this.newFact, this.factToEdit);
    this.$bus.$on("edit-fact", data => {
      this.$store.commit("setFactsToEdit", data);
      this.id = data._id;
      this.title = this.facts_To_Edit.title;
      this.detail = this.facts_To_Edit.detail;
      this.dialog = true;
    });
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.loading = false;
    },
    submit() {
      // this is where i paused
      console.log(this.title, " new title");
      console.log(this.detail, " new detail");
      if (this.title == "" || this.detail == "") {
        this.$swal.fire("Invalid changes", "Please try again", "error");
      } else {
        const fact_edit = {
          id: this.id,
          title: this.title,
          detail: this.detail
        };
        this.loading = true;
        this.$store
          .dispatch("EditFact", fact_edit)
          .then(res => {
            console.log(res);
            setTimeout(
              () => (
                (this.loading = false),
                (this.dialog = false),
                this.$swal.fire("Successfully updated.", " ", "success")
              ),
              2000
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>