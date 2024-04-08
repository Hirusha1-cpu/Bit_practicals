window.addEventListener('load', () => {

    //call table refresh function
    refreshPorderForm();
    //call form refreash function
    // refreshEmployeeForm()
})
let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/PurchaseOrder")

//create function for refreashForm area
const refreshPorderForm = () => {
    //create empty object
    porder = new Object();
    oldOrder = null

    porder.purchaseOrderHasItemList = new Array()

    supplierslist = ajaxGetRequest("/supplier/list")
    fillDataIntoSelect(selectSupplierlist, "Select Supplier", supplierslist, 'suppliername')

    selectStatuses = ajaxGetRequest("/purcahsestatus/findall")
    fillDataIntoSelect(selectPOrderStatus, "Select Status", selectStatuses, 'name', 'Requested')

    porder.porderstatus_id = JSON.parse(selectPOrderStatus.value)
    selectPOrderStatus.style.border = '1px solid green'


    inputDateRequired.value = ''
    inputTotalAmount.value = ''
    inputNote.value = ''

    //set min value
    let currentDate = new Date()
  
    let maxDate = new Date()

    let minMonth = currentDate.getMonth() +1
    if (minMonth < 10) {
        minMonth ="0" + minMonth
    }
    let minDay = currentDate.getDate()
    if (minDay < 10) {
        minDay ="0" + minDay
    }

    inputDateRequired.min = currentDate.getFullYear() + '-' + minMonth + '-'+minDay;

    maxDate.setDate(maxDate.getDate() +30)
    let maxDay = currentDate.getDate()
    if (maxDay < 10) {
        maxDay ="0" + maxDay
    }
    let maxMonth = maxDate.getMonth() +1
    if (maxMonth < 10) {
        maxMonth ="0" + maxMonth
    }


    inputDateRequired.max = maxDate.getFullYear() + '-' + maxMonth + '-'+maxDay;

    inputDateRequired.style.border = '1px solid #ced4da'
    inputTotalAmount.style.border = '1px solid #ced4da'
    inputNote.style.border = '1px solid #ced4da'


  


    //select min value and max value
    // btnPorderUpd.disabled = true;
    // btnPorderUpd.style.cursor = "not-allowed";
    // $("btnPorderUpd").css("cursor", "not-allowed");
    // if (userPrivilege.insert) {
    //     btnEmpAdd.disabled = false
    //     $("btnPorderAdd").css("cursor", "pointer");
    // } else {

    //     btnPorderAdd.disabled = true
    //     $("btnPorderAdd").css("cursor", "not-allowed");
    // }

    //call refresh inner form and table
    refreshInnerFormAndInnerTable()
}

//define funnction for InnerFormAndInnerTable
const refreshInnerFormAndInnerTable = () => {
    porderItem = new Object()
    oldPorderItem = null

    items = ajaxGetRequest("/item/availablelist")
    fillDataIntoSelect(selectItem, "Select Item", items, 'itemname')

    //set value empty     //set colur in to default
    selectItem.value = ""
    selectItem.style.border = "1px solid #ced4da"
    inputUnitPrice.value = ""
    inputUnitPrice.style.border = "1px solid #ced4da"
    inputQuantity.value = ""
    inputQuantity.style.border = "1px solid #ced4da"
    inputLinePrice.value = ""
    inputLinePrice.style.border = "1px solid #ced4da"

    let columns = [
        { property: getItemName, dataType: 'function' },
        { property: getUnitPrice, dataType: 'function' },
        { property: 'orderedqty', dataType: 'string' },
        { property: getLinePrice, dataType: 'function' },
    ]


    //need to refresh inner table
    fillDataIntoInnerTable(tablePorderItem, porder.purchaseOrderHasItemList, columns, refillInnerItemForm, deleteInnerItem)
    let totalAmount = 0.00;
    porder.purchaseOrderHasItemList.forEach(element => {
        totalAmount = parseFloat(totalAmount) + parseFloat(element.lineprice)
    });
    inputTotalAmount.value = parseFloat(totalAmount).toFixed(2);
    if (totalAmount == 0.00) {
        porder.totalAmount = null
        inputTotalAmount.style.border = '1px solid #ced4da'

    } else {
        inputTotalAmount.style.border = '1px solid green'
        porder.totalAmount = inputTotalAmount.value
    }

}



