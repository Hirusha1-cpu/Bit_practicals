//browser onload event
window.addEventListener('load',()=>{
    itemFormRefresh();
})

//define function for refresh item form
const itemFormRefresh = () =>{
    item = new Object();

    itemStatuses = ajaxGetRequest("itemstatus/list");
    fillDataIntoSelect(inputFullItemName1,"select status",itemStatuses, "name", "Not-Available")
    //bind data into item object
    item.itemstatus_id = JSON.parse(selectItemStatus.value)
    //set valid color
    selectItemStatus.style.border = "2px solid green"

    brands = ajaxGetRequest("brand/list");
    fillDataIntoSelect(selectBrand,"select brand",brands, "name", "")

    categories = ajaxGetRequest("category/list");
    fillDataIntoSelect(selectCategory,"select category",categories, "name", "")

    subcategories = ajaxGetRequest("subcategory/list");
    fillDataIntoSelect(selectSubCategory,"select sub category",subcategories, "name", "")

    unittypes = ajaxGetRequest("unittype/list");
    fillDataIntoSelect(textUnitSize,"select Unit types",unittypes,"name", "")

    packagetypes = ajaxGetRequest("packagetype/list");
    fillDataIntoSelect(selectPackageType,"select packages",packagetypes, "name", "")
}

//define function for filter subcategory by category
const filterSubCategory = () =>{
    subcategoriesByCategory = ajaxGetRequest("subcategory/listbycategory?categoryid ="+JSON.parse(selectCategory.value).id);
    fillDataIntoSelect(selectSubCategory,"select sub category",subcategoriesByCategory, "name", "")

}