<template>
  <v-card class="elevation-12 ma-8" max-width="330">
    <v-img :src="character.image" height="200px"></v-img>

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
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange lighten-2" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  props: {
    character: { type: Object, required: true },
  },
}
</script>
