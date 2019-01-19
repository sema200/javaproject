$(document).ready(function () {
    const table = new Table('example', 'zapros.php', {
        'table': 'clients', 'pole': '*', 'where': '',
        'if': '', 'attribute': '', 'values': ''
    }, 'content');
    table.start();
    const leftMenu = new LeftMenu('zapros.php', {
        'table': 'leftMenu', 'pole': '*', 'where': 'where',
        'if': 'page=1 and user_id=1', 'attribute': '', 'values': ''
    }, 'leftMenu');
    new Button(document.getElementById('add'), 'loadTemplate.php',
        function (e) {
            e.stopPropagation();
            let modalWindow = document.getElementById('modalWindow');
            this.addRemoveClass(modalWindow, 'modalWindow');
            this.addRemoveClass(document.getElementById('backModalWindow'), 'backModalWindow');
            if (!document.getElementById('closeModal')) {
                this.loadScript('js/checkModal.js');
                if (this.cacheStorage.modalWindow) {
                    modalWindow.innerHTML = this.cacheStorage.modalWindow;
                } else {
                    this.cacheStorage.modalWindow = this.getData(this.data, this.fileName);
                    modalWindow.innerHTML = this.getData(this.data, this.fileName);
                }
                this.newEvent(document.getElementById('closeModal'));
/*                Array.from(document.forms.userData).forEach(
                    function (value) {
                        console.log(value);
                    }
                );*/
                document.getElementById('modalButton').addEventListener('click', function (ev) {    // вносим данные в БД
                    let dataUser = {
                        "uid": document.getElementById('uidNumber').textContent,
                        "surname": document.getElementById('surname').value,
                        "name": document.getElementById('name').value,
                        "middle_name": document.getElementById('middle_name').value,
                        "birth": document.getElementById('birth').value,
                        "phone": document.getElementById('phone').value,
                        "unit": document.getElementById('unit').value,
                        "email": document.getElementById('email').value
                    };
                    if (Array.from(modalWindow.getElementsByTagName('input')).some(function (value) {
                        return value.className == 'inputError';
                    })) {
                        this.setError(document.getElementById('modalResult'), 'Даные не корректны!');
                    } else {

                        let resultOfNewUser = this.getData(dataUser, 'insert.php');
                        if (typeof resultOfNewUser == 'number') {
                            document.getElementById('uidNumber').textContent = parseInt(document.getElementById('uidNumber').textContent, 10) + 1;
                            dataUser.id = resultOfNewUser;
                            this.idTable.addRow(dataUser);
                            this.setError(document.getElementById('modalResult'), 'Данные внесены в базу данных!');
                        } else {
                            this.setError(document.getElementById('modalResult'), 'Ошибка внесения в базу данных!');
                        }
                    }
                }.bind(this));
            } else {
                this.clearField(modalWindow);
            }
        }, {'templateName': 'modalWindow', 'ID': ''}, table);
    new Button(document.getElementById('del'), 'delete.php', function (e) {
        e.stopPropagation();
        if ($('#' + table.id).DataTable().rows('.selected')[0].length) {
            let listUid = Object.values($('#' + table.id).DataTable().rows('.selected').data()).filter(function (value) {
                return value.uid;
            });
            console.log(listUid);
            let listUid1 = listUid.map(function (value) {
                return value.uid
            });
            console.log(listUid1.join(','));
            this.data = {
                'table': 'clients',
                'where': 'uid',
                'attribute': 'in',
                'values': '(' + listUid1.join(',') + ')'
            };
            if (!this.getData(this.data, this.fileName)) {
                $('#' + table.id).DataTable().rows('.selected').remove().draw(false);
            }
        } else {
            console.log('1');
        }
    }, table);
});

function NewObject(fileName, data) {
    this.fileName = fileName;
    this.data = data;
    this.cacheStorage = {};
}

NewObject.prototype.constructor = NewObject;
NewObject.prototype.getData = function (data, fileName) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'obrabotka/' + fileName, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('data=' + JSON.stringify(data));
//    xhr.send();
    if (xhr.status != 200) {
//        console.log(xhr.status + " " + xhr.responseText);
        return false;
    } else {
//        console.log(xhr.responseText);
        try {
            return JSON.parse(xhr.responseText);
        } catch (e) {
            return false;
        }

    }
};
NewObject.prototype.addNewElement = function (mainElement, addElement) {
    "use strict";
    let listener = arguments[4] || 0;
    let listener_Table = arguments[5] || 0;
    let self = this;
    if (Array.isArray(arguments[2]) || typeof arguments[2] === 'object') {
        this.liData = function (item) {
            console.log(item);
            var element = this.newElement(addElement);
            if (typeof listener === 'function' && item['tables'] == '') {
                listener(element);
            } else if (typeof listener_Table === 'function' && item['tables'] != '') {
                listener_Table(element);
            }
            element.innerText = item['name_pole'];
            element.setAttribute('id', item['link_page']);
            element.setAttribute('name', item['tables']);
            this.addNewElement(mainElement, element);
        }
        try {
            arguments[2].forEach(function (value) {
                this.liData(value);
            }, this);
        } catch (err) {
            self.liData(arguments[2]);
        }

        if (typeof arguments[3] === 'function') {
            arguments[3](mainElement);
        }
    } else {
        mainElement.appendChild(addElement);
    }
};
NewObject.prototype.clearField = function (parent, element) {
    if (!element) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    } else {
        parent.removeChild(element);
    }
};
NewObject.prototype.addNewListener = function (typeEvent, newFunction) {
    return function (element) {
        element.addEventListener(typeEvent, newFunction);
    }
};
NewObject.prototype.newElement = function (element) {
    return document.createElement(element);
}
NewObject.prototype.addRemoveClass = function (element, typeClass) {
    element.classList.toggle(typeClass);
}
NewObject.prototype.setError = function (element, error) {
    element.innerText = error;
    setTimeout(function () {
        element.innerText = '';
    }, 5000);
}
NewObject.prototype.loadScript = function importFunction(src) {
    /*    if(!Array.from(document.getElementsByTagName('head')[0].childNodes).some(function (value) {
            if(value.src && value.src.indexOf(src) != -1) {
    //            document.getElementsByTagName('head')[0].removeChild(value);
                return true;
            } else {return false;}
        })) {*/
    Array.from(document.getElementsByTagName('head')[0].childNodes).some(function (value) {
        if (value.src && value.src.indexOf(src) != -1) {
            document.getElementsByTagName('head')[0].removeChild(value);
            return true;
        } else {
            return false;
        }
    })
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', src + "?r=" + Math.floor(Math.random() * 80000));
    scriptElem.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
//    }
}

