<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card max-width="350px" :loading="loading">
        <v-toolbar color="orange" dark flat>
          <v-toolbar-title>Edit viand</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <v-img class="display-4 flex-grow-2 text-center" height="200px" :src="this.imgs[0]">
          <v-btn color="primary" @click="showFileInput">{{show ? "Discard image" : "Update Image"}}</v-btn>
        </v-img>
        <hr>
        <br>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Edit title"
              :prepend-icon="'mdi-food-variant'"
              v-model="viand_name"
            />
            <v-file-input
              v-model="img_edited"
              dense
              label="Upload Image"
              accept="/*image"
              v-show=" show ? true : false"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel">Cancel</v-btn>
          <v-btn color="success" @click="submitEdited">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      show: false,
      loading: false,
      imgs: [],
      viand_name: "",
      img_edited: [],
      id: "",
      name_to_edit: ""
    };
  },
  mounted() {
    this.$bus.$on("edit-viand", data => {
      this.dialog = true;
      this.name_to_edit = data._name;
      this.id = data._id;
      this.imgs = data._image;
      this.viand_name = data._name;
    });
  },
  methods: {
    cancel() {
      this.dialog = false;
      this.show = false;
    },
    showFileInput() {
      this.show = !this.show;
      this.img_edited = null;
    },
    submitEdited() {
      if (this.viand_name == this.name_to_edit || this.img_edited.name == "") {
        this.dialog = true;
        this.$swal.fire(`Nothing is change.`, " ", "warning");
      } else {
        this.loading = true;
        let formData = new FormData();
        formData.append("viand_img", this.img_edited);
        formData.append("viand_id", this.id);
        formData.append("viand_name", this.viand_name);
        this.$store
          .dispatch("UpdateViand", formData)
          .then(res => {
            console.log(res);
            setTimeout(
              () => (
                (this.loading = false),
                (this.dialog = false),
                (this.img_edited = ""),
                (this.show = false),
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
