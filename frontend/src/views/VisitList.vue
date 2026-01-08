<script setup></script>

<template>
    <body>
    <div class="header">
        <div class="header-left">
            <a href="/visit_list" class="go_home">
            <h1 style="font-style: normal; font-weight: bolder;">
                <%=user_name%>
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
    <table>
        <tr>
            <th>
                Date
            </th>
            <th>
                Entreprise
            </th>
            <th>
                
            </th>
        </tr>
        <tr>
            <td style="text-align: center;">
                27/11/2024
            </td>
            <td style="text-align: center;">
                EC1
            </td>
            <td style="text-align: center;">
                ✏️
            </td>
        </tr>
    </table>
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

