<template>
  <div class="home">
    <h1>Welcome</h1>
    <h3>You can search a user's github repo by topics.</h3>
    <form @submit="this.onSubmit" class="search">
      <label for="username">Username</label>
      <input name="username" type="text" v-model="username"/>
      <label for="topic">Topic</label>
      <input name="topic" type="text" v-model="topic" />
      <span class="error" v-if="error">{{ error }}</span>
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
      error: '',
    };
  },
  methods: {
    onSubmit(e: Event) {
      e.preventDefault();
      if (!this.username && !this.topic) {
        this.error = 'You need to fill at least 1 field.';
      } else {
        this.$router.push(`/repos?username=${this.username}&topic=${this.topic}`);
      }
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
  max-width: 400px;
  width: 100%;
  margin: auto;

  input:not(:last-child){
    margin-bottom: 10px;
  }

  label {
    font-weight: 600;
  }

  .error {
    color: red;
  }
}
</style>
