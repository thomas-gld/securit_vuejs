<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { email } from '../../globalState.mjs';
    import { error } from '../../globalState.mjs';

    const router = useRouter()
    const password = ref("")

    async function submitCredentials() {
      const res = await fetch('/check_credentials', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email.value,
            password: password.value
         }),
      })
      console.log(res)
      
      if (res.status === 403) {
         error.value = "Email ou mot de passe incorrect"
      }

      if (res.status === 200) {
         error.value = ""
         router.push('/login_verify')
         
      }

    }

</script>



<template>
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
         <label for="email"><input v-model="email" id="email" name="email" class="email" type="text" placeholder="📧"></label>
   </div>
   <div>
      Mot de passe :
   </div>
   <div>
         <label for="password"><input v-model="password" name="password" class="pwd" type="password" placeholder="🔒"></label>
   </div>
    <div>
      <p class="error">{{ error }}</p>
    </div>
   <div>
      
      <button @click="submitCredentials()">
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

</template>



<style scoped>

</style>