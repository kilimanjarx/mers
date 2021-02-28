let chart_0 = echarts.init(document.getElementById('achievement_chart'));
chart_0.setOption({
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
        data: ['CEX','CEY','RMW','RMV']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                readOnly: false,
                title: 'See data',
                lang: ['Data view','Close', 'Refresh']
            },
            magicType: {
                // type: ['line', 'bar'],
                // title: {
                //     line: 'Line',
                //     bar: 'Bar'
                // }
            },
            saveAsImage: {title: 'Save'}
        }
    },
    dataZoom: {
        show: true,
        realtime: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisTick: {onGap: false},
            splitLine: {show: false},
            data: data.pva.cex.query.buckets,
            nameLocation: 'center',
            axisLabel: {
                rotate: 45,
                formatter: (value,index) => {return value.toUpperCase()}
            }
        }
    ],
    yAxis: [
        {
            name: 'Achievement(%)',
            type: 'value',
            // interval: 5,
            splitLine: {
                // show: false
            },
            axisLabel: {
                formatter: (value,index) => {return value + '%'},
                // inside: true,
            }
        },
    ],
    series: [ 
        {
            name: 'CEX',
            type: 'line',
            data: (data.pva.cex.query.values.cumsum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'CEY',
            type: 'line',
            data: (data.pva.cey.query.values.cumsum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMW',
            type: 'line',
            data: (data.pva.rmw.query.values.cumsum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMV',
            type: 'line',
            data: (data.pva.rmv.query.values.cumsum.achievement).map(function(e,i){return e.toFixed(1)})            
        },
        {
            name: '',              
            type: 'line',
            data: [],               
            markLine: {
                label: {
                    formatter: '{c}%'
                },
                lineStyle:{
                    color: '#00cc00',
                    type: 'dotted',
                },
                silent: true,
                data: [{
                    yAxis: 100
                } ]
            }        
        },
        // {
        //     name: '',             
        //     type: 'line',
        //     data: [],               
        //     markLine: {
        //         label: {
        //             // show: false,
        //             formatter: '{c}%'
        //         },
        //         lineStyle:{
        //             color: '#e61405',
        //             type: 'dotted',
        //         },
        //         silent: true,
        //         data: [{
        //             yAxis: 95
        //         } ]
        //     }        
        // },                
    ]
});

let chart_1 = echarts.init(document.getElementById('diff_achievement_chart'));
chart_1.setOption({
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
        data: ['CEX','CEY','RMW','RMV']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                readOnly: false,
                title: 'See data',
                lang: ['Data view','Close', 'Refresh']
            },
            magicType: {
                // type: ['line', 'bar'],
                // title: {
                //     line: 'Line',
                //     bar: 'Bar'
                // }
            },
            saveAsImage: {title: 'Save'}
        }
    },
    dataZoom: {
        show: true,
        realtime: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisTick: {onGap: false},
            splitLine: {show: false},
            data: data.pva.cex.query.buckets,
            nameLocation: 'center',
            axisLabel: {
                rotate: 45,
                formatter: (value,index) => {return value.toUpperCase()}
            }
        }
    ],
    yAxis: [
        {
            name: 'Difference(%)',
            type: 'value',
            // interval: 5,
            splitLine: {
                // show: false
            },
            axisLabel: {
                formatter: (value,index) => {return value + '%'},
                // inside: true,
            }
        },
    ],
    series: [ 
        {
            name: 'CEX',
            type: 'line',
            data: (data.pva.cex.query.values.cumsum.diff_achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'CEY',
            type: 'line',
            data: (data.pva.cey.query.values.cumsum.diff_achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMW',
            type: 'line',
            data: (data.pva.rmw.query.values.cumsum.diff_achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMV',
            type: 'line',
            data: (data.pva.rmv.query.values.cumsum.diff_achievement).map(function(e,i){return e.toFixed(1)})            
        },
        {
            name: '',              
            type: 'line',
            data: [],               
            markLine: {
                label: {
                    formatter: '{c}%'
                },
                lineStyle:{
                    color: '#00cc00',
                    type: 'dotted',
                },
                silent: true,
                data: [{
                    yAxis: 5
                } ]
            }        
        },
        {
            name: '',
            // yAxisIndex:1,                
            type: 'line',
            data: [],               
            markLine: {
                label: {
                    // show: false,
                    formatter: '{c}%'
                },
                lineStyle:{
                    color: '#e61405',
                    type: 'dotted',
                },
                silent: true,
                data: [{
                    yAxis: -5
                } ]
            }        
        },              
    ]
});

let chart_2 = echarts.init(document.getElementById('cex'));
chart_2.setOption(processChartOption(data.pva.cex.query, 'CEX'));

let chart_3 = echarts.init(document.getElementById('cey'));
chart_3.setOption(processChartOption(data.pva.cey.query, 'CEY'));

let chart_4 = echarts.init(document.getElementById('rmw'));
chart_4.setOption(processChartOption(data.pva.rmw.query, 'RMW'));

let chart_5 = echarts.init(document.getElementById('rmv'));
chart_5.setOption(processChartOption(data.pva.rmv.query, 'RMV'));

let chart_6 = echarts.init(document.getElementById('yield'));
chart_6.setOption({
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
        data: ['CEX','CEY','RMW','RMV']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                readOnly: false,
                title: 'See data',
                lang: ['Data view','Close', 'Refresh']
            },
            magicType: {
                // type: ['line', 'bar'],
                // title: {
                //     line: 'Line',
                //     bar: 'Bar'
                // }
            },
            saveAsImage: {title: 'Save'}
        }
    },
    dataZoom: {
        show: true,
        realtime: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            axisTick: {onGap: false},
            splitLine: {show: false},
            data: data.pva.cex.query.buckets,
            nameLocation: 'center',
            axisLabel: {
                rotate: 45,
                formatter: (value,index) => {return value.toUpperCase()}
            }
        }
    ],
    yAxis: [
        {
            name: 'Yield(%)',
            type: 'value',
            interval: 2.5,
            min: 90,
            splitLine: {
                // show: false
            },
            axisLabel: {
                formatter: (value,index) => {return value + '%'},
                // inside: true,
            }
        },
    ],
    series: [ 
        {
            name: 'CEX',
            type: 'line',
            data: (data.pva.cex.query.values.cumsum.yield).map(function(e,i){return (e * 100).toFixed(2)})           
        },
        {
            name: 'CEY',
            type: 'line',
            data: (data.pva.cey.query.values.cumsum.yield).map(function(e,i){return (e * 100).toFixed(2)})           
        },
        {
            name: 'RMW',
            type: 'line',
            data: (data.pva.rmw.query.values.cumsum.yield).map(function(e,i){return (e * 100).toFixed(2)})           
        },
        {
            name: 'RMV',
            type: 'line',
            data: (data.pva.rmv.query.values.cumsum.yield).map(function(e,i){return (e * 100).toFixed(2)})            
        },
        {
            name: '',
            // yAxisIndex:1,                
            type: 'line',
            data: [],               
            markLine: {
                label: {
                    // show: false,
                    formatter: '{c}%'
                },
                lineStyle:{
                    color: '#e61405',
                    type: 'dotted',
                },
                silent: true,
                data: [{
                    yAxis: 95
                } ]
            }        
        },              
    ]
});


