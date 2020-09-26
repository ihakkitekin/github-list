<template>
  <div class="repos">
    <h1>{{username}}'s <i>{{topic}}</i> Projects</h1>
    <Repo v-for="repo in repos" :v-if="repo" :repo="repo" :key="repo.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Repo from '../components/Repo.vue';
import githubApi, { GithubRepo } from '../services/github';

export default defineComponent({
  components: {
    Repo,
  },
  data() {
    return {
      repos: [] as GithubRepo[],
    };
  },
  computed: {
    username() {
      const { username } = this.$route.params;
      return (Array.isArray(username)
        ? username[0]
        : username);
    },
    topic() {
      const { topic } = this.$route.query;
      return (Array.isArray(topic)
        ? topic[0]
        : topic);
    },
  },
  methods: {
    async fetchRepos() {
      const githubSearchOptions = {
        username: this.username,
        topic: this.topic,
      };

      const repos = await githubApi.getRepos(githubSearchOptions);

      this.repos = repos.items;
    },
  },
  created() {
    this.fetchRepos();
  },
  watch: {
    $route() {
      this.fetchRepos();
    },
  },
});
</script>
<style lang="scss">
.repos h1 {
  text-align: center;
}

.repos .repo:not(:last-child) {
  margin-bottom: 10px;
}
</style>
