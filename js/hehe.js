function hehe1() {
    let logo = document.getElementById("logo");
    let i = 2;
    let newFunc = 'hehe' + i + '()';
    logo.setAttribute("src", "img/icon_bird_text2.png");
    logo.setAttribute("onclick", "hehe2()")
    i++;
}

function hehe2() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text.png");
    logo.setAttribute("onclick", "hehe3()")
}

function hehe3() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text2.png");
    logo.setAttribute("onclick", "hehe4()")
}

function hehe4() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text.png");
    logo.setAttribute("onclick", "hehe5()")
}

function hehe5() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text2.png");
    logo.setAttribute("onclick", "hehe6()")
}

function hehe6() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text.png");
    logo.setAttribute("onclick", "hehe7()")
}

function hehe7() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/brage.jpg");
    logo.setAttribute("onclick", "hehe8()")
}

function hehe8() {
    document.getElementById("logo").style.width = "40%";
    logo.setAttribute("onclick", "hehe9()")
}

function hehe9() {
    document.getElementById("logo").style.width = "60%";
    logo.setAttribute("onclick", "hehe10()")
}

function hehe10() {
    document.getElementById("logo").style.width = "80%";
    logo.setAttribute("onclick", "hehe11()")
}

function hehe11() {
    document.getElementById("logo").style.width = "100%";
    // logo.setAttribute("onclick", "hehe10()")
}
