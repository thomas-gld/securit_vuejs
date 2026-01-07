<script setup>
    import { ref } from 'vue';

    const error = ref('')
    const formData = ref({})

    async function submitCode() {
        const res = await fetch('/login_verify_code', {
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
    
    <div>
        Code de confirmation
    </div>
    <div>
        <label for="code"><input v-model="formData.code" name="code" type="text" placeholder="ex : 12345"></label>
        
    </div>
    <div>
    <p class="error">
         {{ error }}
      </p>
      </div>
      
    <div>
            <button @click="submitCode()">
                Continuer
            </button>
            
        
    </div>
    <label for="email"><input name="email" type="email" value="<%=email%>" style="visibility: hidden;"></label>
        <label for="attempts"><input name="attempts" type="text" value="<%=attempts%>" style="visibility: hidden;"></label>
   
</body>
</template>