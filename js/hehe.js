
// VISSTE DU at "Bird jizz" er fugletreminologi for det helhetlige inntrykket av en fugl?

function hehe1() {
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "img/icon_bird_text2.png");
    logo.setAttribute("onclick", "hehe2()")
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

    document.getElementById("infinite").style.backgroundImage = "url(img/bird.jpg";
    document.getElementById("contact").style.backgroundImage = "url(img/birds2.jpg)";

    let jizz = document.getElementsByClassName("radbird");
    for (bird of jizz) {
        bird.innerText = "BirdJizz";
    }
    document.getElementById("description-radbird").innerText = "vi aner ikke hva vi driver med";
    let dank = document.getElementsByClassName("kont");
    for (brage of dank) {
        brage.innerText = "ikke kontakt oss pls";
    }
    document.getElementById("kont-2").innerText = "heck";

    document.getElementById("some-music").innerHTML = '<source src="horse.mp3" type="audio/mpeg"></source>';
    document.getElementById("some-music").volume = 0.05;
    document.getElementById("some-music").play();
    
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
}