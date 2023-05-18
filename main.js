"use strict"

function renderCoffee(coffee) {
    let html = "";
    if(coffee.roast === "Medium"){
        html = '<div class="coffee col-6">';
        html += '<div><span class="fs-3">' + coffee.name + '</span>';
        html += ' <span class="fs-5">' + coffee.roast + '</span></div>';
        html += '</div>';
    } else if(coffee.roast === "Light"){
        html = '<div class="coffee col-6">';
        html += '<div><span class="fs-3">' + coffee.name + '</span>';
        html += ' <span class="fs-5">' + coffee.roast + '</span></div>';
        html += '</div>';
    } else if(coffee.roast === "Dark"){
        html = '<div class="coffee col-6">';
        html += '<div><span class="fs-3">' + coffee.name + '</span>';
        html += ' <span class="fs-5">' + coffee.roast + '</span></div>';
        html += '</div>';
    }

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    if(selectedRoast === "All"){
        tbody.innerHTML = renderCoffees(coffees);
    } else {
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }
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

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
