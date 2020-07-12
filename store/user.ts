import axios from 'axios';
import { createModule, mutation, action, extractVuexModule, createProxy } from "vuex-class-component";
import Vuex from 'vuex';

const VuexModule = createModule({
  namespaced: "user",
  strict: false,
  target: "nuxt",
})

export type User = {first: string, last: string};

export class UserStore extends VuexModule {
  users: User[] = [];
  adUsers: User[] = [];

  @mutation pushUser(user: User) {
    this.users = [...this.users, user];
  }

  @action async fetchUser() {
    const {name: { first, last}} = (await axios.get('https://randomuser.me/api/')).data.results[0];
    const user = {first, last};

    // side question : this doesn't work, is this intended ? I have to use a mutation instead
    // this.users = [...this.users, user];

    this.pushUser(user);
  }

  @mutation adPushUser(user: User) {
    this.adUsers = [...this.adUsers, user];
  }

  @action async adFetchUser() {
    const {name: { first, last}} = (await axios.get('https://randomuser.me/api/')).data.results[0];
    const user = {first, last};
    this.adPushUser(user);
  }
}

// store.vuex.ts
export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule( UserStore )
  }
})

// Creating proxies.
export const vxm = {
  user: createProxy( store, UserStore ),
}
