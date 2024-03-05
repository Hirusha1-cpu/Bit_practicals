
// window.onload = function () {
//     console.log('Browser Onload');
//     const employeeTable = document.querySelector('#tableEmployee')
//     console.log(employeeTable);

// }

// access browser onload event

window.addEventListener('load', () => {

    //call table refresh function
    refreshEmployeeTable();

    //call form refreash function
    refreshEmployeeForm()
})
let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/EMPLOYEE")

//create function for refreash table record
const refreshEmployeeTable = () => {
    //create array for store employee data list5

    // employees = [];
    // $.ajax('/employee/findall', {
    //     async: false,
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function (data, status, ahr) {
    //         console.log("success" + status + " " + ahr);
    //         employees = data;
    //     },
    //     error: function (ahr, status, errormsg) {
    //         console.log("Fail" + errormsg + " " + status);
    //         employees = [];
    //     }
    // })
    employees = ajaxGetRequest('/employee/findall')

    // designations = [{ id: 1, name: 'Manager' }, { id: 2, name: 'Cashier' }, { id: 3, name: 'As-Manager' }]
    // designations = ajaxGetRequest('/designation/findall')

    // selectDesignation.innerHTML = '';
    // const optionMsg = document.createElement('option');
    // optionMsg.innerText = 'Select Designation';
    // optionMsg.selected = 'selected';
    // optionMsg.disabled = 'disabled';
    // selectDesignation.appendChild(optionMsg)

    // designations.forEach(element => {
    //     const option = document.createElement('option');
    //     option.innerText = element.name;
    //     option.value = JSON.stringify(element);
    //     selectDesignation.appendChild(option);
    // })
    // fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name')


    // selCivil = [{ id: 1, name: 'Married' }, { id: 2, name: 'Single' }]

    // selectStatus.innerHTML = '';
    // const optionMsg2 = document.createElement('option');
    // optionMsg2.innerText = 'Select Civil Status';
    // optionMsg2.selected = 'selected';
    // optionMsg2.disabled = 'disabled';
    // selectStatus.appendChild(optionMsg2)

    // selCivil.forEach(element => {
    //     const option = document.createElement('option');
    //     option.innerText = element.name;
    //     option.value = JSON.stringify(element);
    //     selectStatus.appendChild(option);
    // })
    // fillDataIntoSelect(selectStatus, "Select Status", selCivil, 'name')


    // Empstatuses = [{ id: 1, name: 'Working ' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }]
    // Empstatuses = ajaxGetRequest('/empstatus/findall')
    // fillDataIntoSelect(selectEStatus, "Select Emp Status", Empstatuses, 'name')
    // selectEStatus.innerHTML = ''; 
    // const optionMsg1 = document.createElement('option');
    // optionMsg1.innerText = 'Select Designation';
    // optionMsg1.selected = 'selected';
    // optionMsg1.disabled = 'disabled';
    // selectEStatus.appendChild(optionMsg1)

    // Empstatuses.forEach(element => {
    //     const option = document.createElement('option');
    //     option.innerText = element.name;
    //     option.value = JSON.stringify(element);
    //     selectEStatus.appendChild(option);
    // })
    const displayProperty = [
        { property: 'empno', dataType: 'string' },
        { property: 'fullname', dataType: 'string' },
        { property: 'nic', dataType: 'string' },
        { property: 'mobile', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        // { property: 'dob', dataType: 'string' },
        // {property:'employeeStatus_id.name',dataType:'object'},
        { property: getEmployeeStatus, dataType: 'function' },
        { property: getEmpDesign, dataType: 'function' },
        { property: getHasUserAccount, dataType: 'function' },
        // { property: "hasUserAccount", dataType: 'boolean' },

    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(tableEmployee, employees, displayProperty, refillEmployeeForm,
        deleteButtonFunction, printEmployee, true, userPrivilege)

    //disable delete button
    employees.forEach((element, index) => {
        if (element.employeestatus_id.name == "Deleted") {
            if (userPrivilege.delete) {
                tableEmployee.children[1].children[index].children[9].children[1].disabled = "disabled";

            }

        }
    });

    // Initialize DataTables on the tableEmployee
    $(document).ready(function () {
        $('#tableEmployee').DataTable({
            paging: true, // Enable pagination
            searching: true, // Enable search
        });
    });



}

const getEmployeeStatus = (rowOb) => {

    if (rowOb.employeestatus_id.name == 'Working') {

        return '<p class="working-status">' + rowOb.employeestatus_id.name + '</p>';
    }
    if (rowOb.employeestatus_id.name == 'Resign') {

        return '<p class="resign-status">' + rowOb.employeestatus_id.name + '</p>';
    }
    if (rowOb.employeestatus_id.name == 'Deleted') {

        return '<p class="deleted-status">' + rowOb.employeestatus_id.name + '</p>';
    }
}

//create function for refreashForm area
const refreshEmployeeForm = () => {
    //create empty object
    employee = {};
    oldemployee= null;
    // get data list for select element
    // designations = [
    //     { id: 1, name: "Manager" },
    //     { id: 2, name: "Cashier" },
    //     { id: 3, name: "Store-Manager" },
    // ]
    designations = ajaxGetRequest('/designation/findall')
    fillDataIntoSelect(selectDesignation, 'Select Designation', designations, 'name')

    // Empstatuses = [{ id: 1, name: 'Working ' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }]
    Empstatuses = ajaxGetRequest('/empstatus/findall')
    fillDataIntoSelect(selectEStatus, "Select Emp Status", Empstatuses, 'name')

    selCivil = [{ id: 1, name: 'Married' }, { id: 2, name: 'Single' }]
    fillDataIntoSelect(selectStatus, "Select Status", selCivil, 'name')


    //need to empty all element
    // inputNIC.value = '';
    // inputDob.value = '';
    // selectStatus.value = ''


    //set min value
    //min = current date newDate()
    //max = current date + 14 days
    // inputDob.min = '2023-09-01';
    // inputDob.max = '2023-09-30';

    //need to set default color
    inputNIC.classList.remove("is-valid");
    inputNIC.style.border = '1px solid #ced4da'
    inputDob.classList.remove("is-valid");
    inputDob.style.border = '1px solid #ced4da'

    let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/Employee")
    console.log(userPrivilege);

    btnEmpUpd.disabled = true;
    // btnEmpUpd.style.cursor = "not-allowed";
    $("btnEmpUpd").css("cursor", "not-allowed");
    if (userPrivilege.insert) {
        btnEmpAdd.disabled = false
        $("btnEmpAdd").css("cursor", "pointer");
    } else {

        btnEmpAdd.disabled = true
        $("btnEmpAdd").css("cursor", "not-allowed");
    }
}

const getEmpDesign = (rowOb) => {
    if (rowOb.designation_id.name == 'Manager') {
        return '<p class="working-status">' + rowOb.designation_id.name + '</p>';
    }
    if (rowOb.designation_id.name == 'Store-Manager') {
        return '<p class="resign-status">' + rowOb.designation_id.name + '</p>';
    }
    if (rowOb.designation_id.name == 'Cashier') {
        return '<p class="deleted-status">' + rowOb.designation_id.name + '</p>';
    }
}


const getHasUserAccount = (rowOb) => {
    console.log(rowOb);
    hasUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount")
    console.log("hasUserAccount names=======>", hasUserAccount);
    console.log("rowOb", rowOb);
    for (let element of hasUserAccount) {
        console.log(element.fullname);

        if (element.fullname === rowOb.fullname) {
            return '<p class="working-status">' + 'yes' + '</p>';
        }

    }

}

const deleteButtonFunction = (rowOb, rowindex) => {
    setTimeout(function () {

        const userConfirm = confirm('Are you sure you want to delete' + rowOb.fullname);
        if (userConfirm) {
            // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

            let serverResponse = ajaxRequestBodyMethod("/employee", "DELETE", rowOb)
            if (serverResponse == "OK") {
                alert("Delete successfully...!")
                refreshEmployeeTable();
                formEmployee.reset();
                refreshEmployeeForm();


            } else {
                alert("Delete not succefully  .." + serverResponse)
            }

            // alert('Employee delete succefully');
            // refreshEmployeeTable()

        }
    }, 500)
}

//function of generate calling name values
const generateCallingNameValues = () => {
    const callingnames = document.querySelector('#dtaList');
    callingnames.innerHTML = '';

    callingNamePartList = inputFullName1.value.split(' ');
    console.log(callingNamePartList);
    callingNamePartList.forEach(item => {
        const option = document.createElement('option');
        option.value = item;

        callingnames.appendChild(option);
    })
}

//create function for validate calling name
const txtCallingNameValidator = (feild) => {
    const callingNameValue = feild.value;
    console.log(callingNamePartList);
    let cnameExt = false;
    for (let element of callingNamePartList) {
        if (element == callingNameValue) {
            cnameExt = true;
            break;
        }
    };
    // let exInddex = callingNamePartList.map(cname => cname).indexOf(callingNameValue);


    if (cnameExt) {
        //valid
        feild.style.border = '2px solid green'
        employee.callingname = "callingNameValue"
    } else {
        //invalid
        feild.style.border = '2px solid red'
        employee.callingname = "null"
    }
}

//create function for check form error
//need to check all required property values
const checkError = () => {
    let errors = '';
    console.log(employee);
    // if (inputFullName1.value == "") 
    if (employee.fullname == null) {
        errors = errors + "Please enter a valid fullname";
        // inputFullName1.style.border = '2px solid red';
        inputFullName1.classList.add("is-invalid");
    } else {
        inputFullName1.classList.remove("is-invalid");
        inputFullName1.classList.add("is-valid");
    }
    if (employee.callingname == null) {
        errors = errors + "Please enter a valid callingnames";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }
    if (employee.nic == null) {
        errors = errors + "Please enter a valid nic";
        // inputFullName1.style.border = '2px solid red';
        inputNIC.classList.add("is-invalid");
    }
    if (employee.mobile == null) {
        errors = errors + "Please enter a valid mobile";
        // inputFullName1.style.border = '2px solid red';
        inputMobNo.classList.add("is-invalid");
    }
    if (employee.landno == null) {
        errors = errors + "Please enter a valid land";
        // inputFullName1.style.border = '2px solid red';
        inputLandNo.classList.add("is-invalid");
    }
    if (employee.email == null) {
        errors = errors + "Please enter a valid email";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }

    return errors;
}

//create function for add button
const buttonEmpAdd = () => {
    // console.log("hi");
    //1.need to check form error ---> checkError()
    let formErrors = checkError()
    if (formErrors == "") {
        // alert("no errors")
        //2.need to check user confirmation
        let userConfirm = window.confirm("Are you sure?" +
            employee.fullname +
            employee.nic +
            employee.email +
            employee.mobile +
            employee.landno +
            employee.designation_id +
            employee.civilstatus +
            employee.employeestatus_id
        )
        if (userConfirm) {
            //3.pass data into backend
            //call ajaxRequestBodyMethod function
            let serverResponse = ajaxRequestBodyMethod("/employee", "POST", employee);
            // $.ajax('/employee',{
            //     async: false,
            //     type: "POST",
            //     data:JSON.stringify(employee),
            //     contentType:'application/json',
            //     success:function(data, status, ahr){
            //         console.log("success"+status + " " + ahr);
            //         serverResponse =data;
            //     },
            //     error:function(ahr, status, errormsg){
            //         console.log("Fail"+ errormsg+" "+ status);
            //         serverResponse = errormsg;
            //     }
            // })
            //4.check backend response
            if (new RegExp('^[0-9]{8}$').test(serverResponse)) {
                alert("Save successfully...!" + serverResponse)
                refreshEmployeeTable();
                formEmployee.reset();
                refreshEmployeeForm();
                //need hide modal
                $('#empForm').modal('hide');

            } else {
                alert("Save not succefully  .." + serverResponse)
            }

        }
    } else {
        alert("formErrors: " + formErrors)
    }
}

const refillEmployeeForm = (item, index) => {
    $('#empForm').modal('show');

    // employee = employees[rowindex]; // No 'let' declaration, directly update the outer 'employee'
    employee = JSON.parse(JSON.stringify(item));
    // employee = ajaxGetRequest("employee/byid/"+item.id)
    // employee = ajaxGetRequest("employee/byid?id"+item.id+"&name="+employee.name)
    oldemployee = JSON.parse(JSON.stringify(item));

    console.log(employee);


    inputFullName1.value = employee.fullname
    inputCallingName.value = employee.callingname
    inputNIC.value = employee.nic
    inputDob.value = employee.dateofbirth
    inputMobNo.value = employee.mobile
    inputEmail.value = employee.email
    inputAddress.value = employee.address
    selectStatus.value = employee.civilstatus

    if (employee.landno != null) {
        inputLand.value = employee.landno
    } else {
        inputLand.value = ""
    }

    if (employee.gender == "Male") {
        flexRadioMale.checked = true;
    } else {
        flexRadioFemale.checked = true;

    }
    //select designation
    fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name', employee.designation_id.name)

    //select emp status
    fillDataIntoSelect(selectEStatus, "Select Status", Empstatuses, 'name', employee.employeestatus_id.name)

    btnEmpUpd.disabled = "";
    // btnEmpUpd.style.cursor = "not-allowed";
    $("btnEmpUpd").css("cursor", "pointer");
    btnEmpAdd.disabled = true;
    $("btnEmpAdd").css("cursor", "not-allowed");

    let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/Employee")
    if (userPrivilege.update) {
        btnEmpUpd.disabled = "";
        $("btnEmpUpd").css("cursor", "pointer");
    } else {
        btnEmpUpd.disabled = "disabled";
        $("btnEmpUpd").css("cursor", "not-allowed");
    }

}
//define method for check updates
const checkUpdate = () => {
    let updates = "";
    if (employee.nic != oldemployee.nic) {
        updates = updates + "NIC is changed"
    }
    if (employee.mobile != oldemployee.mobile) {
        updates = updates + "mobile is changed into" + employee.mobile
    }
    if (employee.designation_id.name != oldemployee.designation_id.name) {
        updates = updates + "designation is changed"

    }
    if (employee.employeestatus_id.name != oldemployee.employeestatus_id.name) {
        updates = updates + "Emp status is changed"

    }
    return updates;
}

//define function for employee update
const buttonEmpUpdate = () => {
    //check error
    let error = checkError();
    if (error == "") {
        //check form update
        let updates = checkUpdate();
        if (updates != "") {
            //call put service
            let userConfirmation = confirm("are u sure to update following changes...?" + updates)
            if (userConfirmation) {
                let updateServiceResponse = ajaxRequestBodyMethod("/employee", "PUT", employee)
                //check backend response
                if (updateServiceResponse == "OK") {
                    alert("Update successfully...!")
                    refreshEmployeeTable();
                    formEmployee.reset();
                    refreshEmployeeForm();
                    //need hide modal
                    $('#empForm').modal('hide');

                } else {
                    alert("Update not succefully  .." + updateServiceResponse)
                }

            }
        } else {
            alert("Form has no any changes");
        }

    } else {
        alert("Form has following errors \n" + error)
    }
}



const printEmployee = (rowindex) => {
    newwindow = window.open()

    newwindow.document.write(
        "<head>" +
        "<link rel='stylesheet' href='resourcesT/bootstrap-5.2.3/css/bootstrap.min.css'></head><body>"
        +
        tableEmployee.outerHTML +
        "</body>"
    )
    setTimeout(function () {
        newwindow.print();
    }, 1000)

}


//create function for generate age
let year; // Declare year outside the loop

const generateAge = (element) => {
    let dob = element.value;
    let currentDate = new Date();
    let dateDOB = new Date(dob);
    console.log(currentDate);
    console.log(dateDOB);

    let difTime = currentDate.getTime() - dateDOB.getTime()
    let difDate = new Date(difTime)
    console.log(difDate);

    let age = Math.abs(difDate.getFullYear() - 1970)
    console.log("Age is " + age);

    if (age > 18) {
        // textSs.required = true;
        divSample.style.display = "block"
    }
};

const generateGenderDOB = (element) => {
    let nicValue = element.value
    let year, month, date;
    let days;
    let dob;
    let gender;
    if (new RegExp('^(([0-9]{9}[VvXxSs])|([0-9]{11}))$')) {


        if (nicValue.length == 10) {
            year = "19" + nicValue.substring(0, 2)
            days = nicValue.substring(2, 5)
        }
        if (nicValue.length == 11) {
            year = nicValue.substring(0, 4)
            days = nicValue.substring(4, 7)

        }

        console.log(year);
        console.log(days);

        if (days < 500) {
            flexRadioMale.checked = true;
        } else {

            flexRadioFemale.checked = true;
            days = days - 500
        }

        console.log(days);
        let DOBDate = new Date(year + "-01-01")
        // DOBDate.setFullYear(year)
        if (year % 4 != 0) {

            DOBDate.setDate(parseInt(days) - 1)

        } else {

            DOBDate.setDate(parseInt(days))
        }


        month = DOBDate.getMonth() + 1
        if (month < 10) month = "0" + month;
        date = DOBDate.getDate();
        if (date < 10) date = "0" + date;
        dob = year + "-" + month + "-" + date;
        inputDob.value = dob

        console.log(dob);
    } else {

    }
}