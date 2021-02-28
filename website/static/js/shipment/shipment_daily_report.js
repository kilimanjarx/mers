// our navigator
var SPC = '*';
var CUSTOMER = '*';
var PERIOD = 'this week';
var TPN = '*';
var DAY = '1';
var ITEM_TYPE = '*';


loadDoc()

function openTab(event, tabName) { 
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
    switch(tabName){
        case 'overall':
            draw_shipment_vs_picking_qty('shipment_vs_picking_qty')
            break;
        case 'by_spc':
            draw_shipment_vs_picking_qty_bySpc('shipment_vs_picking_qty_bySpc_pie','shipment_vs_picking_qty_bySpc')
            break;
        case 'by_customer':
            draw_shipment_vs_picking_qty_byCustomer('shipment_vs_picking_qty_byCustomer_pie','shipment_vs_picking_qty_byCustomer')
            break;
        case 'by_final_customer':
            draw_shipment_vs_picking_qty_byFinalCustomer('shipment_vs_picking_qty_byFinalCustomer_pie','shipment_vs_picking_qty_byFinalCustomer')
            break;
        case 'by_type':
            draw_shipment_vs_picking_qty_byType('shipment_vs_picking_qty_byType_pie','shipment_vs_picking_qty_byType')
            break;
        case 'by_tpn':
            draw_shipment_vs_picking_qty_byTpn('shipment_vs_picking_qty_byTpn_pie','shipment_vs_picking_qty_byTpn')
            break;
       
    } 
}

function buttonToggle(event, className){
    var i, obj;
    obj = document.getElementsByClassName(className);
    for (i = 0; i < obj.length; i++) {
        obj[i].className = obj[i].className.replace(" teal", "");
    }
    event.currentTarget.className += " teal";
}

function loadDoc(){
    draw_shipment_vs_picking_qty('shipment_vs_picking_qty')
    draw_shipment_vs_picking_qty_bySpc('shipment_vs_picking_qty_bySpc_pie','shipment_vs_picking_qty_bySpc')
    draw_shipment_vs_picking_qty_byCustomer('shipment_vs_picking_qty_byCustomer_pie','shipment_vs_picking_qty_byCustomer')
    draw_shipment_vs_picking_qty_byFinalCustomer('shipment_vs_picking_qty_byFinalCustomer_pie','shipment_vs_picking_qty_byFinalCustomer')
    draw_shipment_vs_picking_qty_byType('shipment_vs_picking_qty_byType_pie','shipment_vs_picking_qty_byType')
    draw_shipment_vs_picking_qty_byTpn('shipment_vs_picking_qty_byTpn_pie','shipment_vs_picking_qty_byTpn')
}

function draw_shipment_vs_picking_qty(elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER;

    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        let data = res.result
        let chart = echarts.init(document.getElementById(elem));
        chart.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty','Picked %', '3PC %', 'Accumulative SI Qty','Accumulative Picked Qty', 'Accumulative 3PC Qty']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 90,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        show: false,
                    
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC Qty',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 5,
                        data: achievement(data.si_qty,data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 5,
                        data: achievement(data.picking_qty,data.three_point_check_qty,),
                    }, 
                    {
                        name: 'Accumulative SI Qty',
                        yAxisIndex: 2,               
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 5,
                        data: data.si_cum_qty
                    },
                    {
                        name: 'Accumulative Picked Qty',
                        yAxisIndex: 2,               
                        type: 'line',
                        // areaStyle:{},
                        symbol: 'circle',
                        symbolSize: 5,
                        data: data.picking_cum_qty
                    },
                    {
                        name: 'Accumulative 3PC Qty',
                        yAxisIndex: 2,               
                        type: 'line',
                        // areaStyle:{},
                        symbol: 'circle',
                        symbolSize: 5,
                        data: data.three_point_check_cum_qty
                    },             
                ]        
            }
        )
        chart.resize()
    })
    .catch((error) => {console.log(error)} )
}

function draw_shipment_vs_picking_qty_byCustomer(pie_elem,bar_elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty_byCustomer' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER + '&' +
        'order=desc';

    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        let data = res.result
        let chart_pie = echarts.init(document.getElementById(pie_elem));
        let chart_bar = echarts.init(document.getElementById(bar_elem));
        chart_pie.setOption(
            {
                title: {
                    text: 'SI Qty',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    data: data.buckets,
                    x: 'bottom',
                },
                series: [
                    {
                        name:'SPC',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['30%', '50%'],
                        tooltip:{
                            formatter: (params) => { return params.name + ': ' +convertToMil(params.value) + ' (' + params.percent + '%' + ')'}
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}{per|{d}%}  ',
                                // backgroundColor: '#eee',
                                // borderColor: '#aaa',
                                // borderWidth: 1,
                                // borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        // color: '#eee',
                                        // backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                // show: false
                            }
                        },
                        data: zip(data.buckets,data.si_qty)            
                    }
                ]
            }
        )
        chart_bar.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty', 'Picked %', '3PC %']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 0,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        formatter: (value,index) => {return value + '%'},
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.si_qty, data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.picking_qty, data.three_point_check_qty),
                    },                                 
                ]        
            }
        )
        chart_pie.resize()
        chart_bar.resize()
    })
    .catch((error) => {console.log(error)} )
}

