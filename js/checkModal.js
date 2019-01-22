var surname = new InputPole(document.getElementById('surname'), 'input', 1, function (e) {
    let checkChar = this.controlChar(new RegExp('[а-яА-Я]'), 15);
    checkChar(e, this.transLiteration);
});
var name = new InputPole(document.getElementById('name'), 'input', 1, function (e) {
    let checkChar = this.controlChar(new RegExp('[а-яА-Я]'), 15);
    checkChar(e);
});
var middle_name = new InputPole(document.getElementById('middle_name'), 'input', function (e) {
    let checkChar = this.controlChar(new RegExp('[а-яА-Я]'), 25);
    checkChar(e);
});
var unit = new InputPole(document.getElementById('unit'), 'input', 1, function (e) {
    let checkChar = this.controlChar(new RegExp('[а-яА-Я]'), 25);
    checkChar(e);
});
var birth = new InputPole(document.getElementById('birth'), 'input', 1, function (e) {
      let checkChar = this.controlChar(new RegExp('[0-9]'), 10);
        checkChar(e);
    if ((e.target.value.length == 2 || e.target.value.length == 5) && e.keyCode != 8) {
        e.target.value = e.target.value + '.';
    }
    let setError = this.errorClass(new RegExp('^[0-9]{2}[.][0-9]{2}[.][0-9]{4}$'), 'inputError');
    setError(e);
});

//###############
var phone = new InputPole(document.getElementById('phone'), 'input', function (e) {
    let checkChar = this.controlChar(new RegExp('[0-9]'), 12);
    checkChar(e);
});

var email = new InputPole(document.getElementById('email'), 'input', 1, function (e) {
    let setError = this.errorClass(new RegExp('^[a-zA-Z0-9_]+[@][a-zA-Z]+[.][a-z]{2,3}$'), 'inputError');
    setError(e);
});
