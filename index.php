<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" integrity="sha512-P5MgMn1jBN01asBgU0z60Qk4QxiXo86+wlFahKrsQf37c9cro517WzVSPPV1tDKzhku2iJ2FVgL67wG03SGnNA==" crossorigin="anonymous">
    <title>the forum.</title>
</head>
<body>
<div class="container" id="container">
<header class="forum-header">
    <span class="forum-header-name">the forum.</span>
    <div class="header-about-user">
        <span class="header-about-user-user">user123</span>
        <a href="#" class="header-about-user-logout">Выйти</a>
    </div>
</header>
<!--    Входные значения:
        impo - 2 темы
        1234 - 1 тема
        4444 - 0 тем
-->
    <input placeholder="Поиск по темам" oninput="search()" id="input-search" type="text" name="input-search" class="input-search">
</div>
<script src="https://yastatic.net/jquery/3.3.1/jquery.min.js"></script>
<script src="js/search.js"></script>
</body>
</html>
