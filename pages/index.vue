<template>
  <div class="container">
    Nothing:<br>
    {{ fetchUsers }}<br>
    shows ssr state<br>
    {{ adUsers }} <br>
    <button @click="addFetchUser">add fetchUser</button>
    <button @click="addAdUser">add adUser</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { User, vxm } from '@/store/user';

@Component({
  async fetch() {
    await vxm.user.fetchUser();
    console.log(vxm.user.users);
  },
  async asyncData() {
    await vxm.user.adFetchUser();
    return {
      adUsers: vxm.user.adUsers,
    }
  }
})
export default class Index extends Vue {
  // shows server side state, but is not reactive, which is normal i believe
  adUsers!: User[];

  // is reactive but does not show get state set server side
  get fetchUsers(): User[] {
    console.log(vxm.user.users);
    return vxm.user.users;
  }

  async addFetchUser(): Promise<void> {
    await vxm.user.fetchUser();
  }

  async addAdUser(): Promise<void> {
    await vxm.user.adFetchUser();
  }
}
</script>
