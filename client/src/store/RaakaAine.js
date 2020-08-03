import axios from 'axios';

const state = {
  raakaaine: {}
};

const getters = {
  raakaaine: state => state.raakaaine
}

const actions = {
  async lisaaRaakaaine({
    commit
  }, raakaAine){
    commit('lisaaraakaaine_request');
    let res = await axios.post('http://localhost:5000/api/raakaaineet/add', raakaAine);
    if(res.data.success !== undefined){
      commit('lisaaraakaaine_success');
    }
    return res;
  },
  
  async haeRaakaaine({
    commit
  }) {
    commit('haeraakaaine_request');
    let res = await axios.get('http://localhost:5000/api/raakaaineet/get')
    commit('raaka_aine', res.data.raakaaine)
    return res;
  },
  
  async poistaRaakaaine({
    commit
  }, tuote){
    commit('poistaraakaaine_request');
    let res = await axios.post('http://localhost:5000/api/raakaaineet/delete', tuote);
    if(res.data.success !== undefined){
      commit('poistaraakaaine_success');
    }
    return res;
  },

  async paivitaSuosio({
    commit
  }, tieto){
    commit('paivitasuosio_request');
    let res = await axios.post('http://localhost:5000/api/raakaaineet/update', tieto);
    if(res.data.success !== undefined){
      commit('paivitasuosio_success');
    }
    return res;
  }

}

const mutations = {
  lisaaraakaaine_request(state){
    state.status = 'loading'
  },
  lisaaraakaaine_success(state){
    state.status = 'success'
  },
  haeraakaaine_request(state){
    state.status = 'loading'
  },
  raaka_aine(state, raakaaine){
    state.raakaaine = raakaaine
  },
  poistaraakaaine_request(state){
    state.status = 'loading'
  },
  poistaraakaaine_success(state){
    state.status = 'success'
  },
  paivitasuosio_request(state){
    state.status = 'loading'
  },
  paivitasuosio_success(state){
    state.status = 'success'
  },

  
}

export default {
  state,
  actions,
  mutations,
  getters
}
