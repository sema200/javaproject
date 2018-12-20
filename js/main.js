$(document).ready( function () {
    "use strict"
var table = new Table('example', 'zapros.php', {'table': 'clients', 'pole':'*', 'where': '',
    'if':'', 'attribute':'', 'values':''});
table.start();
var leftMenu = new LeftMenu('zapros.php', {'table': 'leftMenu', 'pole':'*', 'where': 'where',
        'if':'page=1 and user_id=1', 'attribute':'', 'values':''});
} );
function NewObject(fileName, data) {
    this.fileName = fileName;
    this.data = data;
}
NewObject.prototype.constructor = NewObject;
NewObject.prototype.getData = function () {
    var data = this.data;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'obrabotka/'+this.fileName, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('data='+JSON.stringify(data));
//    xhr.send();
    if(xhr.status != 200) {
        console.log(xhr.status + " " + xhr.responseText);
    } else {
        return JSON.parse(xhr.responseText);
    }
};
NewObject.prototype.addNewElement = function (mainElement, addElement) {
    if(Array.isArray(addElement)) {
        addElement.forEach(function (value, index) {
            this.addNewElement(mainElement, addElement);
        })
    } else {
/*        addElement.innerText = dannie.name_pole;
        addElement.setAttribute('id', dannie.link_page);*/
        mainElement.appendChild(addElement);
    }
};
NewObject.prototype.clearField = function (parent, element) {
    if(Array.isArray(element)) {
        element.forEach(function (value) {
            this.clearField(parent, value);
        })
    } else {
        parent.removeChild(element);
    }
}
function Table( idTables, fileName, data) {
    NewObject.call(this, fileName, data);
    this.id = idTables;
    this.table = document.getElementById(idTables);
    this.head = [];
    this.getThead = function (dataObject) {
        if (Array.isArray(dataObject)) {
            for (var key in dataObject[0]) {
                this.head.push( {data : key} );
            }
        } else {
            for (var key in dataObject) {
                console.log(dataObject);
                this.head.push( {data : key} );
            }
        }
        this.addTable();
    };
    this.setHead = function () {
        var head = this.table.getElementsByTagName('th');
        console.log(this.head[0].data);
        for(var i=0; i<head.length; i++) {
            head[i].textContent = this.head[i]['data'];
        }

    }
    this.addTable = function () {
        $('#'+ this.id).DataTable( {
            data : this.dataTable,
            columns : this.head
        } );
        this.setHead();
    };
    this.start = function () {
        this.dataTable = this.getData();
        this.getThead(this.dataTable);
    }
}
Table.prototype = new NewObject();
Table.prototype.constructor = Table;

function LeftMenu(fileName, data){
    NewObject.call(this, fileName, data);
    this.menu = document.getElementById('leftMenu');
    this.dataMenu = this.getData();
    console.log(this.dataMenu);
    this.ul = document.createElement('ul');
    var self = this;
    this.dataMenu.forEach(function (value) {
        var li = document.createElement('li');
        li.addEventListener('click', function () {
            self.clearField(self.menu, self.ul);
            var childMenu = new LeftMenu('zapros.php', {'table': 'leftMenu', 'pole':'*', 'where': 'where',
                'if':'page='+this.id+' and user_id=1', 'attribute':'', 'values':''});
            self.deleteObject();
            console.log(this.id);
            console.log(window.table);
        })
        li.innerText = value.name_pole;
        li.setAttribute('id', value.id);
        console.log(value.name_pole+" "+value.id);
        self.addNewElement(self.ul, li);
    });
    this.addNewElement(this.menu, this.ul);
    this.deleteObject = function () {
        delete this;
    }
};
LeftMenu.prototype = new NewObject();
LeftMenu.prototype.constructor = LeftMenu;
