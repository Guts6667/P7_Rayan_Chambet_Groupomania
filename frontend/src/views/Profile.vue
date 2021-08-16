<template>
  <div>
    <Header />
    <div class="container">
      <div>
        <h3>Votre Profile :</h3>
        <p>Vous pouvez y retrouver vos informations personnelles.</p>
      </div>
      <div>
        <h4>Prénom : {{ userData[0].firstname }}</h4>
        <h4>Nom : {{ userData[0].lastname }}</h4>
        <h4>Adresse mail : {{ userData[0].email }}</h4>
        <button @click="deleteAccount()">Supprimer mon compte</button>
      </div>
    </div>
    <div class="container">
      <h4>Une question ?</h4>
      <p>
        N'hésitez pas à écrire à nos équipes si vous désirez des informations
        sur le réseau social de Groupomania
      </p>
      <h4>Vous souhaitez supprimer votre profile ?</h4>
      <p>
        Il vous suffit de clique sur le bouton :
        <br />
        <em>"Supprimer mon compte".</em>
        <br />
        <br />
        N'hésitez pas à nous contacter afin que nous puissions améliorer notre
        application et vous garder parmi nous !
        <br />
        <br />
        Toutes vos données personnelles, publications et posts seront supprimées
        de l'application et de notre base de données
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import http from "../../service/http";
import decodeToken from "../../service/decode";
export default {
  name: "Profile",
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      userData: [],
      decoded: "",
    };
  },
  methods: {
    decode() {
      let userToken = localStorage.getItem("token");
      this.decoded = decodeToken(userToken);
      this.getOneUser();
    },
    getOneUser() {
      http()
        .get(`/user/${this.decoded.userId}`)
        .then((response) => {
          this.userData = response.data;
          console.log(this.userData);
        })
        .catch((error) => console.log(error));
    },
    deleteAccount() {
      /*http appelle la méthode delete sur la route */
      http()
        .delete(`/user/delete`)
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
  created() {
    this.decode();
  },
};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b83539;
.containerBody {
  min-height: 100vh;
  max-height: 100%;
  width: 100%;
  margin: 0px;
}
header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 10px;
}
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 15px;
}

.btn_container {
  display: flex;
  justify-content: center;
}
button {
  background: $btn_color;
  margin: 10px;
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
@keyframes scale-up-center {
  50% {
    transform: scale(1);
  }
  85% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1.1);
  }
}

.mainContainer {
  display: grid;
  flex-flow: row-reverse wrap;
}

.loremIcon {
  float: right;
  margin: 0;
  width: 150px;
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
