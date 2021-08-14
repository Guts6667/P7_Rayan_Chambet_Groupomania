<template>
  <div class="containerBody">
    <header>
      <div class="containerLogo ">
        <img
          src="../assets/icon-top-font.png"
          alt="Logo Groupomania"
          style="width: 200px"
        />
      </div>
      <div class="btn_container">
        <div>
          <button class="btn_bg" @click="signIn()">Connexion</button>
        </div>
        <div>
          <button @click="signUp()">Inscription</button>
        </div>
      </div>
    </header>
    <section class="mainContainer">
      <!--INFOS-->
      <div class="container">
        <div>
          <h3 class="emph_text">Rejoins nous !</h3>
          <img
            src="../assets/icon.png"
            alt="Logo Groupomania"
            class="loremIcon"
          />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
            perspiciatis blanditiis temporibus nostrum quas adipisci,
            exercitationem molestias in ducimus labore atque consequuntur velit
            eius aut molestiae itaque cupiditate dolorum alias.
          </p>
        </div>
      </div>
      <Signup v-if="signUpForm" />
      <Signin v-if="signInForm" />
    </section>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/Signup.vue";
import Signin from "@/components/Signin.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Home",
  components: {
    Signup,
    Signin,
    Footer,
  },
  data() {
    return {
      signInForm: true,
      signUpForm: false,
    };
  },
  methods: {
    signIn() {
      this.signInForm = true;
      this.signUpForm = false;
    },
    signUp() {
      this.signUpForm = true;
      this.signInForm = false;
    },
  },
};
</script>
<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;
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
