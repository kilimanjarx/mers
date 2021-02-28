// our navigator
function loadDoc(process) {    
    let uri =
        BASE_URI +
        '/' +
        process +
        '?' +
        'aggregation=' + AGGS +
        '&interval=' + INTERVAL +
        '&period=' + PERIOD +        
        '&field=' + FIELD +
        '&item_type=' + ITEM_TYPE +
        '&factory=' + FACTORY +
        '&year_month=' + YEAR_MONTH +
        '&day=' + DAY +
        '&window=' + WINDOW + 
        '&lang=' + LANG;
    let encoded_uri = encodeURI(uri);
    window.location = encoded_uri;
}

function setPeriod(val) {
    PERIOD = val;
    YEAR_MONTH = '';
    DAY = -1;
    loadDoc(PROC_NM);
}

function setField(val) {
    FIELD = val;
    loadDoc(PROC_NM);
}

function setAggs(val) {
    AGGS = val;
    loadDoc(PROC_NM);
}

function setInterval(val) {
    INTERVAL = val;
    loadDoc(PROC_NM);
}

function setFactory(val) {
    FACTORY = val;
    loadDoc(PROC_NM);
}

function setItemType(val) {
    ITEM_TYPE = val;
    loadDoc(PROC_NM);
}

function setYearMonth(val) {
    YEAR_MONTH = val;
    PERIOD = null;
    loadDoc(PROC_NM);
}

function setDay(val) {
    DAY = val;
    PERIOD = null;
    loadDoc(PROC_NM);
}
function setWindow(val) {
    WINDOW = val;
    loadDoc(PROC_NM);
}
function setLanguage(val) {
    LANG = val;
    loadDoc(PROC_NM);
}