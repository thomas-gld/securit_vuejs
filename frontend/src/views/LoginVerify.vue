<script setup>
    import { ref } from 'vue';
    import router from '../router';
    import { email } from '../../globalState.mjs';
    import { attempts } from '../../globalState.mjs';
    import { error } from '../../globalState.mjs';

    const code = ref("")

    async function submitCode() {
        const res = await fetch('/login_verify_code', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email.value,
            code: code.value,
            attempts: attempts.value
        }),
      })
      console.log(res)

      if (res.status === 403) {
        error.value = "Code expiré"
        router.push('/')
        
      }
      
      if (res.status === 405) {
        attempts.value ++
        if (attempts.value === 3) {
            error.value = "Trois tentatives incorrectes"
            router.push('/')
        }
        else {
        error.value = "Code incorrect"
        }
      }

      if (res.status === 200) {
        error.value = ""
        router.push("/visit_list")
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
        Verifiez votre boite mail et tapez le code de confirmation
      </h2>
    </div>
    
    <form @submit.prevent="submitCode">
    <div>
        Code de confirmation
    </div>
    <div>
        <label for="code"><input v-model="code" name="code" type="text" placeholder="ex : 12345"></label>

    </div>
    <div>
    <p class="error">
         {{ error }}
      </p>
      </div>

    <div>
            <button type="submit">
                Continuer
            </button>


    </div>
    </form>
   
</body>
</template>