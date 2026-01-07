<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const formData = ref({})
    const isError = ref(false)

    async function submitCredentials() {
      const res = await fetch('/check_credentials', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData.value),
      })
      console.log(res)
      
      if (res.status === 403) {
         isError.value = true
      }

      if (res.status === 200) {
         isError.value = false
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
         <label for="email"><input v-model="formData.email" id="email" name="email" class="email" type="text" placeholder="📧"></label>
   </div>
   <div>
      Mot de passe :
   </div>
   <div>
         <label for="password"><input v-model="formData.password" name="password" class="pwd" type="password" placeholder="🔒"></label>
   </div>
    <div>
      <p class="error" v-if="isError">Email ou mot de passe incorrect</p>
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

</template>



<style scoped>

</style>