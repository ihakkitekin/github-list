<template>
  <div class="home">
    <h1>Welcome</h1>
    <h3>You can search a user's github repo by topics.</h3>
    <form @submit="this.onSubmit" class="search">
      <label for="username">Username</label>
      <input name="username" type="text" v-model="username" required/>
      <label for="topic">Topic</label>
      <input name="topic" type="text" v-model="topic" />
      <button>Search</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      username: '',
      topic: '',
    };
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
      this.$router.push(`/repos/${this.username}?topic=${this.topic}`);
    },
  },
});
</script>

<style lang="scss">
.home h1, h3 {
  text-align: center;

}

.search {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;

  input:not(:last-child){
    margin-bottom: 10px;
  }

  label {
    font-weight: 600;
  }
}
</style>
