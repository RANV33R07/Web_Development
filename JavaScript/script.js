var obj = {
    name : function(){
        console.log(this.marks);
    },
    marks : 100,
    rollno : 19,
};
obj.name();