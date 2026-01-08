<script setup>
    import { ref, onMounted } from 'vue';
    import router from '../router';

    const visits = ref([])

    async function getVisits() {
        const response = await fetch('/get_visits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        visits.value = await response.json()
        console.log(visits)
    }

    onMounted(() => {
        getVisits()
    })
</script>

<template>
    <body>
    <div class="header">
        <div class="header-left">
            <a href="/visit_list" class="go_home">
            <h1 style="font-style: normal; font-weight: bolder;">
                
            </h1>
            </a>
        </div>
        <div class="header-center">
            <a href="/visit_list">
            <img class="logo" src="../assets/images/logo.webp" width="175" alt="">
            </a>
        </div>
        <div class="header-right">
        </div>
   </div>
   <div>
    <h1 class="title_page">
        Visites
    </h1>
   </div>
    <div>
    <input type="text" placeholder="🔎 Rechercher...">
    <form action="/add_visit" method="post">
    <button class="add_company">➕</button>
    </form>
   </div>
   <div>
    <p v-for="visit in visits">
        <span>{{ visit.id }}</span>
        <span>{{ visit.date }}</span>
        <span>{{ visit.report }}</span>
    </p>
    
   </div>
   <nav>
        <a href="/visit_list">
            <img src="../assets/images/star_bright.png" alt="" width="75">
            <span>Visites</span>
        </a>
        <a href="/company_list">
            <img src="../assets/images/star.png" alt="" width="75">
            <span>Entreprises</span>
        </a>
        <a href="/settings">
            <img src="../assets/images/star.png" alt="" width="75">
            <span>Reglages</span>
        </a>
   </nav>
</body>

</template>

<style scoped>
    span {
        margin-left: 20px;
    }
</style>

