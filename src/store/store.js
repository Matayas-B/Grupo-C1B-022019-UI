import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export  const store = new Vuex.Store({

    state:{
        user: ''
    },

    getters:{
        usuario: (state) =>{
            return state.user
        }
    },
    mutations:{
        // codigo de ejemplo aumentar: (state) => satate.cantidad ++,
    },
    actions: {
        // las acciones tiene acceso al context
        // aumetarAsync: (context) => {
        //  setTime(() => context.commit('aumentar', 200);
        //}
        // y del lado del componente que lo va usar se lo llama asi this.$store.dispatch('aumentarAsync'f)
        // import {mapState, mapActions} from 'vuex' se usasn en computadas ej: computed: mapState(['Cantidad']),  mapActions(['aumentarAsync'])
    }
});
