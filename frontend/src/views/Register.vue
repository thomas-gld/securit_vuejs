<script setup>
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';
   import { email } from '../../globalState.mjs';
   import { error } from '../../globalState.mjs';

   const router = useRouter()

   async function submitEmail() {
      const res = await fetch('/check_register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email.value,
         }),
      })
      console.log(res)

      if (res.status === 403) {
         error.value = "Un compte avec cet email existe déjà"
      }
      if (res.status === 200) {
         error.value = ""
         router.push('/register_verify')
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
        Creation de compte
    </h2>
   </div>
   <div>
        Email
   </div>
   <div>
         <label for="email"><input v-model="email" name="email" class="email" type="email" placeholder="📧"></label>
   </div>
   <div>
    <p class="error">
         {{ error }}
      </p>
      </div>
   <div>
      <button @click="submitEmail">
         Continuer
      </button>
    </div>
    <div>
      <a href="/">Connexion</a>
   </div>
</body>
</template>