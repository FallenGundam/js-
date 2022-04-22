//url = "https://shopee.tw/search?keyword=1050ti";
//url2 = "https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=1050&limit=60&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2";

var allitems = [];
//設定抓取資料的網址
//key: 關鍵字
//page: 頁數
function seturl(key, page) {
    if (key.includes(" ")) {
        key = key.replace(" ", "%20").trim();
    }
    url = "https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=" + key + "&limit=60&newest=" + page * 60 + "&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2";
    return url;
};

function pushvalue(items) {

    items.forEach(element => {
        //console.log(element);
        let data = {};
        data.title = element.item_basic.name;
        let temp = String(element.item_basic.price);
        data.price = Number(temp.substring(0, temp.length - 5));
        data.img = "https://cf.shopee.tw/file/" + element.item_basic.image;
        data.link = "https://shopee.tw/" + data.title + "-i." + element.shopid + "." + element.itemid;
        allitems.push(data);
        //console.log(data);

    });
};
function setresult(keyword, page) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.response.items)
            if (this.response.items==null || this.response.items.length == 0) {
                console.log(allitems);
                console.log("finded " + page + " pages and " + allitems.length + " items");
            }
            else {
                //console.log("page: " + page);
                //console.log(this.response.items);
                pushvalue(this.response.items);
                setresult(keyword, page + 1)
            }
        }
    };
    let url = seturl(keyword, page)

    xhttp.open("get", url, true);
    xhttp.send();
}
function load() {
    allitems=[];
    let keyword = document.getElementById("search_input").value;
    console.log("start find " + keyword + " ...");
    setresult(keyword, 0);


}