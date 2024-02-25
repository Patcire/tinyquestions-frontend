<script>
import ProfileHeader from '@/components/ProfileHeader.vue'
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'MyProfile',
  components: { Gallery, ProfileHeader },
  data(){
    return{
      content: "personal"
    }
  },
  methods: {
    handleContentShowed(contentChoosed){
      this.content = contentChoosed
    }
  }
}
</script>

<template>
  <section class="profile">
    <ProfileHeader @selection="handleContentShowed"></ProfileHeader>
    <Gallery :content="content"></Gallery>
  </section>

</template>
