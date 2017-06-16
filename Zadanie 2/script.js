function Button(text) {
	this.text = text;
}

Button.prototype = {
    create: function() {
        var self = this;
        this.$element = $('<button>');
        this.$element.text(this.text);
        this.$element.click(function() {
            alert(self.text);
        });
        $('body').append(this.$element);
    }
}

var btn1 = new Button('1 Hello');
var btn2 = new Button('2 Hello');
btn1.create();
btn2.create();