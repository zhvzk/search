function search() {
    let inputSearch = document.getElementById('input-search');//поле ввода, по которому производится поиск
    let inputSearchValue = inputSearch.value.trim();
    if (inputSearchValue.length > 3) { //если введено больше трех символов
        $.ajax({
            url: '../php/searchQuery.php',
            method: 'GET',
            type: 'text',
            data: {'search': inputSearchValue},
            success: function (response) {
                let result = JSON.parse(response); //найденные темы
                let count = result.numRows; //сколько тем найдено

                let container = document.getElementById('container'); //обертка из bootstrap
                let themesContainers = document.getElementsByClassName('container-themes'); //поиск по классам всех индивидуальных контейнеров для тем
                let getErrorMessage = document.getElementById("not-found"); //сообщение об ошибке

                if (result['error']) { //если темы не найдены
                    if (getErrorMessage === null) {
                        removeThemes(themesContainers); //если в DOM есть темы, они удаляются

                        //создание и вывод сообщения об ошибке
                        let errorMessage = document.createElement('span');
                        errorMessage.innerText = result['error'];
                        errorMessage.id = "not-found";
                        container.append(errorMessage);
                    }
                } else { //если темы найдены
                    if (themesContainers.length === 0) { //если в DOM нет ни одного индивидуального контейнера для тем (нет ни одной темы)
                        if (getErrorMessage !== null) { //если в DOM есть сообщение об ошибке, оно удаляется
                            getErrorMessage.remove();
                        }
                        inputThemes(result, count, container); //вывод тем
                    } else {//если в DOM есть хотя бы одна тема
                        removeThemes(themesContainers); //существующие темы удаляются из DOM
                        inputThemes(result, count, container); //вывод найденных тем
                    }
                }
            }
        });
    } else { //если длина запроса 3 и меньше
        let themesContainers = document.getElementsByClassName('container-themes'); //поиск по классам всех индивидуальных контейнеров для тем
        let getErrorMessage = document.getElementById("not-found"); //сообщение об ошибке
        removeThemes(themesContainers);//удаление найденных тем из DOM (если они есть)
        if (getErrorMessage !== null) { //удаление сообщения об ошибке (если оно есть)
            getErrorMessage.remove();
        }
    }
}

//функция вывода всех найденных тем на экран
function inputThemes(result, count, container) {
    //count = сколько тем найдено
    for (let i = 0; i < count; i++) {
        //создание индивидуального контейнера для темы в container
        //container = обертка из bootstrap
        let themesContainer = document.createElement('div');
        container.append(themesContainer);

        //создание контейнера для информации о теме
        let aboutTheme = document.createElement('div');
        themesContainer.append(aboutTheme);

        //создание и заполнение названия темы
        let aboutThemeTitle = document.createElement('span');
        aboutThemeTitle.innerText = result[i].title;
        aboutTheme.append(aboutThemeTitle);

        //создание и заполнение даты создания темы
        let aboutThemeDate = document.createElement('span');
        aboutThemeDate.innerText = result[i].date;
        aboutTheme.append(aboutThemeDate);

        //создание и заполнение автора темы
        let aboutThemeAuthor = document.createElement('span');
        aboutThemeAuthor.innerText = result[i].login;
        aboutTheme.append(aboutThemeAuthor);

        //создание индивидуальной для каждой темы кнопки "посмотреть"
        let aboutThemeButton = document.createElement('button');
        aboutThemeButton.innerText = "Посмотреть";
        themesContainer.append(aboutThemeButton);

        //добавление классов созданным элементам
        container.classList.add('container');
        themesContainer.classList.add('container-themes');
        aboutTheme.classList.add('about-theme');
        aboutThemeTitle.classList.add('about-theme-title');
        aboutThemeDate.classList.add('about-theme-text');
        aboutThemeAuthor.classList.add('about-theme-author');
        aboutThemeButton.classList.add('button-visit');

        //добавление id индивидуальному контейнеру темы
        themesContainer.id = "themes-container-" + i;

    }
}

//функция удаления тем из DOM
//themesContainers = поиск контейнеров тем по классу
function removeThemes(themesContainers) {
    //если найден хотя бы один контейнер
    if (themesContainers.length !== 0) {
        //удаление всех найденных контейнеров по id
        for (let i = 0; i <= themesContainers.length; i++) {
            tmp = "themes-container-" + i;
            tmp = document.getElementById(tmp);
            tmp.remove();
        }
    }
}