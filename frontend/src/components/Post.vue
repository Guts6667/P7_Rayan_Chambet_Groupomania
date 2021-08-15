<template>
  <div>
    <div class="containerBtnPost">
      <textarea id="" class="input"></textarea>
      <div>
        <button>Postez !</button>
      </div>
    </div>
    <div class="container">
      <div>
        <div class="post">
          <h5 class="postFullname">Rayan Chambet :</h5>
          <p class="text">
            Hello tout le monde ! Voici mon premier post 😊
          </p>
          <h6 class="date">Créé le : 19/12/2021</h6>
        </div>
        <div class="comment">
          <h5>Sarah Roi :</h5>
          <p class="text">Cool ! Bienvenue 🥳</p>
          <h6 class="date">Créé le : 20/12/2021</h6>
        </div>
      </div>
          <textarea id="" class="input"></textarea>
          <button>Commenter</button>
    </div>
    <div class="container">
      <div>
        <div class="post">
          <h5 class="postFullname">Rayan Chambet :</h5>
          <p class="text">
            Hello tout le monde ! Voici mon premier post 😊
          </p>
          <h6 class="date">Créé le : 19/12/2021</h6>
        </div>
        <div class="comment">
          <h5>Sarah Roi :</h5>
          <p class="text">Cool ! Bienvenue 🥳</p>
          <h6 class="date">Créé le : 20/12/2021</h6>
        </div>
      </div>
          <textarea id="" class="input"></textarea>
          <button>Commenter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
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
  border-radius: 7px;
  .postFullname {
    color: $btn_color;
    text-align: left;
  }
}
.text{
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
  padding: 0 5px ;
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
