class TabCard {
  constructor(element) {
  // Use a jQuery selector to assign this.element to the DOM reference
    this.element = $(element);
  }
  selectCard() {
  // show the card.  Instead of using .show tring .fadeToogle.
    this.element.fadeToggle();

  }
  deselectCard() {
  // hide the card
    this.element.hide();
  }
}

class TabLink {
  constructor(element, parent) {
  // Use a jQuery selector to assign this.element to the DOM reference
    this.element = $(element);
  // assign this.parent to the parent parameter
    this.parent = parent;

  /* // Note that we are calling getCards() on Tabs (The parent of TabLink) and passing the data attribute: 
  data-tab, no need to update this line of code.*/
    this.cards = this.parent.getCards(this.element.data('tab'));

  // Using jQuery, map over the array of cards.  In your callback function, create new instances of the 
  //TabCard class that contain a card reference.TabCard(card) as an example.
    this.cards = this.cards.map((index, card) => new TabCard(card));

  // You will need to create a click handler for the TabLink element that calls selectTab()
    this.element.click(() => {
      this.selectTab();
    });

  }

  selectTab() {
    // use this.parent to call the updateActive() method and pass the `this` keyword as a parameter
    this.parent.updateActive(this);
    // using a jQuery method, add a class to this.element named "active-tab
    this.element.addClass('active-tab');
    // iterate over each card using the .each() method in jQuery. call the selectCard() method in your callback function
    this.cards.each((index, card) => card.selectCard());
  }


  deselectTab() {
    // use a jQuery method to remove the class "active-tab" from this.element
    this.element.removeClass('active-tab');
    // iterate over each card using the .each() method in jQuery. call the deselectCard() method in your callback function
    this.cards.each((index, card) => card.deselectCard());
  }


}

class Tabs {
  constructor(element) {
    this.element = $(element);

    // Using jQuery, find all of the tabs on this element.
    this.tabs = this.element.find('.tab');

    // this step will map over the array creating new TabsLink classs instances of each link.

    this.tabs = this.tabs.map((index, tab) => new TabLink(tab, this));

    // Set the initial active tab to the first tab in the list
    this.activeTab = this.tabs[0];

    this.init();
  }

  init() {
    // use activeTab to call the selectTab() method
    this.activeTab.selectTab();
  }

  updateActive(tabElement) {
    // use activeTab to call the deselectTab() method
    this.activeTab.deselectTab();
    // assign activeTab to tabElement
    this.activeTab = tabElement;
  }

  getCards(data) {
    // This method is meant to get all the cards from the HTML page.
    // If the data supplied is 'all' then all of the cards should be returned.
    // Otherwise, only cards matching the data attribute should be returned. 
    if (data === 'all') {
      return $('.card');
    } else {
      return $(`.card[data-tab=${data}]`);
    }
  }
}


// Using jQuery, select the correct tabs component. Then initialize the Tabs class.
let tabs = $('.tabs');
tabs = new Tabs(tabs);

