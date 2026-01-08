<script setup>
    import { ref } from 'vue';
    import router from '../router';
    import { email } from '../../globalState.mjs';
    import { error } from '../../globalState.mjs';

    const role = ref("")
    const userName = ref("")
    const password = ref("")
    const passwordConfirm = ref("")

    async function submitNewUser() {
        if (password.value !== passwordConfirm.value) {
            error.value = "Les mots de passe ne correspondent pas"
        }
        else if (role.value === "") {
            error.value = "Vous devez choisir un role"
        }
        else {
            const res = await fetch('/register_new_user', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email.value,
            userName: userName.value,
            role: role.value,
            password: password.value,
        }),
      })
      console.log(res)
      
      if (res.status === 403) {
        error.value = "Erreur ..."
        router.push('/register')
      }
      if (res.status === 200) {
        error.value = "Compte créé avec succes"
        router.push('/')
      }

    
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
     {{ email }}
   </div>
   <div>
      <h2 class="title_page">
         Choisissez un nom d'utilisateur et un mot de passe
      </h2>
   </div>
   <form @submit.prevent="submitNewUser">
   <div>
      Nom d'utilisateur
   </div>
   <div>
   <label for="name"><input v-model="userName" name="name" type="text" value=""></label>
   </div>
   <div>
      Role
   </div>
   <div>
      <label for="role"><select v-model="role" name="role">
         <option value="admin">Admin</option>
         <option value="inspector">Inspector</option>
      </select>
   </label>
   </div>
   <div>
    Mot de passe
   </div>
   <div>
    <label for="password">
        <input v-model="password" name="password" type="password" placeholder="🔒" value="">
    </label>
   </div>
   <div>
    Mot de passe (confirmer)
    </div>
   <div>
    <label for="password"><input v-model="passwordConfirm" name="password_confirm" type="password" placeholder="🔒" value=""></label></div>

   <div>
    <p class="error">
        {{ error }}
      </p>
      </div>

        <button type="submit">
            Créer
        </button>
   </form>
        

</body>
</template>