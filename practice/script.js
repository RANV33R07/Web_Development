function createRectangle(l , b){

    let rectangle = {
        length : l,
        breadth : b,

        area : function(){
            return this.length * this.breadth;
        },
        perimeter : function(){
            return 2*(this.length + this.breadth); 
        }
    }
    return rectangle;
}
let rectangle1 = createRectangle(10,20);
console.log(rectangle1.area());