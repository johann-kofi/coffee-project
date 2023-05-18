"use strict";

(function () {

    function renderCoffee(coffee) {
        let html = "";
        let fontRoastClass = `font-color-${coffee.roast}`;
        html = '<div class="coffee col-6">';
        html += `<div><span class="fs-3 ${fontRoastClass}">${coffee.name}</span>`;
        html += ' <span class="fs-5">' + coffee.roast + '</span></div>';
        html += '</div>';

        return html;
    }

    function renderCoffees(coffees) {
        let html = '';
        for (let i = coffees.length - 1; i >= 0; i--) {
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
            filteredCoffees = coffeeNames(getCoffeesByRoast(coffees, selectedRoast), searchName);
        } else {
            filteredCoffees = getCoffeesByRoast(coffeeNames(coffees, searchName), selectedRoast);
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

    function coffeeNames(filteredCoffees, searchName) {
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
        let leCoffee = {
            id: coffees.length + 1,
            name: newCoffeeName.value,
            roast: newCoffeeRoast.value
        }
        coffees.push(leCoffee)
        coffees.forEach(function (c) {
            console.log(c);
        })
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
    let nameSearch = document.querySelector("#name-search")
    let newCoffee = document.querySelector("#add-coffee");
    let newCoffeeRoast = document.querySelector("#add-coffee-roast")
    let newCoffeeName = document.querySelector("#add-coffee-name")
    tbody.innerHTML = renderCoffees(coffees);

    submitButton.addEventListener('click', updateCoffees);
    roastSelection.addEventListener("change", updateCoffees);
    nameSearch.addEventListener('input', updateCoffees);
    newCoffee.addEventListener("click", addCoffee)
    newCoffee.addEventListener("click", updateCoffees)


    /**
     *  TODO
     * testing local storage. will come back after doing other features.
     */
    if (!localStorage.getItem("coffees")) {
        setLocalStorage();
    }

    function setLocalStorage() {
        localStorage.setItem("coffees", JSON.stringify(coffees));
        getLocalStorage();
    }

    function getLocalStorage() {
        coffees = JSON.parse(localStorage.getItem("coffees"));
    }
    window.onload = function() {
        getLocalStorage();
    }

})();