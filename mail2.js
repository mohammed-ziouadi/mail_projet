// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWd6ESF7f8cdT07tSJHSl0kxRpLxvscOQ",
    authDomain: "mail-ffe07.firebaseapp.com",
    databaseURL: "https://mail-ffe07.firebaseio.com",
    storageBucket: "mail-ffe07.appspot.com",
    messagingSenderId: "272885305367"
  };
  firebase.initializeApp(config);


const ref=firebase.database().ref().child("messages");

ref.on('child_added', snap => {
    let tr = creerLigne(snap.val().titre,snap.val().contenu,snap.val().type)
   
    let t = document.getElementById("t");
    t.appendChild(tr);
});

ref.on('child_removed', snap => {
    let  tr= document.getElementById("#"+snap.key)
    tr.parentNode.removeChild(tr);

});


function addfirebise(evt) {

      
      let type=document.querySelector('input[name=entree]:checked').value
      let o = document.getElementById("objet");
      let m = document.getElementById("message");
    ref.push({
        titre: titre.value,
        contenu: contenu.value,
        type:type
    });

    titre.value="";
    contenu.value="";


}

// Ajouter l'événement click au bouton
let sel = document.getElementById("selectAll");


//evenement d'ajout d'une ligne
function even() {
    let o = document.getElementById("objet");
    let m = document.getElementById("message");
    
   
    let objet = o.value;
    let msg = m.value;
    let et = document.getElementsByName("entree");
    let etat;
    for ( let i = 0; i < et.length; i++) {
        if(et[i].checked)
                etat = et[i].value;
}
    let tr = creerLigne(objet,msg,etat);
    let t = document.getElementById("t");
    t.appendChild(tr);
    o.value = "";
    m.value = "";
    }

/**
 * Ajoute une ligne à la fin du tbody de la table
 */
function ajouterLigne(){
    let b = document.getElementById("b");   
    b.addEventListener("click",even);
    
}

/**
 * Crée un élément tr (ligne du tableau)
 * @param  object string : L'objet du message à extraire de la zone de texte
 * @param  message string : le message à extraire de la zone de texte
 * @param etat string : Normal ou Urgent
 * @return HTMLTableRowElement : Elément de type tr prêt à être inséré dans le tableau.
 */
function creerLigne(object, message, etat){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
   
    let c = document.createElement("input");
    let s = document.createElement("button");
    
    s.textContent = "supprimer";
    s.className = "btn btn-primary"
    
    s.addEventListener("click",e => {supprimerLigne(e.target.parentElement)})
                       
    c.type = "checkbox";
    
    td1.textContent = object;
    td2.textContent = message;
    td3.textContent = etat;
   
    tr.appendChild(c);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(s);
    return tr;
}
//la fonction de selection 
function s(){
    let tbody = document.getElementById("t");
    if(sel.checked){
        for (let i = 0; i < tbody.childNodes.length; i++) {
            if (tbody.childNodes[i].childNodes[0].checked) {
                tbody.childNodes[i].childNodes[0].checked = false;
            } else {
                tbody.childNodes[i].childNodes[0].checked = true;
            }
        }
    }
    if (!sel.checked) {
       
        
        for (let i = 0; i < tbody.childNodes.length; i++) {
            tbody.childNodes[i].childNodes[0].checked = false;
        }
    }    
}

function selection() {
    let b = [], tbody = document.getElementById("t");
    
    for (let i = 0; i < tbody.childNodes.length; i++)
        if (tbody.childNodes[i].childNodes[0].checked)
             b.push(tbody.childNodes[i]);
    return b;
    
}
sel.addEventListener("change",s);

/**
 * Supprime une ligne
 * @param tr HTMLTableRowElement : La ligne qu'on veut supprimer
 */
function supprimerLigne(tr){
    let t = document.getElementById("t"),j;
    for(let i=0;i<t.childNodes.length;i++){
        if(tr === t.childNodes[i])
            j = i;
    }
    t.deleteRow(j);
}

/**
 * Supprime toutes les lignes sélectionnées
 */
function supprimerLesLignesSelectionnees(){
    let r = selection();
    
    for(let i=0;i<r.length;i++)
        {
            supprimerLigne(r[i]);
        }
}
let sr = document.getElementById("srt");
sr.addEventListener("click",supprimerLesLignesSelectionnees);
ajouterLigne();