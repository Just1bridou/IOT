//BTN "automatique"
document.getElementById('container_Bar').addEventListener('click', () => {
    document.querySelector('#container_Bar div').classList.toggle('active_button_Bar')
})


// Get the button that opens the modal
let buttons = document.querySelectorAll('.container_Bouton');
for(let button of buttons) {
    button.addEventListener('click', () => {
        showModal(button.id)
    })
}

function showModal(id) {
    //nettoie
    let divModalContainer
    if (divModalContainer == 1)
        teardown(divModalContainer);

    //création fenetre modale
    divModalContainer = document.createElement('div');
    divModalContainer.className = 'modal'
    divModalContainer.id = 'ModalChange'

    let divModalContent = document.createElement('div');
    divModalContent.className = 'modal-content'

    let spanModalClose = document.createElement('span');
    spanModalClose.className = 'close'
    spanModalClose.innerHTML = "&times;"

    let textModal = document.createElement('div');
    textModal.id = 'TitreModal'
    textModal.innerHTML = dataJson[id]['nom']

    let DivColumn = document.createElement('div');
    DivColumn.className = "DivColumn"

    let InputModal = document.createElement('input');
    InputModal.className = "inputModal"
    InputModal.setAttribute("type", "number");

    let DivRow = document.createElement('div');
    DivRow.className = "DivRow"

    let BtnModalOk = document.createElement('button'); 
    BtnModalOk.className = 'BtnModal'
    BtnModalOk.id = 'BtnModalOk'
    BtnModalOk.innerHTML = "Ok"
    BtnModalOk.setAttribute('idTruc',id)

    let BtnModalAnnuler = document.createElement('button'); 
    BtnModalAnnuler.className = 'BtnModal'
    BtnModalAnnuler.id = 'BtnModalAnnuler'
    BtnModalAnnuler.innerHTML = "Annuler"

    //Insertion des éléments
    document.body.appendChild(divModalContainer)
    divModalContainer.appendChild(divModalContent)

    divModalContent.appendChild(spanModalClose)
    divModalContent.appendChild(textModal)
    divModalContent.appendChild(DivColumn)

    DivColumn.appendChild(InputModal)
    DivColumn.appendChild(DivRow)
    DivRow.appendChild(BtnModalOk)
    DivRow.appendChild(BtnModalAnnuler)

    // When the user clicks on <span> (x), close the modal
    spanModalClose.onclick = function() {
        divModalContainer.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == divModalContainer) {
            divModalContainer.style.display = "none";
        }
    }
    // clicque bouton ok et annuler
        BtnModalOk.addEventListener('click', () => {
            ExecuteModalOk(InputModal.value,id,divModalContainer)
        })
        BtnModalAnnuler.addEventListener('click', () => {
            ExecuteModalAnnuler(divModalContainer)
        })

}

//nettoie la modal au lancement pour pas qu'il n'y ai pas de reste
function teardown(divModalContainer){
    document.body.removeChild(divModalContainer)
}
function ExecuteModalAnnuler(divModalContainer){
    document.body.removeChild(divModalContainer)
}

function ExecuteModalOk(donnée,id,divModalContainer){
    let texteDetails = document.querySelector('#valeur'+id);
    texteDetails.innerHTML = donnée
    document.body.removeChild(divModalContainer)
}



const dataJson = {
        "temp": {
            "nom": "Température"
        },
        "humidite": {
            "nom": "Humidité"
        },
        "parametres": {
            "nom": "Paramètre"
        },
        "lumiere": {
            "nom": "Lumière"
        }
    }




///////////////////////////Connected
    // Changer vos paramètres
    const myOrg = "09gwpk" 
    const typeId = "pycom";
    const deviceId = "2";

    const clientId  = 'a:'+myOrg+':tvqre63x9o';

    client = new Paho.MQTT.Client(myOrg+".messaging.internetofthings.ibmcloud.com", 443, "", clientId);

    // set callback handlers
    client.onConnectionLost = function (responseObject) {
        console.log("Connection Lost: "+responseObject.errorMessage);
    }

    client.onMessageArrived = function (message) {
        let jsonData = JSON.parse(message.payloadString)
        console.log(jsonData)
        replaceHTML("#tempContainer", Math.round(jsonData["temp"]),1)
        replaceHTML("#lumiContainer", Math.round(jsonData["light"]))
        replaceHTML("#humiContainer", Math.round(jsonData["humi"]))
    }

    // Topic pour accéder aux données
    const topic = 'iot-2/type/'+typeId+'/id/'+deviceId+'/evt/data/fmt/json';
    console.log(topic);

    // Called when the connection is made
    function onConnect(){
        console.log("Connected!");
        client.subscribe(topic);
    }

    function onConnectF(){
        console.log(" not Connected!");
    }

    // Changer vos paramètres de connexion
    client.connect({
        onSuccess: onConnect,
        onFailure: onConnectF,
        userName: "a-09gwpk-udxgpqwyhj",
        password: "oRcKr4eGAMFgl+IcaK",
        useSSL: true,
    });

   function replaceHTML(arg, val) {
        document.querySelector(arg).innerHTML = val;
    }