function draw_shipment_vs_picking_qty_byFinalCustomer(pie_elem,bar_elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty_byFinalCustomer' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER + '&' +
        'order=desc';

    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        let data = res.result
        let chart_pie = echarts.init(document.getElementById(pie_elem));
        let chart_bar = echarts.init(document.getElementById(bar_elem));
        chart_pie.setOption(
            {
                title: {
                    text: 'SI Qty',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    data: data.buckets,
                    x: 'bottom',
                },
                series: [
                    {
                        name:'SPC',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['30%', '50%'],
                        tooltip:{
                            formatter: (params) => { return params.name + ': ' +convertToMil(params.value) + ' (' + params.percent + '%' + ')'}
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}{per|{d}%}  ',
                                // backgroundColor: '#eee',
                                // borderColor: '#aaa',
                                // borderWidth: 1,
                                // borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        // color: '#eee',
                                        // backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                // show: false
                            }
                        },
                        data: zip(data.buckets,data.si_qty)            
                    }
                ]
            }
        )
        chart_bar.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty', 'Picked %', '3PC %']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 60,
                            fontSize: 10,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        formatter: (value,index) => {return value + '%'},
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.si_qty, data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.picking_qty, data.three_point_check_qty),
                    },                                 
                ]        
            }
        )
        chart_pie.resize()
        chart_bar.resize()
    })
    .catch((error) => {console.log(error)} )
}

function draw_shipment_vs_picking_qty_bySpc(pie_elem,bar_elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty_bySPC' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER + '&' +
        'order=desc';

    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let chart_pie = echarts.init(document.getElementById(pie_elem));
    let chart_bar = echarts.init(document.getElementById(bar_elem));

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        chart_pie.showLoading();
        chart_bar.showLoading();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        chart_pie.hideLoading();
        chart_bar.hideLoading();
        let data = res.result        
        chart_pie.setOption(
            {
                title: {
                    text: 'SI Qty',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    data: data.buckets,
                    x: 'bottom',
                },
                series: [
                    {
                        name:'SPC',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['30%', '50%'],
                        tooltip:{
                            formatter: (params) => { return params.name + ': ' +convertToMil(params.value) + ' (' + params.percent + '%' + ')'}
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}{per|{d}%}  ',
                                // backgroundColor: '#eee',
                                // borderColor: '#aaa',
                                // borderWidth: 1,
                                // borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        // color: '#eee',
                                        // backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                // show: false
                            }
                        },
                        data: zip(data.buckets,data.si_qty)
            
                    }
                ]
            }
        )
        chart_bar.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty', 'Picked %', '3PC %']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 0,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        formatter: (value,index) => {return value + '%'},
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.si_qty, data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.picking_qty, data.three_point_check_qty),
                    },                                 
                ]        
            }
        )
        chart_pie.resize()
        chart_bar.resize()
    })
    .catch((error) => {console.log(error)} )
}

function draw_shipment_vs_picking_qty_byType(pie_elem,bar_elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty_byType1' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER + '&' +
        'order=desc';
    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        let data = res.result
        let chart_pie = echarts.init(document.getElementById(pie_elem));
        let chart_bar = echarts.init(document.getElementById(bar_elem));

        chart_pie.setOption(
            {
                title: {
                    text: 'SI Qty',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    data: data.buckets,
                    x: 'bottom',
                },
                series: [
                    {
                        name:'SPC',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['30%', '50%'],
                        tooltip:{
                            formatter: (params) => { return params.name + ': ' +convertToMil(params.value) + ' (' + params.percent + '%' + ')'}
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}{per|{d}%}  ',
                                // backgroundColor: '#eee',
                                // borderColor: '#aaa',
                                // borderWidth: 1,
                                // borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        // color: '#eee',
                                        // backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                // show: false
                            }
                        },
                        data: zip(data.buckets,data.si_qty)
            
                    }
                ]
            }
        )
        chart_bar.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty', 'Picked %', '3PC %']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 0,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        formatter: (value,index) => {return value + '%'},
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.si_qty, data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.picking_qty, data.three_point_check_qty),
                    },                                 
                ]        
            }
        )
        chart_pie.resize()
        chart_bar.resize()
    })
    .catch((error) => {console.log(error)} )
}