function processChartOption(_data, _title) {
    let option = {
        calculable: true,
        title: {
            text: _title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Plan','Actual', 'Difference(%)']
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
        dataZoom: {
            show: true,
            realtime: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: _data.buckets,
                nameLocation: 'center',
                axisLabel: {
                    rotate: 45,
                    formatter: (value,index) => {return value.toUpperCase()}
                }
            }
        ],
        yAxis: [
            {
                name: 'Cumulative Qty',
                type: 'value',
                // interval: 5,
                splitLine: {
                    // show: false
                },
                axisLabel: {
                    formatter: convertToMil,
                    // inside: true,
                }
            },
            {
                name: 'Difference(%)',
                type: 'value',
                max: 10,
                min: -10,
                splitLine: {
                    // show: false
                },
                axisLabel: {
                    formatter: (value,index) => {return value + '%'},
                    // inside: true,
                }
            },
        ],
        series: [ 
            {
                name: 'Plan',
                type: 'line',
                areaStyle: {},
                data: (_data.values.cumsum.plan_qty).map(function(e,i){return e.toFixed(1)})           
            },
            {
                name: 'Actual',
                type: 'line',
                areaStyle: {},
                markPoint: {
                    symbol: 'pin',
                    symbolSize: [100,50],
                    data: [{
                        type: 'max',                        
                    }],                    
                    label: {
                        formatter: (params) => {return convertToMil(params.value)}
                    }
                },
                data: (_data.values.cumsum.cp_qty).map(function(e,i){return e.toFixed(1)})           
            },
            {
                name: 'Difference(%)',
                type: 'line',
                yAxisIndex: 1,
                data: (_data.values.cumsum.diff_achievement).map(function(e,i){return e.toFixed(1)})           
            },
            {
                name: 'Actual Sparkline',
                type: 'bar',
                // yAxisIndex: 1,
                data: (_data.values.sum.cp_qty).map(function(e,i){return e.toFixed(1)})           
            },
            {
                name: '',              
                type: 'line',
                data: [],               
                markLine: {
                    label: {
                        position: 'middle',
                        formatter: (params) => {return 'Target Qty: ' + convertToMil(params.value)}
                    },
                    lineStyle:{
                        color: '#00F',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: _data.values.now.plan_qty
                    } ]
                }        
            },
            {
                name: '',              
                type: 'line',
                data: [],
                yAxisIndex: 1,               
                markLine: {
                    label: {
                        // show: false,
                        position: 'middle',
                        formatter: (params) => {return 'Diff: ' + params.value + '%'}
                    },
                    lineStyle:{
                        color: '#F00',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: 5,
                    },{
                        yAxis: 0,
                    },{
                        yAxis: -5,
                    } ]
                }        
            },              
        ]
    };
    return option;
}

