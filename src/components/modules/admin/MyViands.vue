  <template>
  <div>
    <v-container fluid>
      <div class="text-center">
        <h1 style="font-style: italic;">Viands</h1>
        <div class="align-end"></div>
      </div>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="300"
        transition="fade-transition"
      >
        <v-data-iterator :items="Viands" :orders-per-page.sync="Viands.length" hide-default-footer>
          <template v-slot:default="props">
            <v-item-group>
              <v-row>
                <v-col v-for="viand in props.items" :key="viand._id" cols="12" md="4">
                  <v-item v-slot:default="{ active, toggle }">
                    <v-hover v-slot:default="{ hover }" open-delay="100">
                      <v-card
                        :elevation="hover ? 16 : 2"
                        :color="active ? 'primary' : ''"
                        class="d-flex align-center"
                        dark
                        height="200"
                        @mouseenter="toggle"
                      >
                        <v-img
                          class="white--text align-end"
                          height="200px"
                          :src="viand._image[0]"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        >
                          <v-scroll-y-transition>
                            <div v-if="active" class="display-5 flex-grow-2 text-center">
                              <v-btn color="error" small fab @click="deleteViand(viand._id)">
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                              <v-divider class="mx-1" inset vertical></v-divider>
                              <v-btn color="warning" small fab @click="editViand(viand)">
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                            </div>
                          </v-scroll-y-transition>
                          <v-card-title>{{viand._name}}</v-card-title>
                        </v-img>
                      </v-card>
                    </v-hover>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </template>
        </v-data-iterator>
      </v-lazy>
    </v-container>
    <EditViand/>
  </div>
</template>

<style scoped>
</style>

<script>
import EditViand from "@/components/modules/admin/EditViand.vue";
export default {
  name: "My-Viands",
  data() {
    return {
      isActive: false
    };
  },
  components: {
    EditViand
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
  },
  computed: {
    Viands() {
      return this.$store.getters.getViands;
    }
  },
  methods: {
    editViand(data) {
      console.log(data, " viand to edit");
      this.$bus.$emit("edit-viand", data);
    },
    deleteViand(id) {
      console.log(id);
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        })
        .then(result => {
          if (result.value) {
            this.$store
              .dispatch("DeleteViand", id)
              .then(res => {
                this.$swal.fire(
                  "Deleted!",
                  `${res.name} has been deleted.`,
                  "success"
                );
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