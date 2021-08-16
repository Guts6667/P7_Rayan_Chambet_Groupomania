<!-- Vue utilisée lorsqu'on charge un post en particulier -->
<template>
  <div>
    <Header />
    <div class="container">
      <div>
        <div class="post">
          <h5 class="postFullname">{{ post.username }} :</h5>
          <p class="text">
            {{ post.post_content }}
          </p>
          <h6 class="date">Créé le : {{ convertDate(post.created) }}</h6>
        </div>
        <div v-if="isUserAdmin || (post.user_id === currentId)">
            <button @click="deletePost(post.id)">Supprimer</button>
        </div>
        <div v-for="(comment, idx) in comments" :key="idx" class="comment">
          <h5>{{ comment.username }}</h5>
          <p class="text">{{ comment.comment }}</p>
          <h6 class="date">Créé le : {{ convertDate(comment.created) }}</h6>
          <div v-if="isUserAdmin || (comment.user_id === currentId)">
            <button @click="deleteComment(post.id, comment.id)">x</button>
          </div>
        </div>
      </div>
      <textarea v-model="addComment" id="" class="input"></textarea>
      <div>
        <button @click="postComment()">Commenter</button>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import http from "../../service/http";
import moment from "moment"; /*Utilisé pour convertir les dates */
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import decodeToken from "../../service/decode";
export default {
  name: "OnePost",
  components: {
    Header,
    Footer,
  },
data() {
      return {
        post: [],
        userId: '',
        comments: [],
        writeComment: '',
        decoded :'',
        admin: '',
        isUserAdmin: false,
        isCurrent : false,
        isCurrentComment: false,
        currentId : '',
        postUser: '',
        commentUserId: '',
        addComment : ''
      }
    },
    created() { /*Hook */
      this.getPostId();
      this.getOnePost();
      this.getComments();
      this.decode();
    },
    methods: {
      /* Méthode permetant récupérer un post */
      getOnePost() {
        http().get(`/post/${this.getPostId()}`)
        .then( (response) => {
          this.post = response.data;
          this.postUser = this.post.user_id;
        })
        .catch( (error) => console.log(error))
      },
      /* Récupère l'id du post */
      getPostId() {
        let postId = this.$route.params.id;
        return postId;
      },
      /* Récupères les commentaires */
      getComments() {
        http().get(`/post/${this.getPostId()}/comment`)
        .then((response) => {
          console.log('test')
          this.comments = response.data;
          console.log(response.data);
          this.commentUserId = response.data[0].user_id;
        })
        .catch(error => console.log(error))
      },
      /* Supprime le post via son id */
      deletePost(id) {
        http().delete(`post/${id}`)
        .then( () => {
          this.$router.push("/forum");
        })
        .catch( (error) => console.log(error));
      },
      /* Supprime le commentaire */
      deleteComment(postId, commentId) {
        http().delete(`post/${postId}/comment/${commentId}`)
        .then((response) => {
          console.log(response);
          this.getComments();
        })
        .catch((error) => console.log(error));
      },
      /* Décode le token */
      decode() {
          let userToken = localStorage.getItem('token');
          this.decoded = decodeToken(userToken);
          this.getOneUser();
      },
      /* Récupère les datas de l'utilisateur */
      getOneUser() {
          http().get(`/user/${this.decoded.userId}`)
          .then((response) => {
              this.admin = response.data[0].user_admin;
              this.currentId = response.data[0].id;
              this.isAdmin();
              this.isCurrentUser();
              this.isCurrentUserComment();
          })
          .catch(error => console.log(error));
      },
      /* Si le post appartient à l'utilisateur */
      isCurrentUser() {
        if(this.postUser === this.currentId) {
          this.isCurrent = true;
        } else {
          this.isCurrent = false;
        }
      },
      /* Si le commentaire appartient à l'utilisateur */
      isCurrentUserComment() {
        if(this.commentUserId === this.currentId) {
          this.isCurrentComment = true;
        } else {
          this.isCurrentComment = false;
        }
      },
      /* Si l'utilisateur possède un compte administrateur */
      isAdmin() {
          if(this.admin == 1) {
              this.isUserAdmin = true;
          }
          if(this.admin == 0) {
              this.isUserAdmin = false;
          }
      },
      /* Convertit les dates */
      convertDate(date) {
        return moment(date).subtract(10, 'days').calendar();
      },
      /* Créer un commentaire */
      postComment(){
          http().post(`/post/${this.getPostId()}/comment`, {comment: this.addComment})
          .then(() => {
              this.addComment = '';
              this.getComments();
          })
          .catch(error => console.log(error));
      }
    }
  

};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 20px 10px;
}
.containerBtnPost {
  margin: 20px 0 25px 0;
}

.post {
  text-align: left;
  padding: 15px;
  width: 80%;
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

button {
  background: $btn_color;
  margin: 5px;
  padding: 10px 15px;
  border: solid 2px $btn_color;
  border-radius: 7px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1em;
  color: white;
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
