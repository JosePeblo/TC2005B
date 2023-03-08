const form = document.getElementById('form');
const ingredientContainter = document.getElementById('extra-values');
const ingredientForm = document.getElementById('ingredients');
const amountForm = document.getElementById('amounts');

form.onsubmit = () => {
    const arr1 = [];
    const arr2 = [];

    const ingredientFields = Array.from(document.getElementsByClassName('ingredient-field'));
    const amountFields = Array.from(document.getElementsByClassName('amount-field'));
    ingredientFields.forEach((elem) => {
        arr1.push(elem.value);
        elem.value = '';
    });
    amountFields.forEach((elem) => {
        arr2.push(elem.value);
        elem.value = '';
    });
    ingredientForm.value = JSON.stringify(arr1);
    amountForm.value =  JSON.stringify(arr2);
}

const addIngredientField = () => { 
    console.log('hola');
}