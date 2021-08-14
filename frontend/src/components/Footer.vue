<template>
  <div>
    <footer>
      <div>
        <span>
          <h4>Contact</h4>
        </span>
        <a href="mailto:contact_forum@groupomania.fr">
            <button>Nous écrire</button>
        </a>
      </div>
      <div >
        <span><h4>A propos</h4></span>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
$primary: #f9d8d831;
$btn_color: #b93539;
.container {
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
}
footer{
    display: flex;
    justify-content: space-evenly;
    background: $primary;
    text-align: center;
 


    button {
  background: white;
  margin: 10px;
  padding: 10px 15px;
  border: solid 2px $btn_color;
  border-radius: 7px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1em;
  color: $btn_color;
 
}
}
</style>
