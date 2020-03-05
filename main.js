const $ = (el) => document.querySelector(el);
const validate_mail = (el) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(el);

let user = 0;
let max_page = 0;
let page = 1;
let order = '';
let desc = '';

async function load_script() {
    res = await fetch(`PHP/TasksController.php?page=${page}&order=${order}&desc=${desc}`, {
        method: "GET",
    }).then(a => a.json());
    if (await res) {
        $('#main_task').innerHTML = '';
        for (i = 0; i < res[0].length; i++) {
            let div = document.createElement('div');
            div.classList = "card-body bg-white bg-border";
            $('#main_task').appendChild(div);
            let h5 = document.createElement('h5');
            h5.classList = "card-title";
            h5.innerHTML = res[0][i]['username'];
            div.appendChild(h5);
            let h6 = document.createElement('h6');
            h6.classList = "card-subtitle mb-2";
            h6.innerHTML = res[0][i]['mail'];
            div.appendChild(h6);
            if (user !== '3') {
            let div1 = document.createElement('div');
            div1.classList = "card-text card_need_info";
            div1.innerHTML = res[0][i]['taskinfo'];
            div.appendChild(div1);
                let div2 = document.createElement('div');
                div2.classList = "card-text card_need_info";
                if (res[0][i]['work'] === "0")
                    div2.innerHTML = 'не выполняется';
                if (res[0][i]['work'] === "1")
                    div2.innerHTML = 'выполняется';
                div.appendChild(div2);
                div.appendChild(div2);
            } else {
                let div1 = document.createElement('div');
                div1.classList = "form-group";
                div1.innerHTML = `<textarea class="form-control" id="txtarea${res[0][i]['id']}" rows="3">${res[0][i]['taskinfo']}</textarea>`
                div.appendChild(div1);
                let div2 = document.createElement('div');
                div2.classList = "card-text card_need_info";
                if (res[0][i]['work'] === "0")
                div2.innerHTML = '<select id="selector'+res[0][i]['id']+'" class="form-control"> <option value="0" selected>не выполняется</option><option value="1">выполняется</option></select> <button type="button" onclick="changeTask('+res[0][i]['id']+')" class="btn btn-outline-primary">Сохранить</button>';
                if (res[0][i]['work'] === "1")
                    div2.innerHTML = '<select id="selector'+res[0][i]['id']+'" class="form-control"> <option value="0" >не выполняется</option><option value="1" selected>выполняется</option></select> <button type="button" onclick="changeTask('+res[0][i]['id']+')" class="btn btn-outline-primary">Сохранить</button>';
                div.appendChild(div2);

            }
        }
        if (res[1] % 3 !== 0) {
            max_page = (res[1] - res[1] % 3) / 3 + 1
        } else {
            max_page = res[1] / 3
        }

    }
}

async function log_in() {

    let data = new FormData();
    if ($('#login').value !== '' && $('#password').value !== '') {
        data.append('login', $('#login').value);
        data.append('password', $('#password').value);
        let res = await fetch('PHP/UsersController.php', {
            method: "POST",
            body: data,
        }).then(a => a.json());
        user = await res['option'];
        if (user === '3') {
            alert('Вы успешно вошли как администратор')
            $('#form_first').style.display = 'none';
            $('#form_second').style.display = 'flex';
            load_script();
        } else {
            alert('Неверный логин или пароль');
        }
    } else {
        alert('Неверный логин или пароль');
    }
}

function log_out() {
    $('#form_first').style.display = 'flex';
    $('#form_second').style.display = 'none';
    $('#login').value = '';
    $('#password').value = '';
    user = 0;
    load_script();
}

function crt() {
    $('#form_create').style.display = 'block';
}

function crt_out() {
    $('#form_create').style.display = 'none';
}


async function create_task() {
    crt_out();
    let data = new FormData();
    if ($('#username').value !== '') {
        data.append('username', $('#username').value);
    } else {
        alert('Введите имя пользователя');
        return false;
    }
    if ($('#mail').value !== '' && validate_mail($('#mail').value)) {
        data.append('mail', $('#mail').value);
    } else {
        alert('ваша почта должна пройти валидацию');
        return false;
    }
    if ($('#text').value !== '') {
        data.append('text', $('#text').value);
    } else {
        alert('введите текст задачи');
        return false;
    }
    let res = await fetch('PHP/TasksController.php', {
        method: "POST",
        body: data,
    }).then(a => a.json());
    if (await res) {
        load_script();
    }
}

function page_next() {
    if (page !== max_page) {
        page++;
        load_script();
        $('#pages').innerHTML = page;
    }
}

function page_prev() {
    if (page !== 1) {
        page--;
        load_script();
        $('#pages').innerHTML = page;
    }
}
async  function changeTask(id) {
 let data = new FormData();

 data.append('id', id);
 data.append('text', $('#txtarea'+id).value);
 data.append('work', $('#selector'+id).value);
 let res = await fetch('PHP/TasksController.php', {
     method: "POST",
     body: data,
 }).then(a => a.json());
    if (await res) {
        load_script();
    }
}
function orders(orderS) {
    if (order === orderS){
        desc = desc === 0 ? 1 : 0;
    }else{
        order = orderS;
    }
    load_script();
}