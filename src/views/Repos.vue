<template>
  <div class="repos">
    <router-link to="/" class="link-home">Home</router-link>
    <h1>
      <b v-if="totalCount > 0">{{totalCount}}</b>{{' '}}
      <i>{{topic}}</i> Projects{{' '}}
      <i v-if="username">by {{username}}</i>
    </h1>
    <span v-if="error" class="error">{{error}}</span>
    <Repo v-for="repo in repos" :v-if="repo" :repo="repo" :key="repo.id" />
    <span v-if="loading" class="loading">Loading ...</span>
    <button v-if="hasMore" @click="loadMore()" :disabled="loading">Load More</button>
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
      totalCount: 0,
      currentPage: 1,
      error: '',
      hasMore: false,
      lastScrollY: 0,
      loading: false,
    };
  },
  computed: {
    username() {
      const { username } = this.$route.query;
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
    async loadMore() {
      await this.fetchRepos(this.currentPage + 1);
    },
    async fetchRepos(page = 1) {
      const githubSearchOptions = {
        page,
        perPage: 25,
        username: this.username,
        topic: this.topic,
      };

      if (!githubSearchOptions.username && !githubSearchOptions.topic) {
        this.error = 'There is nothing to searchh.';
      }

      this.loading = true;
      this.lastScrollY = document.documentElement.scrollTop || document.body.scrollTop;

      const result = await githubApi.getRepos(githubSearchOptions);

      if ('error' in result) {
        this.error = result.error;
      } else {
        this.error = result.total_count === 0
          ? 'There are no repositories by this search,'
          : '';
        this.repos = page > 1 ? this.repos.concat(result.items) : result.items;
        this.totalCount = result.total_count;
        this.currentPage = page + 1;
        this.hasMore = (result.total_count / githubSearchOptions.perPage) > page;
      }

      this.loading = false;
    },
  },
  updated() {
    window.scrollTo(0, this.lastScrollY);
  },
  created() {
    this.fetchRepos();
  },
  watch: {
    username() {
      this.fetchRepos();
    },
    topic() {
      this.fetchRepos();
    },
  },
});
</script>
<style scoped lang="scss">
.repos {
  position: relative;
  display: flex;
  flex-direction: column;
}

.link-home {
  position: absolute;
}

.repos h1 {
  text-align: center;
}

.error {
  color: red;
}

button {
  width: 100%;
  width: 50%;
  align-self: center;
}

.repos .repo:not(:last-child) {
  margin-bottom: 10px;
}
</style>
