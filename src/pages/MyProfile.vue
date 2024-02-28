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

      userID: useSessionStore().user.userID,
      selection: "myQuizzes", // by default
      // to storage api petitions that is not on the pinia store
      contentToExplore: [],
      // an array to send the chosen content to the gallery
      contentToSendToGallery: []

    }
  },
  methods: {

    handleContentShowed(contentToChose) {
      if (contentToChose === "myQuizzes") this.contentToSendToGallery = [...useSessionStore().user.myQuizzesStorage]
      else if (contentToChose === "liked") this.contentToSendToGallery = [...useSessionStore().user.likedStorage]
      else if (contentToChose === "explore") this.contentToSendToGallery = [...this.contentToExplore]
    }
  },

  async created() {
    this.contentToSendToGallery = [...useSessionStore().user.myQuizzesStorage]
    // if the data on DB is ahead on localStorage I update it
    const personalQuizzesFromAPI = await callAPI(`http://localhost:8000/api/cust/all/${this.userID}`)
    if (useSessionStore().user.myQuizzesStorage !== personalQuizzesFromAPI.length ){
      useSessionStore().user.myQuizzesStorage = [...personalQuizzesFromAPI]
    }
    const quizzesToExploreFromAPI = await callAPI(`http://localhost:8000/api/cust/all`)
    if (this.contentToExplore.length !== quizzesToExploreFromAPI.length) {
      this.contentToExplore = [...quizzesToExploreFromAPI]
    }

   // const likedContent = await callAPI(`http://localhost:8000/api/li/${this.userID}`)
    //this.contentLiked = [...likedContent]

  }

}
</script>

<template>
  <section class="profile">
    <ProfileHeader @selection="handleContentShowed"></ProfileHeader>
    <Gallery :content="contentToSendToGallery"></Gallery>
  </section>

</template>
