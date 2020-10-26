import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weeks: [],
    days: [],
    settings: []
  },
  mutations: {
    LOAD(state, p) {
      state.weeks = p.weeks
      state.days = p.days
      state.settings = p.settings
    }
  },
  actions: {
    PRELOAD({ dispatch, commit }) {
      if (Vue.localStorage.get('weeks')) {
        let weeks = JSON.parse(Vue.localStorage.get('weeks'))
        let days = JSON.parse(Vue.localStorage.get('days'))
        let settings = JSON.parse(Vue.localStorage.get('settings'))
        commit('LOAD', {
          weeks
          , days
          , settings
        })
      } else {
        dispatch('LOAD')
        console.log('load')
      }
    },

    LOAD({ commit }) {
      let days = []
      let weeks = []
      let settings = []

      // days
      Vue.$db.collection('days')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(s => {
            days.push({ ...s.data() })

          })
          console.log('days', days)
          //weeks
          Vue.$db.collection('weeks')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(s => {
                weeks.push({ ...s.data() })

              })
              console.log('weeks', weeks)
              //settings
              Vue.$db.collection('settings')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(s => {
                    settings.push({ ...s.data() })
                  })
                  console.log('settings', settings)

                  // SAVE
                  Vue.localStorage.set('weeks', JSON.stringify(weeks))
                  Vue.localStorage.set('days', JSON.stringify(days))
                  Vue.localStorage.set('settings', JSON.stringify(settings))
                  commit('LOAD', { weeks, days, settings })
                })
                .catch(error => {
                  console.error(error)
                  throw error
                })
            })
            .catch(error => {
              console.error(error)
              throw error
            })
        })
        .catch(error => {
          console.error(error)
          throw error
        })
    },
    ADD(ctx,day) {
      console.log(day)
      let dayRef = Vue.$db.collection('days').doc(`${day.number}`);

      dayRef.set(day, { merge: true })
                .then(() => {
                    console.log('added', day.number)
                })
                .catch((e) => {
                   console.error(e)
                });
    },
    
    ADD_WEEK(ctx, week) {
      console.log(week)
      let ref = Vue.$db.collection('weeks').doc(`${week.number}`);
      ref.set(week, { merge: true })
                .then(() => {
                    console.log('added', week.number)
                })
                .catch((e) => {
                   console.error(e)
                });
    },
    REMOVE() { }
  },
  modules: {
  },
  getters: {
    days: s => s.days,
    weeks: s => s.weeks,
    settings: s => s.settings,
  }
})
