<div id="modalWindow_child">
    <div id="closeModal">X</div>
    <div id="uid">
        <label for="uidNumber">UID в системе:</label><div id="uidNumber"><?php echo $uid+1 ?></div>
    </div>
    <form id="userData">
    <div class="personalData">
        <div><label for="surname">Фамилия:</label><input id="surname" type="text"></div>
        <div><label for="name">Имя:</label><input id="name" type="text"></div>
        <div><label for="middle_name">Отчество:</label><input id="middle_name" type="text"></div>
        <div><label for="birth">Дата рождения:</label><input id="birth" type="text"></div>
    </div>
    <div class="personalData">
        <div><label for="phone">Телефон:</label><input id="phone" type="text"></div>
        <div><label for="unit">Отдел:</label><input id="unit" type="text"></div>
        <div><label for="email">Электронная почта:</label><input id="email" type="text"></div>
    </div>

    </form>
    <div id="uidNewUser">
        <button id="modalButton">ВВОД</button>
    </div>
        <div id="radiusUser">
            <div class="radiusUser"><label for="login">Логин:</label><div id="login"></div></div>
            <div id="password" class="radiusUser"><label for="login">Пароль:</label><input type="password"></div>
        </div>

    <div id="modalResult" class="error"></div>
</div>