function draw_shipment_vs_picking_qty_byTpn(pie_elem,bar_elem){
    let uri =
        '/query/shipment/shipment_indication' +
        '?' +
        '_method=shipment_vs_picking_qty_byTpn' + '&' +
        'spc=' + SPC + '&' +
        'tpn=' + TPN + '&' +
        'item_type=' + ITEM_TYPE + '&' +
        'period=' + PERIOD + '&' +
        'customer=' + CUSTOMER + '&' +
        'order=desc';
    let encoded_uri = encodeURI(uri)
    console.log('Polling: ' + encoded_uri)

    let p1 = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () =>  resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText)
        xhr.open("GET", uri, true);
        xhr.send();
    })
    p1.then((res) => {
        console.log(res)
        let data = res.result
        let chart_pie = echarts.init(document.getElementById(pie_elem));
        let chart_bar = echarts.init(document.getElementById(bar_elem));

        chart_pie.setOption(
            {
                title: {
                    text: 'SI Qty',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    data: data.buckets,
                    x: 'bottom',
                },
                series: [
                    {
                        name:'SPC',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['30%', '50%'],
                        tooltip:{
                            formatter: (params) => { return params.name + ': ' +convertToMil(params.value) + ' (' + params.percent + '%' + ')'}
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}{per|{d}%}  ',
                                // backgroundColor: '#eee',
                                // borderColor: '#aaa',
                                // borderWidth: 1,
                                // borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        // color: '#eee',
                                        // backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                // show: false
                            }
                        },
                        data: zip(data.buckets,data.si_qty)
            
                    }
                ]
            }
        )
        chart_bar.setOption(
            {
                calculable: true,
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['SI Qty','Picked Qty', '3PC Qty', 'Picked %', '3PC %']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            readOnly: false,
                            title: 'See data',
                            lang: ['Data view','Close', 'Refresh']
                        },
                        saveAsImage: {title: 'Save'}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {onGap: false},
                        splitLine: {show: false},
                        data: data.buckets,
                        axisLabel: {
                            rotate: 0,
                        }
                    }
                ],
                yAxis: [ {
                        type: 'value',
                        axisLabel: {
                            formatter: convertToMil
                        },
                        tooltip: (params) => {return tooltip_formatter_1(params)}
                    },               
                    {
                        type: 'value',
                        formatter: (value,index) => {return value + '%'},
                        splitLine:{
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: 'SI Qty',               
                        type: 'bar',
                        data: data.si_qty,
                    },
                    {
                        name: 'Picked Qty',               
                        type: 'bar',
                        data: data.picking_qty,
                    },
                    {
                        name: '3PC',               
                        type: 'bar',
                        data: data.three_point_check_qty,
                    },
                    {
                        name: 'Picked %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.si_qty, data.picking_qty),
                    },
                    {
                        name: '3PC %',
                        yAxisIndex: 1,               
                        type: 'line',
                        symbol: 'circle',
                        data: achievement(data.picking_qty, data.three_point_check_qty),
                    },                                 
                ]        
            }
        )
        chart_pie.resize()
        chart_bar.resize()
    })
    .catch((error) => {console.log(error)} )
}

function setPeriod(event, val) {
    buttonToggle(event, 'period_filter')
    PERIOD = val;
    loadDoc();
}

function setInterval(event, val) {
    INTERVAL = val;
    loadDoc();
}

function setSPC(event,val) {
    buttonToggle(event, 'spc_filter')
    SPC = val;
    loadDoc();
}

function setItemType(event, val) {
    buttonToggle(event, 'item_type_filter')
    
    ITEM_TYPE = val;
    loadDoc();
}

function setCustomer(event, val) {
    buttonToggle(event, 'customer_filter')
    CUSTOMER = val;
    loadDoc();
}

function setTpn(val){
    if (val != ''){
        TPN = val;
    }
    else{
        TPN = '*';
    };    
    loadDoc();
}

function drawShipmentDailyReport(elem,data){
    
}

function achievement(a,b){
    return a.map((x,index) => { 
        // if(x > 0)
        // {
        //     return (b[index]/x * 100).toFixed(2);
        // }            
        // else
        // {
        //     return None
        // }
        return (b[index]/x * 100).toFixed(2);
    })
}

function useRange(event){
    buttonToggle(event, 'period_filter')
    t1 = document.getElementById(t1).value
    t2 = document.getElementById(t2).value
}
function setRange(){
    buttonToggle(event, 'period_filter')
    t1 = document.getElementById('t1').value
    t2 = document.getElementById('t2').value
    PERIOD = t1 + ',' + t2
    loadDoc()
}