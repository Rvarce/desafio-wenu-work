<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <!-- <h1 class="text-center display-2 teal--text text-accent-3">Inicia sesión en Rick and Morty</h1> -->
                        <div class="text-center">
                          <img
                          alt="Rick and Morty logo"
                          align-self="center"
                          height="130"
                          class="my-8"
                          src="../assets/logo.png"
                        />
                        </div>
                        <v-form>
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="cyan darken-2"
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="Password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan darken-2"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <v-btn rounded color="cyan darken-2" dark>Ingresar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="cyan darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">¡Hola, amigos!</h1>
                        <h5 class="text-center">
                          Registrate y comienza la aventura
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++"
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-heigth">
                    <v-col cols="12" md="4" class="cyan darken-2">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Bienvenido</h1>
                        <h5 class="text-center">¿Ya tienes una cuenta?, inicia sesión</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Ingresar</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 cyan--text text--darken-2">Crear cuenta</h1>
                        <v-form>
                          <v-text-field 
                            label="Nombre"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="cyan darken-2"
                          />
                          <v-text-field 
                            label="Apellido Paterno"
                            name="Firstname"
                            prepend-icon="person"
                            type="text"
                            color="cyan darken-2"
                          />
                          <v-text-field 
                            label="Apellido Materno"
                            name="Lastname"
                            prepend-icon="person"
                            type="text"
                            color="cyan darken-2"
                          />
                          <v-text-field 
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="cyan darken-2"
                          />
                          <v-text-field 
                            label="Password"
                            name="Password"
                            prepend-icon="lock"
                            type="passoword"
                            color="cyan darken-2"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <v-btn rounded color="cyan darken-2 white--text">Registrarse</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
};
</script>
