<template>
  <v-app>
    <!-- Menu lateral -->
    <rm-navigation v-on:alert="alert = $event" />

    <!-- Barra superior -->
    <rm-header />
    <!-- Body, se muestra filtros y listado de personajes -->
    <v-main>
      <v-container fluid class="mx-16 mt-16">
        <v-row>
          <v-col class="max-width-50" cols="4" sm="3">
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
          <v-col class="max-width-50" cols="4" sm="3">
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
          <v-col class="max-width-50" cols="8" sm="4">
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
              <v-btn
                class="mx-2 elevation-12"
                fab
                dark
                small
                color="blue-grey"
                @click="search"
              >
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
    <rm-footer />
  </v-app>
</template>
<script>
import RmCharacter from '../components/Character.vue'
import RmHeader from '../components/layout/RmHeader'
import RmFooter from '../components/layout/RmFooter'
import RmNavigation from '../components/layout/RmNavigation'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { RmCharacter, RmFooter, RmNavigation, RmHeader },
  data() {
    return {
      selectStatus: '',
      itemsStatus: ['Alive', 'Dead', 'Unknown'],
      selectGender: '',
      itemsGender: ['Male', 'Female', 'Genderless', 'Unknown'],
      page: 1,
      name: '',
      alert: false,
    }
  },

  created() {
    this.getCharacters()
  },
  computed: {
    ...mapState(['character']),
    ...mapGetters(['pages']),
    ...mapState(['user']),
  },

  watch: {
    selectStatus(status) {
      if (status) {
        const gender = this.selectGender || ''
        this.page = 1
        this.getCharacters({ page: this.page, status, gender })
      } else {
        this.getCharacters()
      }
    },
    selectGender(gender) {
      if (gender) {
        const status = this.selectStatus || ''
        this.page = 1
        this.getCharacters({ page: this.page, status, gender })
      } else {
        this.getCharacters()
      }
    },
    page(page) {
      const status = this.selectStatus || ''
      const gender = this.selectGender || ''
      this.getCharacters({ page, status, gender, name: this.name })
    },
  },

  methods: {
    ...mapActions(['getCharacters']),
    search() {
      if (this.name) {
        this.page = 1
        const status = this.selectStatus || ''
        const gender = this.selectGender || ''
        this.getCharacters({ page: this.page, status, gender, name: this.name })
      } else {
        this.getCharacters()
      }
    },
  },
}
</script>
<style lang="sass">
.menu-item
  color: white
</style>
