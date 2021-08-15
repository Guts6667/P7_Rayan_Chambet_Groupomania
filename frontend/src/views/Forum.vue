<template>
  <div>
    <Header />
    <Post/>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import http from '../../service/http';
import Post from '../components/Post.vue';

export default {
  name: "Forum",
  components: {
    Header,
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  created(){
      this.updatePost()
  },
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
