"use strict";
// TODO: ADD COMMENTS TO CODE. DONT LEAVE IT ALONE

(function () {

    function renderCoffee(coffee) {
        let html = "";
        let htmlCSSClassesStr = `font-color-${coffee.roast}`;
        html = '<div class="coffee m-2 p-0 col-9 col-sm-5 coffee-card-height">';
        html += `<div><span class="ps-4 fs-3 ${htmlCSSClassesStr}">${coffee.name}</span>`;
        html += ' <span class="fs-6">' + coffee.roast + '</span></div>';
        html += '</div>';

        return html;
    }

    function renderCoffees(coffees) {
        let html = '';
        for (let i = 0; i < coffees.length; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

    function updateCoffees(e) {
        e.preventDefault();// don't submit the form, we just want to update the data
        let selectedRoast = roastSelection.value;
        let searchName = nameSearch.value;
        let filteredCoffees = [];
        if (e.type === "change") {
            filteredCoffees = getCoffeesByName(getCoffeesByRoast(coffees, selectedRoast), searchName);
        } else {
            filteredCoffees = getCoffeesByRoast(getCoffeesByName(coffees, searchName), selectedRoast);
        }
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }

    function getCoffeesByRoast(arrCoffees, roastType) {
        let newCoffees = []
        if (roastType === "All") {
            newCoffees = arrCoffees;
        } else {
            arrCoffees.forEach(function (coffee) {
                if (coffee.roast === roastType) {
                    newCoffees.push(coffee);
                }
            });
        }
        return newCoffees;
    }

    function getCoffeesByName(filteredCoffees, searchName) {
        let filteredCoffeesByName = [];
        filteredCoffees.forEach(function (coffee) {
            if (coffee.name.toLowerCase().includes(searchName.toLowerCase())) {
                filteredCoffeesByName.push(coffee)
            }
        });
        return filteredCoffeesByName
    }

    function addCoffee(e) {
        e.preventDefault();
        if(e.target.id === "add-coffee"){
            let leCoffee = {
                id: coffees.length + 1,
                name: newCoffeeName.value,
                roast: newCoffeeRoast.value
            }
            coffees.push(leCoffee);
            // TODO seperate with function.
        } else {
            let leCoffee = {
                id: coffees.length + 1,
                name: newCoffeeNameMobile.value,
                roast: newCoffeeRoastMobile.value
            }
            coffees.push(leCoffee);
        }
        setLocalStorage()
    }

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
    let coffees = [
        {id: 1, name: 'Light City', roast: 'Light'},
        {id: 2, name: 'Half City', roast: 'Light'},
        {id: 3, name: 'Cinnamon', roast: 'Light'},
        {id: 4, name: 'City', roast: 'Medium'},
        {id: 5, name: 'American', roast: 'Medium'},
        {id: 6, name: 'Breakfast', roast: 'Medium'},
        {id: 7, name: 'High', roast: 'Dark'},
        {id: 8, name: 'Continental', roast: 'Dark'},
        {id: 9, name: 'New Orleans', roast: 'Dark'},
        {id: 10, name: 'European', roast: 'Dark'},
        {id: 11, name: 'Espresso', roast: 'Dark'},
        {id: 12, name: 'Viennese', roast: 'Dark'},
        {id: 13, name: 'Italian', roast: 'Dark'},
        {id: 14, name: 'French', roast: 'Dark'},
    ];

    let tbody = document.querySelector('#coffees');
    let submitButton = document.querySelector('#submit');
    let roastSelection = document.querySelector('#roast-selection');
    let nameSearch = document.querySelector("#name-search");
    let newCoffee = document.querySelector("#add-coffee");
    let newCoffeeRoast = document.querySelector("#add-coffee-roast");
    let newCoffeeName = document.querySelector("#add-coffee-name");
    let newCoffeeMobile = document.querySelector("#add-coffee-mobile");
    let newCoffeeRoastMobile = document.querySelector("#add-coffee-roast-mobile");
    let newCoffeeNameMobile = document.querySelector("#add-coffee-name-mobile");

    submitButton.addEventListener('click', updateCoffees);
    roastSelection.addEventListener("change", updateCoffees);
    nameSearch.addEventListener('input', updateCoffees);
    newCoffee.addEventListener("click", addCoffee)
    newCoffee.addEventListener("click", updateCoffees)
    newCoffeeMobile.addEventListener("click", addCoffee)
    newCoffeeMobile.addEventListener("click", updateCoffees)


    /**
     *  TODO
     * testing local storage. will come back after doing other features.
     */
    if (!localStorage.getItem("coffees")) {
        setLocalStorage();
    } else {
        getLocalStorage();
        tbody.innerHTML = renderCoffees(coffees);
    }

    function setLocalStorage() {
        localStorage.setItem("coffees", JSON.stringify(coffees));
        getLocalStorage();
    }

    function getLocalStorage() {
        coffees = JSON.parse(localStorage.getItem("coffees"));
    }

})();