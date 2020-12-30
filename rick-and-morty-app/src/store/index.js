import Vue from 'vue'
import Vuex from 'vuex'
import characterService from "../services/characterService";
import authService from "../services/authService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {},
    user: {}
  },
  mutations: {
    setCharacter(state, character) {
      state.character = character
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    getCharacters(context, payload = {}) {
      const { page, status, gender, name } = payload
      return characterService.getCharacters(page, status, gender, name)
        .then(res => {
          context.commit('setCharacter', res)
          return res
        })
    },
    loginUser(context, payload) {
      const { email, password } = payload
      return authService.login(email, password).then((res) => {
        if (res.status === 200) {
          context.commit('setUser', res.data)
          console.log('res ', res)
          return true
        } else {
          return false
        }
      });
    }
  },
  getters: {
    pages(state) {
      if (state.character.info) {
        return state.character.info.pages
      }
    },
    token(state) {
      if (state.user) {
        return state.user.token
      }
    },
    name(state) {
      if (state.user) {
        return state.user.name
      }
    }
  },
  modules: {
  }
})
