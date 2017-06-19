$(document).ready //kiedy DOM rdy

$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
    return str;
    } //Podsumowując: funkcja losuje 10 elementów z tablicy znaków chars i składa je w jeden string. //


//klasa Column
function Column(name) {
    var self = this // aby nie było problemów
    this.id = randomString(); // losowy str jako id
    this.name = name;
    this.$element = createColumn();
    
    function createColumn(){
        //"fizyczne" stworzenie kolumny
        //1 etap - tworzenie elementów kolumny
        var $column = $('<div>').addClass('column'); //tworzymy element <div> o klasie <'column>
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name); //element h2 o klasie 'column-title' i wypełniamy tekstem z name. Name zostało podpisane pod this-->self (utrata kontekstu)
        var $columnCardList = $('<ul>').addClass('column-card-list');//lista w której będą kartki, wewnątrz kolumny
        var $columnDelete = $('<button>').addClass('btn-delete').text('usuń');//przycisk do usuwania kartek
        var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj nowe zadanie'); //przycisk do dodawania kartek
        //$ w nazwie zmiennej oznacza która zmienna trzyma element jq
        
        //kasowanie kolumn
        $columnDelete.click(function() {
            self.removeColumn();
        });
        //
        $columnAddCard.click(function(event){
            self.addCard(new Card(prompt("Wpisz tytuł kartki")));
                    });

//elementy kolumny we właściwej kolejności
        $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
        return $column;
        }}

//prototypy do klasy Column
//ADD CARD
//Column to nazwa funkcji z linijki 15 - tam ustaliliśmy strukturę kolumny. Wybieramy element kolumny (this.$element --> CreateColumn()
//następnie za pomocą jquery pobieramy wszystkie dzieci ul i podpinamy tutaj kartę (append). 
//card.$element - karta będzie konstuowana analogicznie do kolumny, więc karta będzie miała w sobie $element
Column.prototype = {
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function(){
        this.$element.remove();
    }
}

//Tworzenie kart
function Card(description) {
	var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard(); 
//struktura karty
    function createCard() {
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete').text('usuń');
        //usuwanie karty
        $cardDelete.click(function(){
        self.removeCard();
        });
        //dodawanie karty
        $card.append($cardDelete)
    		.append($cardDescription);
    	return $card;
    }
}

//prototyp usuwania karty
Card.prototype = {
	removeCard: function() {
		this.$element.remove();
    }
}

//obiekt board który nasłuchuje dodania kolumny. funkcja w addColumn ma za zadanie stworzenie kolumny poprzez przypięcie jej elementu do elementu tablicy. this.$element wskazuje na board.$element 
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};


//funkcja D'n'D

function initSortable() {
    $('.column-card-list').sortable({ //wybranie wszystkich list z kartami i dodajemy opcje sortowania z Jq
      connectWith: '.column-card-list', //element dzięki któremy mozemy wybrać listę do sortowania
      placeholder: 'card-placeholder' //trzyma nazwę klasy, która pojawia się podczas przesuwania
    }).disableSelection(); //wyłączenie opcji zaznaczania tekstu w przenoszonej karty
  }

$('.create-column')
  .click(function(){
	var name = prompt('Nazwa nowej kolumny');
	var column = new Column(name);
    	board.addColumn(column);
  });



// TWORZENIE KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('Opracowywane');
var doneColumn = new Column('Zrobione');

// DODAWANIE KOLUMN DO TABLICY
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('Stwórz tablicę kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.addCard(card1);
doingColumn.addCard(card2);
    
    })