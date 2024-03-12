
window.addEventListener('load', () => {

    //call table refresh function
    refreshSupplierTable();

    //call form refreash function
    refreshSupplierForm()
})
let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/Supplier")


//create function for refreashForm area
const refreshSupplierForm = () => {
    //create empty object
    supplier = {};
    oldSupplier = null;

    supplier.items = [];


    let supplierStatusList = ajaxGetRequest('/supplierstatus/findall')
    fillDataIntoSelect(selectSupplierStatus, 'Select Supplier Status', supplierStatusList, 'name')

    //left side
    // Empstatuses = [{ id: 1, name: 'Working ' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }]
    availableItemList = ajaxGetRequest('/item/availablelist')
    fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')
    //right side
    fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')

    btnSupUpd.disabled = true;
    // btnEmpUpd.style.cursor = "not-allowed";
    $("btnEmpUpd").css("cursor", "not-allowed");
    if (userPrivilege.insert) {
        btnSupAdd.disabled = false
        $("btnSupAdd").css("cursor", "pointer");
    } else {

        btnSupAdd.disabled = true
        $("btnSupAdd").css("cursor", "not-allowed");
    }
}

//create function for refreash table record
const refreshSupplierTable = () => {
    //create array for store employee data list5

    suppliers = ajaxGetRequest('/supplier/findall')


    const displayProperty = [
        { property: 'regno', dataType: 'string' },
        { property: 'suppliername', dataType: 'string' },
        { property: 'brn', dataType: 'string' },

        { property: getSupplyItems, dataType: 'function' },
        { property: getSupplyStatus, dataType: 'function' },

    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(tableSupplier, suppliers, displayProperty, refillSupplierForm,
        deleteButtonFunction, printSupplier, true, userPrivilege)

    //disable delete button
    suppliers.forEach((element, index) => {
        if (element.supplierstatus_id.name == "Deleted") {
            if (userPrivilege.delete) {
                tableSupplier.children[1].children[index].children[6].children[1].disabled = "disabled";

            }

        }
    });

    // Initialize DataTables on the tableEmployee
    $(document).ready(function () {
        $('#tableSupplier').DataTable({
            paging: true, // Enable pagination
            searching: true, // Enable search
        });
    });



}

const getSupplyStatus = (rowOb) =>{
    if (rowOb.supplierstatus_id.name == "Active") {
        return '<p class="working-status">'+ rowOb.supplierstatus_id.name+'</p>';
    }
    if (rowOb.supplierstatus_id.name == "In-Active") {
        return '<p class="resign-status">'+ rowOb.supplierstatus_id.name+'</p>';
    }
    if (rowOb.supplierstatus_id.name == "Active") {
        return '<p class="deleted-status">'+ rowOb.supplierstatus_id.name+'</p>';
    }
}

const getSupplyItems = (ob) =>{
    return "ItemName"
}

const printSupplier = ()=>{

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
const buttonSupplierAdd = () => {
    console.log("hi supplier");
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

const refillSupplierForm = (item, index) => {
    $('#empForm').modal('show');

    // employee = employees[rowindex]; // No 'let' declaration, directly update the outer 'employee'
    supplier = JSON.parse(JSON.stringify(item));
    // employee = ajaxGetRequest("employee/byid/"+item.id)
    // employee = ajaxGetRequest("employee/byid?id"+item.id+"&name="+employee.name)
    oldSupplier = JSON.parse(JSON.stringify(item));

 
    inputSupplierName.value = supplier.suppliername;
    let supplierStatusList = ajaxGetRequest('/supplierstatus/findall')
    fillDataIntoSelect(selectSupplierStatus, 'Select Supplier Status', supplierStatusList, 'name', supplier.supplierstatus_id.name)

    //left side
    // Empstatuses = [{ id: 1, name: 'Working ' }, { id: 2, name: 'Resign' }, { id: 3, name: 'Deleted' }]
    availableItemList = ajaxGetRequest('/item/availablelistwithoutsupplier/'+supplier.id)
    fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')
    //right side
    fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')


    inputSupplierName.style.border = '1px solid green'
    selectSupplierStatus.style.border = '1px solid green'

    btnSupUpd.disabled = "";
    // btnEmpUpd.style.cursor = "not-allowed";
    $("btnSupUpd").css("cursor", "pointer");
    btnSupAdd.disabled = true;
    $("btnSupAdd").css("cursor", "not-allowed");

    let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/Supplier")
    if (userPrivilege.update) {
        btnSupUpd.disabled = "";
        $("btnSupUpd").css("cursor", "pointer");
    } else {
        btnEmpUpd.disabled = "disabled";
        $("btnSupUpd").css("cursor", "not-allowed");
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


//add selected item
const btnAddOneItem = () => {
    console.log(selectAllItem.value);
    if (selectAllItem.value == "") {
        alert("Please select item")
    } else {

        let selectedItem1 = JSON.parse(selectAllItem.value)
        supplier.items.push(selectedItem1);
        console.log(supplier.items);
        console.log(availableItemList);
        fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')
        // fillDataIntoSelectTwo(selectAllItem, "", availableItemList,'itemcode', 'itemname')
        // fillDataIntoSelect(selectedItem, "", supplier.items, 'itemname')

        let extIndex = availableItemList.map(item => item.itemname).indexOf(selectedItem1.itemname)
        if (extIndex != -1) {
            //exist index eke idan 1k remove krnna
            availableItemList.splice(extIndex, 1);
        }
        fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')
        // fillDataIntoSelect(selectAllItem, "", availableItemList,'itemname')
    }



}


function btnAddAllItem() {

    availableItemList.forEach(item => {

        supplier.items.push(item);
    });

    fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')
    availableItemList = []
    fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')

}
function removeAddOneItem() {
    if (selectedItem.value == "") {
        alert("Please select item for remove")
    } else {

        console.log(selectAllItem.value);

        let selectedRemoveItem = JSON.parse(selectedItem.value)
        availableItemList.push(selectedRemoveItem);
        console.log(selectedRemoveItem);
        fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')


        let extIndex = supplier.items.map(item => item.itemname).indexOf(selectedRemoveItem.itemname)
        if (extIndex != -1) {
            //exist index eke idan 1k remove krnna
            supplier.items.splice(extIndex, 1);
        }
        fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')
    }

}
function removeAddAllItem() {
    supplier.items.forEach(item => {

        availableItemList.push(item);
    });

    fillDataIntoSelectTwo(selectAllItem, "", availableItemList, 'itemcode', 'itemname')
    supplier.items = []
    fillDataIntoSelectTwo(selectedItem, "", supplier.items, 'itemcode', 'itemname')

}











