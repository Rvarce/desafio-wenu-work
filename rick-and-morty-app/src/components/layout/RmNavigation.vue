<template>
  <v-navigation-drawer permanent expand-on-hover color="grey darken-3" app>
    <v-app-bar-nav-icon fab color="grey darken-4"></v-app-bar-nav-icon>

    <v-divider></v-divider>

    <v-list-item class="px-2" v-if="name">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>
      <v-list-item-title class="menu-item">{{ name }}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="item in links"
        :key="item.title"
        link
        @click="redirect(item.link)"
      >
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

    <v-row class="pl-3" v-if="name">
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-list>
            <v-list-item link v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="menu-item">
                  Cerrar Sesión
                </v-list-item-title>
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
    </v-row>
  </v-navigation-drawer>
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
    links() {
      if (this.name) {
        return [
          {
            icon: 'home',
            title: 'Inicio',
            link: '/',
          },
          {
            icon: 'favorite',
            title: 'Favoritos',
            link: '/favorite',
          },
          // {
          //   icon: 'logout',
          //   title: 'Cerrar sesión',
          //   link: '/logout',
          // },
        ]
      } else {
        return [
          {
            icon: 'home',
            title: 'Inicio',
            link: '/',
          },
          {
            icon: 'login',
            title: 'Iniciar sesión',
            link: '/login',
          },
        ]
      }
    },
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
  },
}
</script>
