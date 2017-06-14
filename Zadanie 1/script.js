function Phone(brand, price, color,endTime) {
	this.brand = brand; 
	this.price = price;
	this.color = color;
    this.endTime = endTime;
}

Phone.prototype.printInfo = function(){
		console.log("Marka telefonu: " + this.brand + "| kolor: " + this.color + " cena: " + this.price + '| kiedy Ci padnie: ' + this.endTime);
}


var jabłuszkofon = new Phone("Apple", 1, "trudnydouchwycenia", "już");
var smyrfon1 = new Phone("TelePolFon", 2, "pasiastoprazkowany", "jeszcze działa?");
var antekdroid = new Phone("Android", 3, "krwisty", "nigdy się nie uruchomił");

jabłuszkofon.printInfo();
smyrfon1.printInfo();
antekdroid.printInfo();
