<!-- Composant Header  -->
<template>
  <div>
    <header>
      <div class="containerLogo ">
        <img
          src="../assets/icon.png"
          alt="Logo Groupomania"
          style="width: 200px"
        />
      </div>
      <div class="btn_container">
        <div>
          <router-link tag="button" :to="`/forum/`" class="button">
            <span>Forum</span>
          </router-link>
        </div>
        <div>
          <router-link tag="button" :to="`/profile`" class="button">
            <span>Profile</span>
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;
header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 10px;
  border-bottom: solid 2px $btn_color;
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
  align-items: center;
  margin-bottom: 10px ;
  margin-top: 10px;
}
.button {
  background: $btn_color;
  margin: 10px;
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
</style>