function diffAchievementOption(_title) {
    let option = {
        calculable: true,
        title: {
            text: _title.toUpperCase()
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['CEX', 'CEY', 'RMW',  'RMV']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    readOnly: false,
                    title: 'See data',
                    lang: ['Data view','Close', 'Refresh']
                },
                magicType: {
                    // type: ['line', 'bar'],
                    // title: {
                    //     line: 'Line',
                    //     bar: 'Bar'
                    // }
                },
                saveAsImage: {title: 'Save'}
            }
        },
        dataZoom: {
            show: true,
            realtime: true
            //start: 0,
            //end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: cex.buckets
            }
        ],
        yAxis: [
            {
                type: 'value',
                minInterval: 5,
                axisLabel: {
                    formatter: (value,index) => {return value + '%'}
                }
            },
        ],
        series: [
            {
                name: 'CEX',
                // type: 'bar',
                type: 'line',
                // areaStyle: {},
                symbol: 'circle',
                data: cex.values.diff_achievement_cumsum,           
            },
            {
                name: 'CEY',                
                // type: 'bar',
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cey.values.diff_achievement_cumsum,        
            },
            {
                name: 'RMW',
                type: 'line',             
                symbol: 'square',
                symbolSize: 8,
                data: rmw.values.diff_achievement_cumsum,      
            },            
            {
                name: 'RMV',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                data: rmv.values.diff_achievement_cumsum,
                markLine: {
                    label: {
                        show: false,
                        formatter: '{c}%'
                    },
                    silent: true,
                    data: [{
                        yAxis: 10
                    }, {
                        yAxis: -10
                    }]
                }              
            },
            {
                name: '',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                data: [],
                markLine: {
                    label: {
                        formatter: '{c}%'
                    },
                    lineStyle:{
                        color: '#F00',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: 10
                    }, {
                        yAxis: 0
                    }, {
                        yAxis: -10
                    }]
                }              
            },         
        ]
    };
    return option;
}

function achievementByProcessOption(_title) {
    let option = {
        calculable: true,
        title: {
            text: _title.toUpperCase()
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['CEX Diff', 'CEY Diff', 'RMW Diff',  'RMV Diff','CEX(%)', 'CEY(%)', 'RMW(%)',  'RMV(%)']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    readOnly: false,
                    title: 'See data',
                    lang: ['Data view','Close', 'Refresh']
                },
                magicType: {
                    // type: ['line', 'bar'],
                    // title: {
                    //     line: 'Line',
                    //     bar: 'Bar'
                    // }
                },
                saveAsImage: {title: 'Save'}
            }
        },
        dataZoom: {
            show: true,
            realtime: true
            //start: 0,
            //end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: process_list,
                nameLocation: 'center',
                axisLabel: {
                    rotate: 45,
                    formatter: (value,index) => {return value.toUpperCase()}
                }
            }
        ],
        yAxis: [
            {
                name: 'Achievement(%)',
                type: 'value',
                // interval: 10,
                splitLine: {
                    // show: false
                },
                min: 0,
                axisLabel: {
                    formatter: (value,index) => {return value + '%'},
                    // inside: true,
                }
            },
        ],
        series: [ 
            {
                name: 'CEX(%)',
                type: 'bar',
                data: cex.values.actual_achievement,               
                
            },
            {
                name: 'CEY(%)',
                type: 'bar',
                data: cey.values.actual_achievement,               
                
            },
            {
                name: 'RMW(%)',
                type: 'bar',
                data: rmw.values.actual_achievement,               
                
            },
            {
                name: 'RMV(%)',
                type: 'bar',
                data: rmv.values.actual_achievement,               
                
            },
            {
                name: '',
                // yAxisIndex:1,                
                type: 'line',
                data: [],               
                markLine: {
                    label: {
                        // show: false,
                        formatter: '{c}%'
                    },
                    lineStyle:{
                        color: '#0F0',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: 120
                    } ]
                }        
            },
            {
                name: '',
                // yAxisIndex:1,                
                type: 'line',
                data: [],               
                markLine: {
                    label: {
                        // show: false,
                        formatter: '{c}%'
                    },
                    lineStyle:{
                        color: '#00F',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: 100
                    } ]
                }        
            },
            {
                name: '',
                // yAxisIndex:1,                
                type: 'line',
                data: [],               
                markLine: {
                    label: {
                        // show: false,
                        formatter: '{c}%'
                    },
                    lineStyle:{
                        color: '#F00',
                        type: 'dotted',
                    },
                    silent: true,
                    data: [{
                        yAxis: 80
                    },{
                        yAxis: 50
                    }, ]
                }        
            },                
        ]
    };
    return option;
}

function convertToMil(value, index) {
    if (value >= 1000000000){
        value = value / 1000000000;
        value = value.toFixed(2) + 'Bil';
    }
    else if (value >= 1000000) {
        value = value / 1000000;
        value = value.toFixed(2) + 'Mil';
    }
    else if(value >= 1000){
        value = value / 1000;
        value = value.toFixed(2) + 'K';
    }
    return value;
}