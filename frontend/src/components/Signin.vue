<!-- Composant de connexion -->
<template lang="fr">
  <div class="container">
    <div class="form__SignIn">
      <h3>Connexion :</h3>
      <div class="main__container__input">
        <input
          v-model="email"
          class="input"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
          minlength="2"
          aria-label="input email"
        />
      </div>
      <div class="main__container__input">
        <input
          v-model="password"
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
          minlength="2"
          aria-label="input password"
        />
      </div>
      <div>
        <button @click="send()" role="button" >Se connecter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    /*Méthode permettant d'envoyer les données au backend  lors de la connexion*/
    send() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          let token = res.data.token;
          localStorage.setItem("token", token);
          this.$router.push('/forum');
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;
header {
  display: flex;
}
.container{
  display: flex;
  justify-content: center;
  padding: 10px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 5px;
}
input {
  border: none;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
}
input:invalid {
  border: 1px solid $btn_color;
}
input:valid {
  border: 1px solid rgb(57, 216, 57);
}
.main__container__input {
  width: 150px;
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
