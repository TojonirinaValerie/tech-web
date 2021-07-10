var menu = document.querySelectorAll(".menu");
var nbr_menu = menu.length;
var resultat = document.getElementById("resultat");

const menus = {"panel1": 1,"panel2": 2, "panel3": 3, "panel4": 4, "panel5": 5};
const couleur = {
    "Orange" : "rgb(242, 108, 79)", 
    "Jaune" : "rgb(236, 236, 75)"
};
var idActuel = 3;

init();

for (var i=0; i<nbr_menu; i++){
    addEvent(menu[i], "click", function(){
        panelActive(this);
    });
    /*
    menu[i].addEventListener("click", function(){
        panelActive(this);
    }, false);
    */
    menu[i].addEventListener("mouseover", function(){
        this.style.border = "solid 2px "+couleur['Jaune'];
        this.style.boxShadow = "3px 3px 20px "+couleur['Jaune'];
        var resul = returnScale(parseInt(getComputedStyle(this, null).zIndex), 0.05);
        mouseoverAnim(this, resul);
    }, false);
    menu[i].addEventListener("mouseout", function(){
        this.style.border = "solid 1px "+couleur['Orange'];
        this.style.boxShadow = "3px 3px 10px "+couleur['Orange'];
        this.style.transform = "scale("+returnScale(parseInt(getComputedStyle(this, null).zIndex), 0)+")";
    }, false);
}

function init(){
    for(var i=0; i<nbr_menu; i++){
        var index = parseInt(getComputedStyle(menu[i], null).zIndex);
        menu[i].style.transform = "scale("+returnScale(index)+")";
    }
}

function returnScale(posZIndex, val = 0){
    var scale;
    switch(posZIndex){
        case 1:
            scale = 0.6+val;
            break;
        case 2:
            scale = 0.7+val;
            break;
        case 3:
            scale = 0.8+val;
            break;
        case 4:
            scale = 0.9+val;
            break;
        case 5:
            scale = 1+val;
            break;
    }
    return scale;
}

function panelActive(panel){
    var idSelected = menus[panel.id];
    var moves = idActuel-idSelected;
    var regex = /^([0-9]+)px$/;
    for(var i=0; i<nbr_menu; i++){
        //Movement
        var left = getComputedStyle(menu[i], null).left;
        regex.exec(left);
        var valLeft = parseInt(RegExp.$1);
        valLeft = valLeft + moves*100;
        menu[i].style.left = valLeft+"px";
        //pour le z-index
        var posZIndex = parseInt(getComputedStyle(menu[i], null).zIndex);
        if(moves>0){
            if(i<idActuel){
                if(posZIndex+moves>5){
                    var res = (posZIndex+moves-5);
                    menu[i].style.zIndex = 5-res;
                }
                else{
                    menu[i].style.zIndex = posZIndex + moves;
                }
            }
            else{
                menu[i].style.zIndex = posZIndex - moves;
            }
        }
        else{
            if(moves<0){
                if(i<idActuel){
                    menu[i].style.zIndex = posZIndex + moves;
                }
                else{
                    if(posZIndex-moves>5){
                        var res = (posZIndex-moves-5);
                        menu[i].style.zIndex = 5-res;
                    }
                    else{
                        menu[i].style.zIndex = posZIndex - moves;
                    }   
                }
            }
        }
    }
    idActuel = idSelected;
    init();
}

function mouseoverAnim(menu, cond){
    var s = menu.style.transform;
    var regex = /^scale\(([0-9.]+)\)$/;
    regex.exec(s);
    var scale = RegExp.$1;
    var resultat = parseFloat(scale) + 0.01;
    menu.style.transform = "scale("+resultat+")";
    if(resultat<cond){
        setTimeout(mouseoverAnim(menu, cond), 1000);
    }
}

function addEvent(element,event,func){
    if(element.addEventListener){
        element.addEventListener(event,func,false);
    }else{
        element.attachEvent("on"+event,func);
    }
}