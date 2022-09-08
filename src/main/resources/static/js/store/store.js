import Vue from 'vue'
import Vuex from 'vuex'
import messagesApi from "../api/messages";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: frontendData.messages,
        profile: frontendData.profile
    },
    getters: {
        sortedMessages: state => state.messages.sort((a,b) =>  -(a.id - b.id))
    },
    mutations: {
        addMessageMutation(state, message) {
            state.messages = [
                ...state.messages,
                message
            ]
        },
        updateMessageMutation: function (state, message) {
            const updateIndex = state.messages.findIndex(item => item.id === message.id)
            state.messages = [
                ...state.messages.splice(0, updateIndex),
                message,
                ...state.messages.splice(updateIndex + 1)
            ]
        },
        removeMessageMutation(state, message) {
            const deleteIndex = state.messages.findIndex(item => item.id === message.id)

            if(deleteIndex > -1) {
                state.messages = [
                    ...state.messages.splice(0, deleteIndex),
                    ...state.messages.splice(deleteIndex + 1)
                ]
            }
        }
    },
    actions: {
        async addMessageAction({commit, state}, message) {
            const result = await messagesApi.add(message)
            const date = await result.json()
            const index = state.messages.findIndex(item => item.id === date.id)

            if (index > -1) {
                commit('updateMessageMutation', date)
            } else {
                commit('addMessageMutation', date)
            }
        },
        async updateMessageAction({commit}, message) {
            const result = await messagesApi.update(message)
            const date = await result.json()
            commit('updateMessageMutation', date)
        },
        async removeMessageAction({commit}, message) {
            const result = await messagesApi.remove(message.id)

            if (result.ok) {
                commit('removeMessageMutation', message)
            }
        }
    }

})