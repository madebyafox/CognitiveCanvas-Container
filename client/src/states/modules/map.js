import Map from './map'
import constants from '../../models/constants'
import axios from 'axios'
import Axios from 'axios';

const state = {
  currentMap: null,
  maps: []
}

const getters = {

}

const mutations = {

}

const actions = {
  createNewMap (context) {
    console.log("create map")
    Axios
      .post(`${constants.api}/createMap`, {
        'name': 'Untitle Map',
        'url': 'localhost:8080/newMap'
      })
      .catch(function (error) {
        bugsnagClient.notify(error)
      })
  }
}

const map = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default map