function Table(idTables, fileName, data, parentElement) {
    NewObject.call(this, fileName, data);
    this.id = idTables;
    this.parentDiv = document.getElementById(parentElement);
    this.head = [];
    this.getThead = function (dataObject) {
        try {
            this.head = Object.keys(dataObject[0]).map(function (value) {
                return {"data": value};
            });
        } catch (e) {
            this.head = Object.keys(dataObject).map(function (value) {
                return {"data": value};
            });
        }
        this.addTable();
        this.head.length = 0;
    };
    this.addTable = function () {
        $('#' + this.id).DataTable({
            data: this.dataTable,
            columns: this.head
        });
        Object.values($('#' + this.id).DataTable().columns().header()).forEach(function (value, key) {
            try {
                value.textContent = this.head[key]['data'];
            } catch (e) {
            }
        }.bind(this));
    };
    this.start = function () {
        this.clearField(this.parentDiv);
        this.table = this.newElement('table');
        this.table.setAttribute('id', idTables);
        this.table.setAttribute('class', 'row-border');
        this.addNewListener('click', this.delRow)(this.table);
        this.addNewElement(document.getElementById(parentElement), this.table);
        this.dataTable = this.getData(this.data, this.fileName);
        this.getThead(this.dataTable);
    }
}

Table.prototype = new NewObject();
Table.prototype.constructor = Table;

Table.prototype.addRow = function (data) {
    let table = $('#' + this.id).DataTable();
    table.row.add(data).draw();
}
Table.prototype.delRow = function (e) {
    e.target.parentNode.classList.toggle('selected');
}

function LeftMenu(fileName, data, parent) {
    NewObject.call(this, fileName, data);
    var self = this;
    this.createBlock = function (parent) {
        return function (children) {
            self.addNewElement(parent, children);
        }
    }
    this.addNewElement(this.newElement('ul'), 'li', this.getData(this.data, this.fileName), this.createBlock(document.getElementById(parent)), this.addNewListener('click', function (e) {
        console.log(e.target.getAttribute('name'));
        e.stopPropagation();
        if (e.target.children.length) {
            while (e.target.lastElementChild) {
                e.target.removeChild(e.target.lastElementChild);
            }
        } else {
            var block = new LeftMenu('zapros.php', {
                'table': 'leftMenu', 'pole': '*', 'where': 'where',
                'if': `page=${e.target.id} and user_id=1`, 'attribute': '', 'values': ''
            }, e.target.id)
        }
    }), this.addNewListener('click', function (e) {
        e.stopPropagation();
        var liTable = new Table('example', 'zapros.php', {
            'table': e.target.getAttribute('name'), 'pole': '*', 'where': '',
            'if': '', 'attribute': '', 'values': ''
        }, 'content');
        liTable.start();
    }));


};
LeftMenu.prototype = new NewObject();
LeftMenu.prototype.constructor = LeftMenu;

function Button(element, filename, eventFunctions) {
    NewObject.call(this, filename, arguments[3]);
    if (arguments[3]) {
        this.data = arguments[3];
    }
    this.idTable = arguments[4];
    this.button = element;
    this.newEvent = this.addNewListener('click', eventFunctions.bind(this));
    this.newEvent(this.button);
}

Button.prototype = new NewObject();
Button.prototype.constructor = Button;

function InputPole(pole, event) {
    NewObject.call(this);
    this.elementInput = pole;
    this.charMassiv = [];
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'function') {
            this.addNewListener(event, arguments[i].bind(this))(pole);
        }
    }
}

InputPole.prototype = new NewObject();
InputPole.prototype.constructor = InputPole;
InputPole.prototype.errorClass = function (regexType, errorClass) {
    return function (e) {
        if (!regexType.test(e.target.value)) {
            if (this.elementInput.className != errorClass) {
                this.addRemoveClass(this.elementInput, errorClass);
            }
        } else {
            if (this.elementInput.className == errorClass) {
                this.addRemoveClass(this.elementInput, errorClass);
            }
        }
    }.bind(this);
};
InputPole.prototype.controlChar = function (regexType, length) {
    return function (e) {
        if ((!regexType.test(e.target.value.slice(-1)) || e.target.value.length > length) && e.target.value.length != 0) {
            e.target.value = e.target.value.slice(0, -1);
        } else {
            if(arguments[1]) {
                if(e.target.value.length > document.getElementById('login').innerText.length) {
                    this.charMassiv.push(arguments[1](e.target.value.slice(-1).toLowerCase()));
                    document.getElementById('login').innerText = this.charMassiv.join('');
                } else {
                    this.charMassiv = Array.from(e.target.value).map(function (value) {
                        return this(value);
                    }.bind(arguments[1]));
                    document.getElementById('login').innerText = this.charMassiv.join('');
                }
            }
        }
    }.bind(this);
}