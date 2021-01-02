<template>
  <v-container>
    <v-row align="center" no-gutters>
      <v-col>
        <v-alert
          class="text-center mx-auto"
          max-width="300"
          border="left"
          :color="color"
          dark
          close-text="Close Alert"
          v-model="alert"
          dismissible
          dense
          elevation="10"
        >
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters>
      <v-col>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-sheet v-if="!character">
              <v-skeleton-loader
                class="ma-8"
                max-width="330"
                type="card"
              ></v-skeleton-loader>
            </v-sheet>
            <v-card
              v-else
              class="ma-8 mx-auto"
              max-width="330"
              :elevation="hover ? 24 : 10"
            >
              <v-img class="text-right" :src="character.image" height="200px">
                <v-btn
                  v-if="user.name"
                  class="ma-2"
                  color="cyan"
                  fab
                  @click="saveFavorites(character.id)"
                >
                  <v-icon class="material-icons">
                    favorite_border
                  </v-icon>
                </v-btn>
              </v-img>
              <v-card-title>
                {{ character.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ character.species }}
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-card-text>
                <ul>
                  <li>Genero: {{ character.gender }}</li>
                  <li>Estado: {{ character.status }}</li>
                  <li>Origen: {{ character.origin.name }}</li>
                </ul>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import characterService from '../services/characterService'
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
      alert: false,
    }
  },
  props: {
    character: { type: Object, required: true },
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    saveFavorites(idCharacter) {
      if (('id ', idCharacter)) {
        characterService
          .saveFavorites(idCharacter)
          .then((res) => {
            if (res) {
              if (res.data.error) {
                this.alert = true
                this.color = 'red lighten-2nge'
                this.message = res.data.message
              } else {
                this.alert = true
                this.color = 'info'
                this.message = 'Personaje guardado en favoritos'
              }
            } else {
              this.alert = true
              this.color = 'red lighten-2'
              this.message = 'Error al guardar favoritos'
            }
          })
          .then(() => this.hideAlert())
          .catch((err) => console.log(err))
      }
    },
    hideAlert() {
      window.setInterval(() => {
        this.alert = false
      }, 1500)
    },
  },
}
</script>
