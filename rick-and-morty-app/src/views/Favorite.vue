<template>
  <v-app>
    <!-- Menu lateral -->
    <rm-navigation />

    <!-- Barra superior -->
    <rm-header />

    <!-- Body, se muestra filtros y listado de personajes -->
    <v-main>
      <h1 class="ma-12">Favoritos</h1>
      <v-simple-table class="mx-16">
        <template>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">
                Nombre
              </th>
              <th class="text-left">
                Especie
              </th>
              <th class="text-left">
                Estado
              </th>
              <th class="text-left">
                Genero
              </th>
              <th class="text-left">
                Origen
              </th>
              <th class="text-left">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody v-if="Array.isArray(favorite)">
            <tr v-for="item in favorite" :key="item.id">
              <td class="py-6">
                <v-avatar>
                  <img :src="item.image" />
                </v-avatar>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.species }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.origin.name }}</td>
              <td>
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="cyan darken-2"
                  class="ma-2 white--text"
                  fab
                  @click="delFav(item.id)"
                >
                  <v-icon class="material-icon" dark>delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
          <tBody v-else>
            <td>
              <p class="text-center">
                No has agregado favoritos!
              </p>
            </td>
          </tBody>
        </template>
      </v-simple-table>
    </v-main>

    <template> </template>

    <!--Footer -->
    <rm-footer />
  </v-app>
</template>
<script>
import RmHeader from '../components/layout/RmHeader.vue'
import RmFooter from '../components/layout/RmFooter.vue'
import RmNavigation from '../components/layout/RmNavigation.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { RmFooter, RmHeader, RmNavigation },
  data() {
    return {
      loader: null,
      loading: false,
    }
  },
  created() {
    if (!this.user.token) {
      this.$router.push('/')
    }
    this.getFavorites().then((res) => {
      console.log('favoritos', this.favorite)
    })
  },
  computed: {
    ...mapState(['favorite']),
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['getFavorites']),
    ...mapActions(['deleteFavorite']),
    delFav(id) {
      this.loading = true
      this.deleteFavorite(id).then(() => {
        this.loading = false
      })
    },
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>
