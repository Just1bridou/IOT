//BTN "automatique"
document.getElementById('container_Bar').addEventListener('click', () => {
    document.querySelector('#container_Bar div').classList.toggle('active_button_Bar')
})


// Get the button that opens the modal
let buttons = document.querySelectorAll('.container_Bouton');
for(let button of buttons) {
    console.log(button)
    button.addEventListener('click', () => {
        showModal(button.id)
    })
}

function showModal(id) {
    //nettoie
    let divModalContainer
    if (divModalContainer == 1)
        teardown();

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
    if (id == 'temp'){textModal.innerHTML = "Température"}
    if (id == 'humidite'){textModal.innerHTML = "Humidité"}
    if (id == 'lumiere'){textModal.innerHTML = "Lumière"}
    if (id == 'parametres'){textModal.innerHTML = "Paramètres"}

    let DivColumn = document.createElement('div');
    DivColumn.className = "DivColumn"

    let InputModal = document.createElement('input');
    InputModal.className = "inputModal"

    let DivRow = document.createElement('div');
    DivRow.className = "DivRow"

    let BtnModalOk = document.createElement('button'); 
    BtnModalOk.className = 'BtnModal'
    BtnModalOk.id = 'BtnModalOk'
    BtnModalOk.innerHTML = "Ok"

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
}

//nettoie la modal au lancement pour pas qu'il n'y ai pas de reste
function teardown(){
    document.body.removeChild(divModalContainer)
}



