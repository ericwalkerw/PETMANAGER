'use strict';

//#region HTML elements
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const BMIBtn = document.getElementById("BMI-btn");
const idInput = document.getElementById("input-id");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const nameInput = document.getElementById("input-name");
const breedInput = document.getElementById("input-breed");
const colorInput = document.getElementById("input-color-1");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const dewormedInput = document.getElementById("input-dewormed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
//#endregion
let petArr = [];
let BMI = 0;
let isOpenFullList = true;
//#region Event handlers
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    try {
    validateInput();

    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: ageInput.value,
        type: typeInput.value,
        weight: weightInput.value,
        length: lengthInput.value,
        breed: breedInput.value,
        color: colorInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        BMI: 0,
        date: new Date(),
    };

    petArr.push(data);
    CreateTableE(petArr);
    clearInput();
   } catch (error) {
    alert(error.message);
   }
});

healthyBtn.addEventListener('click',(e)=> { 
    isOpenFullList = !isOpenFullList;   
    if (isOpenFullList) {
        CreateTableE(petArr);
    }
    else {
        const HealthList = petArr.filter(value =>(value.dewormed && value.sterilized && value.vaccinated));
        CreateTableE(HealthList);
    }  
});

BMIBtn.addEventListener('click',(e)=> {
    petArr.map(value =>{
        debugger
        if(value.type == 'Dog'){
            value.BMI = ((value.weight * 703) / value.length ** 2).toFixed(2)
        }
        else if(value.type == 'Cat'){
            value.BMI = ((value.weight * 886) / value.length ** 2).toFixed(2)
        }
        else value.BMI = 0;

        return value;
    })
    CreateTableE(petArr);
});
//#endregion

//#region Functions
function clearInput(){
	idInput.value = ''
    ageInput.value = ''
    nameInput.value = ''
    weightInput.value = ''
    lengthInput.value = ''
    colorInput.color = '#000000'
    weightInput.value = ''
    lengthInput.value = ''
	typeInput.value = 'Select Type'
    breedInput.value = 'Select Breed'
	vaccinatedInput.checked = false
	dewormedInput.checked = false
    sterilizedInput.checked = false
}

function validateInput() {
    const id = idInput.value;
    const age = parseInt(ageInput.value);
    const weight = parseInt(weightInput.value);
    const length = parseInt(lengthInput.value);
    const type = typeInput.value;
    const breed = breedInput.value;

    if (!id || !age || !weight || !length || !type || !breed) {
        throw new Error("Please fill all the form");
    }

    for (const pet of petArr) {
        if (pet.id === id) {
            throw new Error("ID must be unique!");
        }
    }

    if (age < 1 || age > 15) {
        throw new Error("Age must be between 1 and 15!");
    }

    if (weight < 1 || weight > 15) {
        throw new Error("Weight must be between 1 and 15!");
    }

    if (length < 1 || length > 100) {
        throw new Error("Length must be between 1 and 100!");
    }

    if (type === "Select Type") {
        throw new Error("Please select Type!");
    }

    if (breed === "Select Breed") {
        throw new Error("Please select Breed!");
    }
    return true; 
}

function CreateTableE(datas) {
    tableBodyEl.innerHTML = '';
    datas.forEach(element => {
        CreateTable(element);
    });
}

function CreateTable(data) {
    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.age}</td>
    <td>${data.type}</td>
    <td>${data.weight} Kg</td>
    <td>${data.length} Cm</td>
    <td>${data.breed}</td>
    <td><span style = "width: 36px;height: 12px;background-color :${data.color}"></span></td>
    <td ><i class="${RenderCheck(data.vaccinated)}"></i></td>
    <td><i class="${RenderCheck(data.dewormed)}"></td>
    <td><i class="${RenderCheck(data.sterilized)}"></td>
    <td>${data.BMI}</td>
    <td>${formatDateToCustomFormat(data.date)}</td>
    <td>
        <button class="btn btn-danger" onclick="deletePet('${data.id}')">Delete</button>   
    </td>`;

    tableBodyEl.appendChild(row)
}

function formatDateToCustomFormat(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}   

function RenderCheck(bool){
    if(bool){
        return "bi bi-check-circle-fill";
    }
    return "bi bi-x-circle-fill";
}

function deletePet(idRemove){
    if (confirm('Are you sure?')) {
        petArr = petArr.filter((value) => {
            return value.id !== idRemove 
        });
        CreateTableE(petArr);
	}
}
//#endregion
