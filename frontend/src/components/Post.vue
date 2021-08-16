<!-- Composant Post -->
<template>
  <div>
    <div class="containerBtn">
      <textarea class="input" v-model="post_content"></textarea>
      <div>
        <button @click="createPost()" class="button">Postez !</button>
      </div>
    </div>
    <div class="container" v-for="(post, idx) in posts" :key="idx">
      <div>
        <div class="post">
          <h5 class="postFullname">{{ post.username }} :</h5>
          <p class="text">
            {{ post.post_content }}
          </p>
          <h6 class="date">Créé le : {{ convertDate(post.created) }}</h6>
        </div>
        <div>
          <h6>{{ post.nbcomments }} commentaire(s)</h6>
        </div>
      </div>
      <div class="containerBtn">
        <router-link tag="button" :to="`/onepost/${post.id}`" class="button">
          Voir publication
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../service/http";
import moment from "moment";
export default {
  name: "Post",
  data() {
    return {
      posts: [],
      post_content: "",
    };
  },
  created() {
    this.updatePost();
  },
  methods: {
    /**Méthode updatePost (version ultérieure) */
    updatePost() {
      http()
        .get("/post")
        .then((response) => {
          this.posts = this.posts.concat(response.data);
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },
    /* Méthode permettant de convertir les dates de créations en format lisible */
    convertDate(date) {
      return moment(date)
        .subtract(10, "days")
        .calendar();
    },
    /* Méthode permettant de créer le post */
    createPost() {
      http()
        .post("/post", {
          post_content: this.post_content,
        })
        .then(() => {
          document.location.reload(); /*Recharge la page pour afficher le post */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 20px 10px;
}
.containerBtn {
  margin: 20px 0 25px 0;
}

.post {
  text-align: left;
  padding: 0 30px 0 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .postFullname {
    color: $btn_color;
    text-align: left;
  }
}
.text {
  text-align: center;
}
.date {
  text-align: right;
  font-style: italic;
}
.comment {
  text-align: left;
  border: solid 1px rgb(228, 223, 223);
  border-radius: 30px;
  padding: 0 5px;
  margin-top: 10px;
}
.input {
  margin-top: 30px;
  border: none;
  border-radius: 7px;
  padding: 1rem;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  width: 60%;
}

.button {
  background: $btn_color;
  margin: 5px;
  padding: 10px 15px;
  border: solid 2px $btn_color;
  border-radius: 7px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1em;
  color: white;
  text-decoration: none;
  &:active {
    background-color: white;
    border: solid 2px $btn_color;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s ease-out;
    color: $btn_color;
    animation: scale-up-center 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
}

* {
  font-family: "Roboto", "Roboto-Bold", "Roboto-Black", "Trebuchet MS",
    "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
}

@font-face {
  font-family: "Roboto";
  src: url("../../fonts/Roboto/Roboto-Regular.ttf") format("ttf");
  font-family: "Roboto-Bold";
  src: url("../../fonts/Roboto/Roboto-Bold.ttf") format("ttf");
  font-family: "Roboto-Black";
  src: url("../../fonts/Roboto/Roboto-Black.ttf") format("ttf");
}
</style>