const getItemName = (ob) => {
    return ob.item_id.itemname
}
const getUnitPrice = (ob) => {
    return parseFloat(ob.purchaseprice).toFixed(2)
}
const getLinePrice = (ob) => {
    lineprice = (parseFloat(ob.purchaseprice).toFixed(2)) * (ob.orderedqty)
    return parseFloat(lineprice).toFixed(2)
}

const refillInnerItemForm = (rowOb, rowInd) => {

}
const deleteInnerItem = (rowOb, rowInd) => {
    //user confirmation
    let userConfirm = confirm("Are u sure to remove order item..?" + rowOb.item_id.itemname)
    if (userConfirm) {
        porder.purchaseOrderHasItemList.splice(rowInd, 1)
        alert("Remove succesfully..!")
        refreshInnerFormAndInnerTable()

    }
}
const generateUnitPrice = () => {
    let selectedItem = JSON.parse(selectItem.value);
    //indexOf ekath ekka check krnwa
    let extIndex = porder.purchaseOrderHasItemList.map(poitem => poitem.item_id.id).indexOf(selectItem.id)

    if (extIndex != -1) {
        alert("Item Already Exists")
        btnAddInnerItem.disabled = true
    } else {
        inputUnitPrice.value = parseFloat(selectedItem.purchaseprice).toFixed(2)
        porderItem.purchaseprice = inputUnitPrice.value
        inputUnitPrice.style.border = "1px solid green"

        btnAddInnerItem.disabled = false
    }

    // inputQuantity.value = "";
    // porderItem.orderedqty = null;
    // inputQuantity.border.style= "1px solid #ced4da"
    // inputLinePrice.value = ""
    // porderItem.lineprice = null;
    // inputLinePrice.border.style= "1px solid #ced4da"


}
const calculateLinePrice = () => {
    let qty = inputQuantity.value
    if (new RegExp("[1-9][0-9]{0,3}$").test(qty)) {
        inputLinePrice.value = (parseFloat(inputUnitPrice.value) * parseFloat(qty)).toFixed(2)
        porderItem.lineprice = inputLinePrice.value
        inputUnitPrice.style.border = '1px solid green'
    }
}

const generateUp = () => {
    let unitPrice = inputUnitPrice.value
    if (new RegExp('^[1-9][0-9]{0,7}$').test(unitPrice)) {
        inputUnitPrice.value = parseFloat(inputUnitPrice.value).toFixed(2)
        porderItem.purchaseprice = inputUnitPrice.value
        inputUnitPrice.style.border = '1px solid green'
    }

}

const checkInnerItemFormError = (rowOb, rowInd) => {
    let errors = "";
    if (porderItem.item_id == null) {
        errors = errors + "Please Select Item ...!"
    }
    if (porderItem.purchaseprice == null) {
        errors = errors + "Please Select purchaseprice ...!"
    }
    if (porderItem.orderedqty == null) {
        errors = errors + "Please Select orderedqty ...!"
    }

    return errors;
}

const buttonInnerItemAdd = (rowOb, rowInd) => {
    console.log("Add inner item...");
    //need to check errors
    let errors = checkInnerItemFormError();
    if (errors == "") {
        let userConfirm = confirm("Are u Sure to add following order item details?");
        if (userConfirm) {
            alert("Item Added Successfully")
            //add object into array
            porder.purchaseOrderHasItemList.push(porderItem)
            refreshInnerFormAndInnerTable()
        }
    } else {
        alert("Form Has Foolowing errors..." + errors)
    }
    //get user confirmation


}

const checkErrorPorder = () => {
    let errors = '';
    if (porder.supplier_id == null) {
        errors = errors + "Please select supllier";
       
    }
    return errors;
}

const buttonPorderAdd = () =>{
     // console.log("hi");
    //1.need to check form error ---> checkError()
    let formErrors = checkErrorPorder()
    if (formErrors == "") {
        // alert("no errors")
        //2.need to check user confirmation
        let userConfirm = window.confirm("Are you sure?" +
            porder.supplier_id 
        )
        if (userConfirm) {
            //3.pass data into backend
            //call ajaxRequestBodyMethod function
            let serverResponse = ajaxRequestBodyMethod("/purchase", "POST", porder);
    
            //4.check backend response
            if (serverResponse == 'OK') {
                alert("Save successfully...!" )
                // refreshEmployeeTable();
                // formEmployee.reset();
                refreshPorderForm();
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