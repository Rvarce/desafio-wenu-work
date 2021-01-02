import Vue from 'vue'
import Vuex from 'vuex'
import characterService from "../services/characterService";
import authService from "../services/authService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    character: {},
    user: {},
    favorite: []
  },
  mutations: {
    setCharacter(state, character) {
      state.character = character
    },
    setUser(state, user) {
      state.user = user
    },
    setFavorite(state, favorite) {
      state.favorite = favorite
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
          return true
        } else {
          return false
        }
      }).catch(err => console.log(err))
    },
    logoutUser(context) {
      context.commit('setUser', {})
    },
    getFavorites(context) {
      if (context.state.user.token) {
        return characterService.getFavorites().then(res => {
          context.commit('setFavorite', res.data.character)
          return res
        })
      }
    },
    deleteFavorite(context, payload) {
      if (context.state.user.token) {
        return characterService.deleteFavorites(payload).then(res => {
          context.dispatch('getFavorites')
          return res
        })
      }
    }
  },
  getters: {
    pages(state) {
        const page = state.character?.info?.pages
        if (typeof page != 'undefined') {
          return page
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
    },
    lastName(state) {
      if (state.user) {
        return state.user.lastName
      }
    }
  },
  modules: {
  }
})
