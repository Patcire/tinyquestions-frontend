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
      // two arrays to storage api petitions
      contentMyQuizzies: [],
      contentFavs: [],
      // an array to send the content chose to the gallery
      contentToSendToGallery: []

    }
  },
  methods: {
    handleContentShowed(contentChoose){
      contentChoose === "myQuizzies" ?
      this.contentToSendToGallery = [...this.contentMyQuizzies]
      :
      this.contentToSendToGallery = [...this.contentFavs]
      console.log(this.contentToSendToGallery)
    }
  },
  async created() {
    const myQuizzesContent = await callAPI(`http://localhost:8000/api/cust/all/${this.userID}`)
    this.contentMyQuizzies = [...myQuizzesContent]

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
