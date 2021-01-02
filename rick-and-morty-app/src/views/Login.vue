<template>
  <v-app>
    <v-main>
      <div>
        <v-alert
          border="left"
          color="red lighten-2"
          dark
          close-text="Close Alert"
          v-model="alert"
          dismissible
        >
          {{ message }}
        </v-alert>
      </div>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
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
                            v-model="login.email"
                            prepend-icon="email"
                            type="text"
                            color="cyan darken-2"
                            :rules="emailRules"
                            required
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="Password"
                            v-model="login.password"
                            prepend-icon="lock"
                            type="password"
                            color="cyan darken-2"
                            :rules="passRules"
                            required
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <v-btn rounded color="blue-grey" dark @click="submit"
                          >Ingresar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="image">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">¡Hola, amigos!</h1>
                        <h5 class="text-center">
                          Registrate y comienza la aventura
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn
                          class="mt-4 mb-12"
                          rounded
                          outlined
                          dark
                          @click="step++"
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-heigth">
                    <v-col cols="12" md="4" class="image">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Bienvenido</h1>
                        <h5 class="text-center">
                          ¿Ya tienes una cuenta?, inicia sesión
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Ingresar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-10">
                        <h1 class="text-center display-2 blue-grey--text">
                          Crear cuenta
                        </h1>
                        <v-form>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Nombre"
                                name="Name"
                                prepend-icon="person"
                                type="text"
                                color="cyan darken-2"
                                v-model="register.name"
                                :rules="nameRules"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Apellido Paterno"
                                name="Firstname"
                                prepend-icon="person"
                                type="text"
                                color="cyan darken-2"
                                v-model="register.lastName"
                                small
                                :rules="apRules"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Email"
                                name="Email"
                                prepend-icon="email"
                                type="text"
                                color="cyan darken-2"
                                v-model="register.mail"
                                :rules="emailRules"
                                required
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Password"
                                name="Password"
                                prepend-icon="lock"
                                type="password"
                                color="cyan darken-2"
                                v-model="register.password"
                                :rules="passRules"
                                required
                              />
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Confirme Password"
                                name="Password2"
                                prepend-icon="lock"
                                type="password"
                                color="cyan darken-2"
                                v-model="register.password2"
                                :rules="passConfirmRules"
                                required
                              />
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-12">
                        <v-btn
                          rounded
                          color="blue-grey white--text"
                          @click="signup"
                          >Registrarse
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import authService from '../services/authService'

export default {
  name: 'Login',
  data() {
    return {
      step: 1,
      login: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'E-mail es requerido',
        (v) => /.+@.+/.test(v) || 'Ingrese un E-mail valido',
      ],
      register: {
        name: '',
        lastName: '',
        mail: '',
        password: '',
        password2: '',
      },
      passRules: [(v) => !!v || 'Password es requerido'],
      passConfirmRules: [
        (v) => !!v || 'Password es requerido',
        () =>
          this.register.password === this.register.password2 ||
          'Password no coincide',
      ],
      nameRules: [(v) => !!v || 'Nombre es requerido'],
      apRules: [(v) => !!v || 'Apellido paterno es requerido'],
      alert: false,
      message: '',
    }
  },
  props: {
    source: String,
  },
  methods: {
    ...mapActions(['loginUser']),
    submit() {
      this.loginUser(this.login)
        .then((res) => {
          if (res) {
            this.$router.push('/')
            this.login.alert = false
          } else {
            this.alert = true
            this.message = 'Usuario y/o contraseña inválido'
          }
        })
        .catch((err) => console.log(err))
    },
    signup() {
      const { name, lastName, mail, password } = this.register
      if (name === '' || lastName === '' || mail === '' || password === '') {
        this.alert = true
        this.message = 'Favor ingrese todos los datos para su registro'
      } else {
        authService
          .signup({ name, lastName, mail, password })
          .then((res) => {
            if (res.status === 201) {
              this.alert = true
              this.message = 'Usuario resgistrado correctamente'
            } else {
              if (res.data.err) {
                this.alert = true
                this.message = res.data.message
              } else {
                this.alert = true
                this.message =
                  'Ocurrio un problema al registrar el usuario, intente de nuevo mas tarde'
              }
            }
          })
          .catch((error) => console.log(error))
      }
    },
  },
}
</script>
<style lang="scss"></style>
