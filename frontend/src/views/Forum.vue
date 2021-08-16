<!-- Vue du Forum -->
<template>
  <div>
    <Header />
    <Post/>
    <Footer/>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import http from '../../service/http';
import Post from '../components/Post.vue';

export default {
  name: "Forum",
  components: {
    Header,
    Post,
    Footer,
  },
  data() {
    return {
      posts: [],
    };
  },
  /*Appel de la fonction updatePost */
  created(){
      this.updatePost()
  },
  /*Méthode updatePost */
  methods: {
    updatePost() {
      http().get("/post")
        .then((response) => {
          this.posts = this.posts.concat(response.data);
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
