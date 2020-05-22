<template>
  <div>
    <v-row>
      <v-col v-for="fact in facts" :key="fact._id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title class="subheading font-weight-bold">
            {{fact.title}}
            <v-spacer></v-spacer>
            <v-btn fab small text color="warning" @click="editFact(fact)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-divider inset vertical></v-divider>
            <v-btn fab text small color="error" @click="deleteFact(fact._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-list-item-content>:{{fact.detail}}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <EditFact />
  </div>
</template>


<script>
import EditFact from "@/components/modules/admin/EditFact.vue";
import { mapState } from "vuex";

export default {
  name: "card",
  components: {
    EditFact
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["facts"]),
  },
  methods: {
    editFact(data) {
      this.$bus.$emit("edit-fact", data);
    },
    deleteFact(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this fact!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        })
        .then(result => {
          if (result.value) {
            this.$store
              .dispatch("DeleteFact", id)
              .then(res => {
                console.log(res);
                this.$swal.fire("Deleted successfully!", "", "success");
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    }
  }
};
</script>

