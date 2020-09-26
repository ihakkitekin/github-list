<template>
  <a class="repo" :href="repo.html_url" target="_blank">
    <div class="repo-header">
      <b>{{ repo.name }}</b>
      <span>
        <i class="far fa-star" />
        <span>{{ repo.stargazers_count }}</span>
      </span>
      <span>
        <i class="far fa-eye" />
        <span>{{ repo.watchers_count }}</span>
      </span>
      <span>
        <i class="fas fa-code-branch" />
        <span>{{ repo.forks_count }}</span>
      </span>
    </div>
    <div :v-if="repo.description" class="repo-description">
      {{ repo.description }}
    </div>
  </a>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { GithubRepo } from '../services/github';

export default defineComponent({
  props: {
    repo: {
      type: Object as PropType<GithubRepo>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.repo {
  border: 1px solid #e6e6e6;
  padding: 1rem;
  color: #2c3e50;
  text-decoration: unset;
  display: block;

  .repo-header {
    display: flex;

    &:not(:last-child){
      margin-bottom: 5px;
    }

    & > *:not(:last-child) {
      margin-right: 10px;
    }

    & > span > *:not(:last-child) {
      margin-right: 3px;
    }
  }

  .repo-description {
    font-size: 14px;
  }
}
</style>
