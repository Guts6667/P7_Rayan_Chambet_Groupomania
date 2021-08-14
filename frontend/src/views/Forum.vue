<template>
  <div>
    <Header />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import http from '../../service/http';

export default {
  name: "Forum",
  components: {
    Header,
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
