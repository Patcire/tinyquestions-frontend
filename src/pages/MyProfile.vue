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
      // to storage api petitions
      contentMyQuizzies: [],
      contentFavs: [],
      contentToExplore: [],
      // an array to send the chosen content to the gallery
      contentToSendToGallery: []

    }
  },
  methods: {

    handleContentShowed(contentToChose){
      if (contentToChose === "myQuizzes") this.contentToSendToGallery = [...this.contentMyQuizzies]
      if (contentToChose === "favs") this.contentToSendToGallery = [...this.contentFavs]
      if (contentToChose === "explore") this.contentToSendToGallery = [...this.contentToExplore]

      console.log('lenght:', this.contentToSendToGallery.length)
    }
  },

  async created() {
    const personalQuizzes = await callAPI(`http://localhost:8000/api/cust/all/${this.userID}`)
    const quizzesToExplore = await callAPI(`http://localhost:8000/api/cust/all`)
    console.log('toexp: ', quizzesToExplore)
    this.contentMyQuizzies = [...personalQuizzes]
    this.contentToExplore = [...quizzesToExplore]
    //const favsContent = await callAPI('http://localhost:8000/api/') //implement
    //this.contentFavs = [...favsContent]

    this.contentToSendToGallery = [...this.contentMyQuizzies]
  }

}
</script>

<template>
  <section class="profile">
    <ProfileHeader @selection="handleContentShowed"></ProfileHeader>
    <Gallery :content="contentToSendToGallery"></Gallery>
  </section>

</template>
