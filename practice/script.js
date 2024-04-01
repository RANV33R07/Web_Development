// Query selectors for details and buttons
var details = document.querySelectorAll(".details");
var buttons = document.querySelectorAll(".btn");
var minusicon = '<i class="ri-subtract-line"></i>';
var plusicon = '<i class="ri-add-line"></i>';

details[0].style.display = "block"
buttons[0].innerHTML += minusicon;
for (var i=1;i<buttons.length;i++){
    buttons[i].innerHTML += plusicon;
}

buttons.forEach(function(eachbtn , index){
    eachbtn.addEventListener('click' , function(){
        disappearAll();
        details[index].style.display = "block";
    })
})


function disappearAll(){
    details.forEach(function(i){
        i.style.display = "none";
    })
}