<template>
  <div>
    <Header />
    <div class="container">
        <div>
            <h5>Prénom : {{ userData[0].firstname }}</h5>
            <h5>Nom : {{ userData[0].lastname }}</h5>
            <h5>Adresse mail : {{ userData[0].email }}</h5>
            <button @click="deleteAccount()">Supprimer mon compte</button>
        </div>
    </div>
    <div class="container">
        <h5>Lorem</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptatibus itaque eaque vitae, cupiditate velit ullam nulla corporis non asperiores rem. Ullam, facere tempora? Quasi dolorum exercitationem temporibus eum accusantium.</p>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import http from '../../service/http';
import decodeToken from "../../service/decode";
export default {
name: 'Profile',
    components :{
        Footer,
        Header,
},
data(){
    return{
        userData: [],
        decoded : '',
    }
},
methods :{
          decode() {
          let userToken = localStorage.getItem('token');
          this.decoded = decodeToken(userToken);
          this.getOneUser();
      },
      getOneUser() {
          http().get(`/user/${this.decoded.userId}`)
          .then((response) => {
              this.userData = response.data
              console.log(this.userData);
          })
          .catch(error => console.log(error));
      },
      deleteAccount(){ /*http appelle la méthode delete sur la route */
          http().delete(`/user/delete`)
          .then(() => {
              localStorage.removeItem('token');
              this.$router.push('/');
          })
          .catch(error => console.log(error))
      }
},
created(){
    this.decode();
}

}

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
  padding: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 5px;
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
