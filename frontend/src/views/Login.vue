<script setup>
    import { ref } from 'vue';
    const formData = ref({})
    let error_message = ref("")

    async function submitCredentials() {
      if (formData.value.email === "lalala") {
         error_message.value = "AAAAAAAAHHHHH"
      }
      const res = await fetch('/check_credentials', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',

         },
         body: JSON.stringify(formData.value),
      })
      console.log(res)
    }
</script>



<template>
<!DOCTYPE html>
<html lang="fr">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>SECURIT</title>
</head>
<body>
   <div>
      <a href="/">
      <img class="logo" src="../assets/images/logo.webp" width="175" alt="">
      </a>
   </div>
   <div>
      <h2 class="title_page">
         Connexion
      </h2>
   </div>
   <div>
      Email : 
   </div>
   <div>
         <label for="email"><input v-model="formData.email" id="email" name="email" class="email" type="text" placeholder="📧"></label>
   </div>
   <div>
      Mot de passe :
   </div>
   <div>
         <label for="password"><input v-model="formData.password" name="password" class="pwd" type="password" placeholder="🔒"></label>
   </div>
    <div>
      <p class="error">{{ error_message }}</p>
    </div>
   <div>
      
      <button @click="submitCredentials()" type="submit">
         Connexion
         
      </button>
      
   </div>
   
   <div>
      <a href="/register">Créer un compte</a>
   </div>
   <div>
      <a href="/forgotten_password">Mot de passe oublié</a>
   </div>
</body>
</html>
</template>



<style scoped>

</style>