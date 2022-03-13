<?
//подключение к БД
$mysqli = new mysqli("127.0.0.1", "root", "root", "forum1");
$mysqli->set_charset("UTF8");

if (strlen($_GET['search']) > 3) { //введенная строка больше 3
    $stringToSearch = htmlspecialchars($_GET['search']); //строка для поиска
    $getThemeQuery = "SELECT `title`, `login`, `date` FROM `themes` INNER JOIN `users` ON `themes`.`id_user` = `users`.`id` WHERE `themes`.`title` LIKE '$stringToSearch%'";
    $res = $mysqli->query($getThemeQuery); //найденные темы
    $getThemeCount = $res->num_rows; //количество найденных тем

    if ($getThemeCount == 0) { //если найдено 0 тем
        $answer = [
            'error' => 'Не найдено'
        ];
    } else { //если найдена хотя бы 1 тема
        $answer['numRows'] = $getThemeCount; //сколько тем найдено

        for ($i = 0; $i < $getThemeCount; $i++) { //перебор всех найденных тем
            $row = $res->fetch_assoc();
            $answer[] = [
                'title' => $row['title'],
                'login' => $row['login'],
                'date' => $row['date'],
            ];
        };
    }
    echo json_encode($answer);
}
?>

