
var username;
function info(username , rollno){
    this.username = username;
    this.rollno =  rollno;

}
info.prototype.printMyUsername = function(){
    console.log(this.username);}
var human1 = new info("ranveer" , 19);
var human2 = new info("abhiram",1); 