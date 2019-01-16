let surname = new InputPole(document.getElementById('surname'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
let name = new InputPole(document.getElementById('name'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
let middle_name = new InputPole(document.getElementById('middle_name'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
let unit = new InputPole(document.getElementById('unit'), 'keypress', function (e) {
    console.log(e.charCode);
    if(e.charCode < 1040 || e.charCode > 1105) {
        e.preventDefault();
        return false;}
});
let birth = new InputPole(document.getElementById('birth'), 'keypress', function (e) {
    if(e.target.value.length >9 && (e.keyCode !=46 || e.keyCode !=8)) {
        e.preventDefault();
        return false;
    } else if((e.charCode < 48 || e.charCode > 57) && (e.keyCode !=46 || e.keyCode !=8)) {
        e.preventDefault(); console.log('privet1');
        return false;} else if((e.target.value.length == 2 || e.target.value.length == 5) && e.keyCode !=8) {
        e.target.value = e.target.value + '.';
        console.log('privet');
    }
});
let phone = new InputPole(document.getElementById('phone'), 'keypress', function (e) {
    console.log(e.charCode);
    if((e.charCode < 48 || e.charCode > 57) && (e.keyCode !=46 || e.keyCode !=8) || e.target.value.length >15) {
        e.preventDefault();
        return false;}
});
let email = new InputPole(document.getElementById('email'), 'change', function (e) {
    let regEx = /^[a-zA-Z0-9_]+[@][a-zA-Z]+[.][a-z]{2,3}$/;
    console.log(regEx.test(e.target.value));
    if(!regEx.test(e.target.value)) {
        this.addRemoveClass(this.elementInput, 'inputError');
    }
});
