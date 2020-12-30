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
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
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
          },
          {
            icon: 'logout',
            title: 'Cerrar sesión',
          },
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
    redirect(link) {
      if (this.$route.path != link) {
        this.$router.push(link)
      }
    },
  },
}
</script>
