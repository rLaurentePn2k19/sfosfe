import Vue from 'vue'
import Vuex from 'vuex'
import http from 'axios'
import ROUTER from "@/router"

Vue.use(Vuex);

// bug in order, the quantity

export default new Vuex.Store({
    state: {
        viands_To_Order: [],
        viands_To_Display: [],
        order_To_Display: [],
        facts: [],
        facts_To_Edit: {},
        user: false
    },
    getters: {
        getViands: state => {
            return state.viands_To_Display
        },
        getOrders: state => {
            return state.viands_To_Order
        },
        getOrderToDisplay: state => {
            return state.order_To_Display
        },
        getOrderToDisplayLength: state => {
            return state.order_To_Display.length
        },
        getFacts: state => {
            return state.facts
        },
        getFactsToEdit: state => {
            return state.facts_To_Edit
        }
    },
    mutations: {
        setOrders(state, order) { // before sending the order or while choosing the viand
            state.viands_To_Order.push(order)
        },
        clearOrders(state) { // clear the order
            state.viands_To_Order = []
        },
        setViands(state, viands) {
            state.viands_To_Display = viands
        },
        addViand(state, viand) {
            state.viands_To_Display.push(viand)
        },
        addEditedViand(state, edited_viand) { // -------------------
            for(let i = 0 ; i<state.viands_To_Display.length ; i++){
                if (edited_viand._id == state.viands_To_Display[i]._id) {
                    state.viands_To_Display.splice(state.viands_To_Display[i], 1)
                }
            }
            state.viands_To_Display.push(edited_viand)
            // state.viands_To_Display.forEach(viand => {
            //     if (edited_viand._id == viand._id) {
            //         state.viands_To_Display.splice(viand, 1)
            //     }
            // });
            // state.viands_To_Display.push(edited_viand)
        },
        removeOrder(state, id) {
            state.viands_To_Order = state.viands_To_Order.filter(order => {
                if (order._id != id) {
                    return order
                }
            })
        },
        deleteViand(state, id) {
            state.viands_To_Display = state.viands_To_Display.filter(viand => {
                if (viand._id != id) {
                    return viand
                }
            })
        },
        deleteFact(state, id) {
            state.facts = state.facts.filter(fact => {
                if (fact._id != id) {
                    return fact
                }
            })
        },
        setOrderToDisplay(state, orders) {
            state.order_To_Display = orders
        },
        addFact(state, fact) {
            state.facts.push(fact)
        },
        addEditedFact(state, new_fact) {
            state.facts.forEach(fact => {
                if (new_fact._id == fact._id) {
                    state.facts.splice(fact, 1)
                }
            });
            state.facts.push(new_fact)
        },
        setFacts(state, facts) {
            state.facts = facts
        },
        setFactsToEdit(state, fact) {
            state.facts_To_Edit = fact
        },
        setUser(state, user) {
            state.user = user
        },
        logout(state, user) {
            state.user = !user
        }
    },
    actions: {
        GetUploadedViands({ commit }) { // solved
            return new Promise((resolve, reject) => {
                http.get("https://sfos-backend.herokuapp.com/admin/retrieveViands").then(res => {
                    const temp_viand = []
                    res.data.forEach(data => {
                        const viand = {
                            _id: data._id,
                            _selected: false,
                            _qty: 1,
                            _image: data.image,
                            _name: data.name
                        };
                        temp_viand.push(viand);
                    });
                    commit("setViands", temp_viand)
                    resolve(temp_viand)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddViand({ commit }, viand) { // solved
            return new Promise((resolve, reject) => {
                http.post("https://sfos-backend.herokuapp.com/admin/addViand", viand).then(res => {
                    const viand = {
                        _id: res.data._id,
                        _selected: false,
                        _qty: 1,
                        _image: res.data.image,
                        _name: res.data.name
                    };
                    setTimeout(() => {
                        commit("addViand", viand)
                    }, 2000);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        UpdateViand({ commit }, viand) { // ----------------------
            return new Promise((resolve, reject) => {
                http.post(`https://sfos-backend.herokuapp.com/admin/updateViand`, viand).then(res => {
                    const viand = {
                        _id: res.data._id,
                        _selected: false,
                        _qty: 1,
                        _image: res.data.image,
                        _name: res.data.name
                    };
                    setTimeout(() => {
                        commit("addEditedViand", viand)
                    }, 2000);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteViand({ commit }, viand_id) { // solved
            return new Promise((resolve, reject) => {
                http.delete(`https://sfos-backend.herokuapp.com/admin/deleteViand/${viand_id}`).then(res => {
                    commit("deleteViand", viand_id)
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        Login({ commit }, admin) { // need to review
            return new Promise((resolve, reject) => {
                if (admin.username == "admin" && admin.password == "Softype100") {
                    localStorage.setItem('admin', admin.password)
                    commit('setUser', true)
                    resolve("Logged in as admin")
                    ROUTER.push("/dashboard")
                } else {
                    reject("Not an admin")
                }
            })
        },
        Logout({ commit }) { // solved
            commit("logout", true)
            localStorage.clear()
            setTimeout(() => (ROUTER.push("/home")), 2000);
        },
        // Orders 
        SendOrder({ commit }, order) { // solved but have some issues in quantity inputting
            return new Promise((resolve, reject) => {
                http.post("https://sfos-backend.herokuapp.com/order/addOrder", order).then(res => {
                    commit("setOrders", res.data)
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetOrders() { // solved
            return new Promise((resolve, reject) => {
                http.get("https://sfos-backend.herokuapp.com/order/retrieveOrders").then(res => {
                    resolve(res.data.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // Facts
        GetFacts({ commit }) {
            return new Promise((resolve, reject) => {
                http.get("https://sfos-backend.herokuapp.com/admin/getFact").then(res => {
                    commit("setFacts", res.data)
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        AddFact({ commit }, fact) {
            return new Promise((resolve, reject) => {
                http.post("https://sfos-backend.herokuapp.com/admin/addFact", fact).then(res => {
                    setTimeout(() => {
                        commit("addFact", res.data)
                    }, 2000);
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DeleteFact({ commit }, fact_id) {
            return new Promise((resolve, reject) => {
                http.delete(`https://sfos-backend.herokuapp.com/admin/deleteFact/${fact_id}`).then(res => {
                    console.log(res.data)
                    setTimeout(() => {
                        commit("deleteFact", fact_id)
                    }, 1000);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        EditFact({ commit }, data) {
            return new Promise((resolve, reject) => {
                http.put(`https://sfos-backend.herokuapp.com/admin/updateFact/${data.id}`, data).then(res => {
                    setTimeout(() => {
                        commit("addEditedFact", res.data)
                    }, 2000);
                    resolve(res.data)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })

            })
        }

    }
})