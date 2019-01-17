var surname = new InputPole(document.getElementById('surname'), 'keypress', function (e) {4
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
var  name = new InputPole(document.getElementById('name'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
var  middle_name = new InputPole(document.getElementById('middle_name'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
var  unit = new InputPole(document.getElementById('unit'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
var  birth = new InputPole(document.getElementById('birth'), 'keypress', function (e) {
if((e.charCode > 48 && e.charCode < 57) || e.keyCode ==46 || e.keyCode ==8) {
    if(e.target.value.length > 9 && e.keyCode !=46 && e.keyCode !=8) {
        e.preventDefault();
        return false;
    }
 if((e.target.value.length == 2 || e.target.value.length == 5) && e.keyCode !=8) {
        e.target.value = e.target.value + '.';
        console.log('privet');
    }
} else {
    e.preventDefault();
    return false;
}
});

birth.addNewListener('change', function (e) {
    if(!/^[0-9]{2}[.][0-9]{2}[.][0-9]{4}$/.test(e.target.value)) {
        this.addRemoveClass(this.elementInput, 'inputError');
    } else {this.addRemoveClass(this.elementInput, 'inputError');}
}.bind(birth))(birth.elementInput);

var  phone = new InputPole(document.getElementById('phone'), 'keypress', function (e) {
    console.log(e.charCode);
    if((e.charCode < 48 || e.charCode > 57) && (e.keyCode !=46 || e.keyCode !=8) || e.target.value.length >15) {
        e.preventDefault();
        return false;}
});
var  email = new InputPole(document.getElementById('email'), 'keyup', function (e) {
    let regEx = /^[a-zA-Z0-9_]+[@][a-zA-Z]+[.][a-z]{2,3}$/;
    console.log(regEx.test(e.target.value));
    if(!regEx.test(e.target.value)) {
        if(this.elementInput.className != 'inputError') {this.addRemoveClass(this.elementInput, 'inputError');}

    } else {
        if(this.elementInput.className == 'inputError') {this.addRemoveClass(this.elementInput, 'inputError');}
    }
});
