<script>
import router from '@/router/router.js'

export default {
  name: 'Rules',
  methods: {
    router() {
      return router
    }
  }
}
</script>

<template>
  <section class="rules">

    <h3 class="rules__title">Welcome to tinyquestions!</h3>
    <p>A small guide for your information:</p>

    <ul class="rules__list">

      <li class="rules__element--mod">
        · The only quizzes that increase stat points are those from <strong>Quick individual</strong> games.
      </li>
      <li class="rules__element">

      · Both <strong>Quick Quizzes and those created by the community (or yourself)</strong>
        they raise the statistics of quizzes solved.
      </li>
      <li class="rules__element">
      · On the <strong>community</strong> page you will find your account information, your stats,
        your created quizzes, the ones you liked and explore those from the community.
      </li>
      <li class="rules__element">
      · You can access your <strong>history of games played and reports</strong> on each one
        of them by clicking on the <strong>quizzes solved statistic</strong>  in the community tab.
        (For now, only Quick matches and custom/community quizzes will be displayed in logs.).
      </li>
      <li class="rules__element--mod2">
        · Finally, and <strong>most importantly</strong> , it is <strong> strictly prohibited</strong>  to create
        quizzes with content that is <strong> misogynistic, sexist, racist, fascist, homophobic, transphobic,
        religiously discriminatory or that violates the integrity of minorities</strong> . Users who fail to
        comply will be banned.
      </li>

      </ul>

        <h3 class="rules__final">And that's all, let's play!</h3>
      <div class="rules__container">
        <button class="primary-button" @click="router().push('/play')">Games</button>
        <img class="rules__doodle" alt="doodle of a plant" src="/public/Vectorplant.png">
      </div>
  </section>

</template>

