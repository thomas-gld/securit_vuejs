<script setup>
    import { ref } from 'vue';
    const error = ref('')

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
         <label for="email"><input name="email" class="email" type="email" placeholder="📧"></label>
   </div>
   <div>
    <p class="error">
         {{ error }}
      </p>
      </div>
   <div>
      <button>
         Continuer
      </button>
    </div>
    <div>
      <a href="/">Connexion</a>
   </div>
</body>
</template>