const form = document.getElementById('form');
const ingredientContainter = document.getElementById('extra-values');
const ingredientForm = document.getElementById('ingredients');
const amountForm = document.getElementById('amounts');
const image = document.getElementById('image');
const fileName = document.getElementById('file-name');

const fieldHTML =`
<div class="field-label"></div>
<div class="field-body">
<div class="field"><p class="control is-expanded">
<input class="input ingredient-field" type="text" placeholder="Ingrediente">               
</p></div>
<div class="field"><p class="control is-expanded">
<input class="input amount-field" type="text" placeholder="Cantidad"></p>
</div><div class="field"><p class="control is-expanded">
<a class="button is-primary" onclick="addIngredientField(this)">+</a>
</p></div></div>`;

const failParameter = new URLSearchParams(window.location.search).get('err');

if(failParameter == 'true') {
    alert('Los campos son incorrectos');
} else if (failParameter == 'false') {
    alert('La receta se ha creado con éxito')
}

form.onsubmit = () => {
    const arr1 = [];
    const arr2 = [];

    const ingredientFields = Array.from(document.getElementsByClassName('ingredient-field'));
    const amountFields = Array.from(document.getElementsByClassName('amount-field'));
    ingredientFields.forEach((elem) => {
        if (elem.value !== '')
            arr1.push(elem.value);
        elem.value = '';
    });
    amountFields.forEach((elem) => {
        if (elem.value !== '')
            arr2.push(elem.value);
        elem.value = '';
    });
    if (arr1.length !== arr2.length) {
        return false;
    } else {
        for(let i = 0; i < arr1.length; i++) {
            arr1[i] = [arr1[i], arr2[i]];
        }
        ingredientForm.value = JSON.stringify(arr1);  
    }
    return true;
}

const addIngredientField = (ev) => { 
    ev.style.display = 'none'
    const ingredientField = document.createElement('div');
    ingredientField.classList.add('field', 'is-horizontal')
    ingredientField.innerHTML = fieldHTML;
    ingredientContainter.appendChild(ingredientField);
}

image.addEventListener('change', (ev) => {
    if(ev.target.files[0]) {
        fileName.innerText = ev.target.files[0].name;
    }
})