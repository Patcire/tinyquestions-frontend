<script>
import ProfileHeader from '@/components/ProfileHeader.vue'
import Gallery from '@/components/Gallery.vue'
import { useSessionStore } from '@/stores/sessionStore.js'
import { callAPI } from '@/helpers/callAPI.js'

export default {
  name: 'MyProfile',
  components: { Gallery, ProfileHeader },
  data(){
    return{
      bgCardColorCSS: "purple",
      userID: useSessionStore().user.userID,
      seshStore: useSessionStore(),
      selection: "myQuizzes", // by default
      // to storage api petitions that is not on the pinia store
      contentToExplore: [],
      // an array to send the chosen content to the gallery
      contentToSendToGallery: []

    }
  },
  methods: {

    handleContentShowed(contentToChose) {
      if (contentToChose === "myQuizzes") {
        this.contentToSendToGallery = [...useSessionStore().user.myQuizzesStorage]
        this.bgCardColorCSS="purple"
      }
      else if (contentToChose === "liked") {
        this.contentToSendToGallery = [...useSessionStore().user.likedStorage]
        this.bgCardColorCSS="pink"
      }
      else if (contentToChose === "explore") {
        this.contentToSendToGallery = [...this.contentToExplore]
        this.bgCardColorCSS="blue"
      }
    }
  },
  async created() {
    // if the data on DB is ahead vs the localStorage i update the localS
    const personalQuizzesFromAPI = await callAPI(`http://localhost:8000/api/cust/all/${this.userID}`)
    if (useSessionStore().user.myQuizzesStorage !== personalQuizzesFromAPI.length ){
        useSessionStore().user.myQuizzesStorage = [...personalQuizzesFromAPI]
        this.contentToSendToGallery = [...personalQuizzesFromAPI] // by default

    }
    const likedContentFromAPI = await callAPI(`http://localhost:8000/api/li/likes/${this.userID}`)
    if (likedContentFromAPI.length && useSessionStore().user.likedStorage.length !== likedContentFromAPI.length) {
      useSessionStore().user.likedStorage = [...likedContentFromAPI]
    }
    const quizzesToExploreFromAPI = await callAPI(`http://localhost:8000/api/cust/all`)
    if (this.contentToExplore.length !== quizzesToExploreFromAPI.length) {
      this.contentToExplore = [...quizzesToExploreFromAPI]
    }
  }
}
</script>

<template>
  <section class="profile">
    <ProfileHeader @selection="handleContentShowed"></ProfileHeader>
    <Gallery
      :content="contentToSendToGallery"
      :bgCardColorCSS="bgCardColorCSS">
    </Gallery>
  </section>

</template>
