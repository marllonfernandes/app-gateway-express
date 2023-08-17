import axios from "axios";

export const state = () => ({
  items: [],
  item: {
    _id: "",
    name: "",
    backend: "",
    active: true,
    enable_auth: false,
    auth_object: "",
  },
});

export const getters = {
  // getItem(state) {
  //   return state;
  // },
};

export const actions = {
  async getItems() {
    const items = await axios.get(
      `${this.$config.baseURL}/register/v1.0/proxy`
    );
    this.commit("addItems", items.data);
    return items.data;
  },
  async deleteItem({ state }) {
    try {
      await axios.delete(
        `${this.$config.baseURL}/register/v1.0/proxy/${state.item._id}`
      );
      this.commit("delItems", state.item);
    } catch (error) {
      console.log(error.message);
    }
  },
  async saveItem({ state }) {
    try {
      const response = await axios.post(
        `${this.$config.baseURL}/register/v1.0/proxy`,
        {
          name: state.item.name,
          backend: state.item.backend,
          active: state.item.active,
          enable_auth: state.item.enable_auth,
          auth_object: state.item.auth_object
            ? JSON.parse(state.item.auth_object)
            : "",
        }
      );
      this.commit("addItems", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async saveEditItem({ state }) {
    
    try {
      const response = await axios.put(
        `${this.$config.baseURL}/register/v1.0/proxy/${state.item._id}`,
        {
          name: state.item.name,
          backend: state.item.backend,
          active: state.item.active,
          enable_auth: state.item.enable_auth,
          auth_object: state.item.auth_object
            ? JSON.parse(state.item.auth_object)
            : "",
        }
      );

      this.commit("updItems", state.item);

    } catch (error) {
      console.log(error);
    }
  },
};

export const mutations = {
  positionItem(state, item) {
    state.item._id = item._id;
    state.item.name = item.name;
    state.item.backend = item.backend;
    state.item.active = item.active;
    state.item.enable_auth = item.enable_auth
    state.item.auth_object = item.auth_object;

  },
  addItems(state, items) {
    state.items.push(...items);
  },
  delItems(state, items) {
    const findIndex = state.items.findIndex((e) => e._id === items._id);
    if (findIndex !== -1) {
      state.items.splice(findIndex, 1);
      state.items = state.items.slice();
    }
  },
  updItems(state, items) {
    const findIndex = state.items.findIndex((e) => e._id === items._id);
    if (findIndex !== -1) {
      state.items[findIndex] = items; 
    }
  },
};