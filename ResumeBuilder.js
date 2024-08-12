let editFileName = document.querySelector('.editFileNameIcon');
let fileName = document.querySelector('.fileName');
let fileNameContainer = document.querySelector('.fileNameCont');
let fileNameInputContainer = document.querySelector('.inputFileNameCont');
let fileNameInput = document.querySelector('.fileNameInput');
let submitFileNameChangeBtn = document.querySelector('.submitCheck');
let personalDetailsForm = document.querySelector('.personalDetailsForm');

let fullNameInput = document.querySelector('.fullNameInput');
let jobTitleInput = document.querySelector('.jobTitleInput');
let emailInput = document.querySelector('.emailInput');
let phoneInput = document.querySelector('.phoneInput');
let addressInput = document.querySelector('.addressInput');


let personalDetails = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: ''
}
let certificates = {

}

// let { fullName, jobTitle, email, phone, address } = personalDetails;




personalDetailsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    personalDetails.fullName = fullNameInput.value
    personalDetails.jobTitle = jobTitleInput.value
    personalDetails.email = emailInput.value
    personalDetails.phone = phoneInput.value
    personalDetails.address = addressInput.value
    localStorage.setItem('personal details', JSON.stringify(personalDetails));
    // personalDetailsForm.style.display = 'none';
    let personalData = JSON.parse(localStorage.getItem('personal details'));
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("times", "bolditalic");
    doc.setFontSize(20);
    let pageWidth = doc.internal.pageSize.getWidth();
    // Calculate the width of the text
    let text = personalData.fullName;
    let textWidth = doc.getTextWidth(text);

    let xCoordinate = (pageWidth - textWidth) / 2;
    doc.text(text, xCoordinate, 20);
    doc.setFont("times", "normal");
    doc.setFontSize(18);
    let jobTitleFont = doc.getTextWidth(text);
    xCoordinate = (pageWidth - jobTitleFont) / 2;
    doc.text(personalData.jobTitle, xCoordinate, 28);
    // doc.setLineWidth(0.5);
    // doc.line(20, 25, 180, 25); 
    doc.save(`${localStorage.getItem('fileName')}.pdf`);
})
// localStorage.clear()
if (localStorage.getItem('fileName')) {
    fileName.innerHTML = localStorage.getItem('fileName')
}
editFileName.addEventListener('click', function () {
    fileNameContainer.style.display = 'none';
    fileNameInputContainer.style.display = 'block';
})
submitFileNameChangeBtn.addEventListener('click', function () {
    if (fileNameInput.value.length > 0) {
        fileNameInputContainer.style.display = 'none';
        fileNameContainer.style.display = 'flex';
        localStorage.setItem('fileName', fileNameInput.value);
        
        fileName.innerHTML = localStorage.getItem('fileName');
    }
})

