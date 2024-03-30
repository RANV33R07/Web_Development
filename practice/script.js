var form = document.querySelector('form');
var inps = document.querySelectorAll('input[type="text"]');
var h4 = document.querySelector("h4");

form.addEventListener('submit',function(ev){
    ev.preventDefault();
    inps.forEach(function(inp){
        if (inp.value.trim() === ""){
            h4.textContent = "Please Enter the correct values";
            h4.style.color = "red";
        }
        else{
            h4.textContent = "";
            h4.style.color = "black";
        }
    })
})