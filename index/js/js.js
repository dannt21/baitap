var students = [
    {
        name: 'Nguyen Thuy Duong',
        age: 14,
        phone: 1234567890,
        address: 'Hai Phong, VN'
    },
    {
        name: 'Nguyen Thuy Duong 2',
        age: 14,
        phone: 1234567890,
        address: 'Hai Phong, VN'
    }
]

var editMode = false;
var studentIdTmp;

// document ready
document.addEventListener('DOMContentLoaded', function() {
    renderStudents()

})

function setLocalSto() {
    var listStudent = JSON.stringify(students);
    localStorage.setItem('students', listStudent);
}



function enableEditMode() {
    editMode = true;
}

function disableEditMode() {
    editMode = false;
}

function isEditMode() {
    return editMode == true;
}

// render students
function renderStudents() {
    var html = ''
    var  getStudents = localStorage.getItem('students');
    var parseDataStudents = JSON.parse(getStudents);
    for (var i = 0; i< parseDataStudents.length; i++) {
        var student = parseDataStudents[i];
        html += '<li class="student">'
        html += '<p><span>Name:</span>' + student.name + '</p>'
        html += '<p><span>Age:</span> ' + student.age + '</p>'
        html += '<p><span>Phone:</span> ' + student.phone + '</p>'
        html += '<p><span>Addess:</span> ' + student.address + '</p>'
        html += '<i class="student-delete" onclick="onDeleteStudent(' + i + ')">X</i>'
        html += '<i class="student-edit" onclick="onEditStudent(' + i + ')">Edit</i>'
        html += '</li>'
    }

    setHTML('#students-list', html)
}

// on click to edit student button
function onEditStudent(index) {

    studentIdTmp = index;

    var student = getStudent(index)

    // fill value to inputs
    setInputValue('.student-form .name', student.name);
    setInputValue('.student-form .age', student.age);
    setInputValue('.student-form .phone', student.phone);
    setInputValue('.student-form .address', student.address);

    // enable editMode
    enableEditMode();

    setHTML('.createStudent', 'Save');
}

// get student
function getStudent(index) {
    return students[index];
}

// inner HTML to insite a element
function setHTML(selector, html) {
    var element = document.querySelector(selector);
    element.innerHTML = html;
}

// delete student
function studentDelete(index) {
    students.splice(index, 1)
    setLocalSto();
}

// get value from input
function getInputValue(selector) {
    var inputElement = document.querySelector(selector)
    return inputElement.value
}

// set value to input by selector
function setInputValue(selector, value) {
    var element = document.querySelector(selector);
    element.value = value;
}

// on click to delete student button
function onDeleteStudent(index) {
    if (confirm('Are you sure???')) {
        studentDelete(index)
        renderStudents()
    }
}

function editStudentHandle() {
    var name = getInputValue('.student-form .name')
    var age = getInputValue('.student-form .age')
    var phone = getInputValue('.student-form .phone')
    var address = getInputValue('.student-form .address')

    // edit student
    editStudent(studentIdTmp, {
        name,
        age,
        phone,
        address
    })

    // render student
    renderStudents()

    // disable editMode
    disableEditMode()

    setHTML('.createStudent', 'Create')

    studentFormReset()
}

// clear value of inputs student form
function studentFormReset() {
    setInputValue('.student-form .name', '');
    setInputValue('.student-form .age', '');
    setInputValue('.student-form .phone', '');
    setInputValue('.student-form .address', '');
}

// edit student by index
function editStudent(index, student) {
    students[index] = student;
}

// on click create student
function onClickCreateStudent() {
    if (isEditMode()) {

        editStudentHandle();

    } else {
        var name = getInputValue('.student-form .name')
        var age = getInputValue('.student-form .age')
        var phone = getInputValue('.student-form .phone')
        var address = getInputValue('.student-form .address')

        // add student
        addStudent({
            name: name,
            age: age,
            phone: phone,
            address: address
        })

        // render view
        renderStudents()

        studentFormReset();
    }
}

// add student
function addStudent(student) {
    students.push(student)
    setLocalSto();
}