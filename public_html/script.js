function loadDoc(doorid) {

    if (document.getElementById(doorid).getAttribute('src') == "bilder/tuer.png") {
        document.getElementById('task').style.visibility = "visible";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resultsplit = this.responseText.split('|');
                if (resultsplit[0] == "win") {
                    document.getElementById(resultsplit[1]).src = "bilder/auto.png";
                    for (var x = 0, max = 2; x <= max; x++) {
                        if (document.getElementById(x).getAttribute('src') == "bilder/tuer.png") {
                            document.getElementById(x).src = "bilder/ziege.png";
                        }
                    }
                    document.getElementById('result').innerHTML = "Glückwunsch! Sie haben das Auto gewonnen.";
                    document.getElementById('task').style.visibility = "hidden";
                    document.getElementsByClassName('button')[0].style.visibility = "visible";
                    document.getElementsByClassName('button')[1].style.visibility = "visible";
                } else if (resultsplit[0] == "lose") {
                    document.getElementById(resultsplit[1]).src = "bilder/auto.png";
                    for (var x = 0, max = 2; x <= max; x++) {
                        if (document.getElementById(x).getAttribute('src') == "bilder/tuer.png") {
                            document.getElementById(x).src = "bilder/ziege.png";
                        }
                    }
                    document.getElementById('result').innerHTML = "Leider haben Sie die Ziege erwischt und damit verloren :(";
                    document.getElementById('task').style.visibility = "hidden";
                    document.getElementsByClassName('button')[0].style.visibility = "visible";
                    document.getElementsByClassName('button')[1].style.visibility = "visible";
                } else {
                    document.getElementById(this.responseText).src = "bilder/ziege.png";
                    document.getElementById('task').innerHTML = "Eine Tür wurde offenbart! Bestätigen Sie die Tür oder wählen die andere geschlossene aus."
                }

            }
        };
        xhttp.open("POST", "ajax_server.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("id=" + doorid);
    } else {
        document.getElementById('task').innerHTML = "Die Tür ist bereits geöffnet. Bitte wähle eine andere Tür aus."
    }
}



;

function restart()


{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.reload();
        }
    };
    xhttp.open("POST", "ajax_server.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("restart=true");
}



;

function exit()


{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var resultsplit = this.responseText.split('|');
            document.getElementById('table').style.visibility = "visible";
            table.rows[1].cells[1].innerHTML = resultsplit[0];
            table.rows[1].cells[2].innerHTML = resultsplit[1];
            table.rows[2].cells[1].innerHTML = resultsplit[2];
            table.rows[2].cells[2].innerHTML = resultsplit[3];
        }
    };
    xhttp.open("POST", "ajax_server.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("exit=true");
}