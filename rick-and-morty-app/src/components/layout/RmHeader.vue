<template>
  <v-app-bar color="white" app>
    <!-- <h1>Rick and Morty</h1> -->
    <div class="text-left">
      <img
        alt="Rick and Morty logo"
        align-self="center"
        height="50"
        class="my-8"
        src="../../assets/logo3.png"
      />
    </div>
    <v-spacer></v-spacer>

    <v-menu v-if="name">
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined v-bind="attrs" v-on="on">
          <v-icon class="material-icons mr-2">
            account_circle
          </v-icon>
          <div class="d-none d-md-flex d-lg-flex">
            <span>¡Hola, {{ name }}!</span>
          </div>
        </v-btn>
      </template>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-list>
            <v-list-item link v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-subtitle class="menu-item">
                  Cerrar Sesión
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <v-card>
          <v-card-title class="headline">
            Cerrar sesión
          </v-card-title>
          <v-card-text>¿Esta seguro que desea cerrar la sesión?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              No
            </v-btn>
            <v-btn color="green darken-1" text @click="redirect('/logout')">
              Si
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-menu>

    <v-menu v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined v-bind="attrs" v-on="on" @click="loginUser">
          <v-icon class="material-icons mr-2">
            login
          </v-icon>
          <div class="d-none d-md-flex d-lg-flex">
            <span>Iniciar sesión</span>
          </div>
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapGetters(['name']),
  },
  methods: {
    ...mapActions(['logoutUser']),
    redirect(link) {
      if (link == '/logout') {
        this.logoutUser()
        link = '/'
        this.dialog = false
      }
      if (this.$route.path != link) {
        this.$router.push(link)
      }
    },
    loginUser() {
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="sass">
.menu-item
  color: black
</style>
