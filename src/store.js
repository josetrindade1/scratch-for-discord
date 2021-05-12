import Vue from 'vue';
import Vuex from 'vuex';
<<<<<<< HEAD
=======
import createPersistedState from 'vuex-persistedstate';
>>>>>>> f48a4cb39a4f5a90216969c9186068d7ca6e9680

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        workspace: 0,
<<<<<<< HEAD
        blocklyLocale: (["en", "fr","pt"].includes(navigator.language.split("-")[0]) ? navigator.language.split("-")[0] : "en"),
=======
        blocklyLocale: (["en", "fr"].includes(navigator.language.split("-")[0]) ? navigator.language.split("-")[0] : "en"),
>>>>>>> f48a4cb39a4f5a90216969c9186068d7ca6e9680
        tourDone: false
    },
    mutations: {
        setWorkspace (state, { workspace }) {
            state.workspace = workspace;
        },
        setLocale (state, { newLocale }) {
            state.blocklyLocale = newLocale;
<<<<<<< HEAD
            localStorage.setItem('blocklyLocale', newLocale);
        },
        setTour (state, { status }){
            state.tourDone = status;
            localStorage.setItem('tourDone', status);
        }
    }
=======
        },
        setTour (state, { status }){
            state.tourDone = status;
        }
    },
    plugins: [createPersistedState({
        paths: ["blocklyLocale","tourDone"]
    })]
>>>>>>> f48a4cb39a4f5a90216969c9186068d7ca6e9680
});
