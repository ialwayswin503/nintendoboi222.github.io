function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (!getCookie("visited")) {
    alert("Hey there!, thanks for using my site! Have you heard of my new one? Well if you did not then go to http://nintendoboi2222.github.io. (please try to use that more as it will allow me to make more improvements on my sites).");
    window.open("http://nintendoboi2222.github.io");
    setCookie("visited", "true", 365);
}
