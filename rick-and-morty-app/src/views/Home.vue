<template>
  <v-app>
    <!-- Menu lateral -->
    <v-navigation-drawer
      permanent
      expand-on-hover
      v-model="drawer"
      color="grey darken-3"
      app
    >
      <v-app-bar-nav-icon fab color="grey darken-4"></v-app-bar-nav-icon>
      <v-divider></v-divider>

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="menu-item">John Leider</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in links" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="menu-item">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <v-app-bar color="white" app>
      <h1>Rick and Morty</h1>
    </v-app-bar>

    <!-- Body, se muestra listado de personajes -->
    <v-main>
      <v-container fluid class="mx-16 mt-16">
        <v-row>
          <v-col cols="3">
            <v-combobox
              v-model="selectStatus"
              :items="itemsStatus"
              label="Estado"
              outlined
              clearable
              fluid
              color="cyan darken-2"
              dense
            ></v-combobox>
          </v-col>
          <v-col cols="3">
            <v-combobox
              v-model="selectGender"
              :items="itemsGender"
              label="Genero"
              outlined
              clearable
              fluid
              color="cyan darken-2"
              dense
            ></v-combobox>
          </v-col>
          <v-col cols="3">
            <v-list-item>
              <v-text-field
                v-model="name"
                name="Buscar"
                label="Buscar"
                id="id"
                fluid
                color="cyan darken-2"
                clearable
                dense
              ></v-text-field>
              <v-btn class="mx-2 elevation-12" fab dark small color="cyan darken-2" @click="search">
                <v-icon dark>
                  search
                </v-icon>
              </v-btn>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-flex class="">
          <v-layout wrap v-if="character">
            <v-flex v-for="c in character.results" :key="c.id" class="">
              <rm-character :character="c" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>

      <!-- Paginacion -->
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  class="my-4"
                  :length="pages"
                  circle
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!--  -->
    </v-main>

    <!--Footer -->
    <v-footer app>
      <h5>💻 with ❤️ by @ricardovargascelis</h5>
    </v-footer>
  </v-app>
</template>
<script>
import RmCharacter from "../components/Character.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { RmCharacter },
  data() {
    return {
      drawer: true,
      links: [
        {
          icon: "home",
          title: "Inicio",
        },
        {
          icon: "favorite",
          title: "Favoritos",
        },
        {
          icon: "logout",
          title: "Cerrar sesión",
        },
      ],
      selectStatus: [],
      itemsStatus: ["Alive", "Dead", "Unknown"],
      selectGender: [],
      itemsGender: ["Male", "Female", "Genderless", "Unknown"],
      page: 1,
      name: "",
    };
  },

  created() {
    this.getCharacters().then((res) => console.log("character ", res.results));
  },

  computed: {
    ...mapState(["character"]),
    ...mapGetters(["pages"]),
  },

  watch: {
    selectStatus(status) {
      console.log(status);
      if (status) {
        const gender = this.selectGender ? this.selectGender[0] : "";
        this.page = 1;
        this.getCharacters({ page: this.page, status, gender });
      } else {
        this.getCharacters();
      }
    },
    selectGender(gender) {
      console.log(gender);
      if (gender) {
        const status = this.selectStatus ? this.selectStatus[0] : "";
        this.page = 1;
        this.getCharacters({ page: this.page, status, gender });
      } else {
        this.getCharacters();
      }
    },
    page(page) {
      console.log(page);
      const status = this.selectStatus[0];
      const gender = this.selectGender[0];
      this.getCharacters({ page, status, gender, name: this.name });
    },
  },

  methods: {
    ...mapActions(["getCharacters"]),
    search() {
      console.log("name ", this.name);
      if (this.name) {
        this.page = 1;
        this.getCharacters({ page: this.page, name: this.name });
      } else {
        this.getCharacters();
      }
    },
  },
};
</script>
<style lang="sass">
.menu-item
  color: white
</style>
