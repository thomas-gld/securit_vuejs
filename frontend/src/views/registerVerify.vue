<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { email } from '../../globalState.mjs';
    import { attempts } from '../../globalState.mjs';
    import { error } from '../../globalState.mjs';

    const router = useRouter()
    const code = ref("")

    async function submitCode() {
        const res = await fetch('/register_verify_code', {
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
        router.push('/register')
        
      }
      
      if (res.status === 405) {
        attempts.value ++
        if (attempts.value === 3) {
            error.value = "Trois tentatives incorrectes"
            router.push('/register')
        }
        else {
        error.value = "Code incorrect"
        }
      }

      if (res.status === 200) {
        error.value = ""
        router.push('/set_name_password')
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
        Pour finaliser la création de votre compte, vérifiez votre boite mail et tapez le code de confirmation      
      </h2>
    </div>
    <div>
        Code de confirmation
    </div>
    <div>
        <label for="code"><input v-model="code" name="code" type="text" placeholder="ex 12345"></label> 
      </div>
    <div>
    <p class="error">
        {{ error }}
      </p>
      </div>
    <div>
        <button @click="submitCode">
            Continuer
        </button>
        </div>
            
        </body>

</template>