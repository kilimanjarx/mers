var markPoint_style = {
    symbol: 'pin',
    symbolSize: [100,50],
    data: [{
        type: 'max',                        
    }],                    
    label: {
        formatter: (params) => {return convertToMil(params.value)}
    }
}

let pie_chart_1 = echarts.init(document.getElementById('total-qty-by-div-pie'));
pie_chart_1.setOption({
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
    },
    series: [
        {
            name:'NCP',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            tooltip:{
                formatter: (params) => { return tooltip_formatter_1(params)}
            },
            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: zip(data['ncp-by-div'].buckets,data['ncp-by-div'].values)

        },
        {
            name:'CP',
            type:'pie',
            selectedMode: 'single',
            radius: ['40%', '50%'],
            label: {
                normal: {
                    position: 'inner'
                },                
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            tooltip:{
                formatter: (params) => { return tooltip_formatter_1(params)}
            },
            data: zip(data['cp-by-div'].buckets,data['cp-by-div'].values)

        },
        {
            name:'Total',
            type:'pie',
            radius: ['60%', '70%'],
            tooltip:{
                formatter: (params) => { return tooltip_formatter_1(params)}
            },
            label: {
                normal: {
                    formatter: (params) => {
                        let str = params.name + ': ' + convertToMil(params.value) + '\n' +params.percent + '%';
                        return str},
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
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
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: zip(data['total-qty-by-div'].buckets,data['total-qty-by-div'].values)
        }
    ]
});

let bar_chart_1 = echarts.init(document.getElementById('total-qty-by-div-bar'));
bar_chart_1.setOption(barChartOption(['CP','NCP'],data['total-qty-by-div'].buckets, 
    [
        {
            type: 'value',
            axisLabel: {
                formatter: convertToMil
            }
        },
        {
            type: 'value',
            splitLine:{
                show: false
            },
            axisLabel: {
                // formatter: (value,index) => {return value + '%'},
            }
        },
    ],[
    {
        name: 'CP',               
        type: 'bar',
        stack: 'one',
        // type: 'line',
        areaStyle: {},
        // symbol: 'circle',
        data: data['cp-by-div'].values,           
    },
    {
        name: 'NCP',               
        type: 'bar',
        stack: 'one',
        areaStyle: {},
        // symbol: 'circle',
        data: data['ncp-by-div'].values,           
    },
    {
        name: 'NCP ppm',
        yAxisIndex: 1,              
        type: 'line',
        tooltip: {
            formatter: (params) => {return params.value + '%'},
        },
        data: (divide_array(data['ncp-by-div'].values,data['cp-by-div'].values)).map(function(e,i){return Math.round(e*1000000)}) ,           
    },                    
],'Total Qty'));

let line_chart_1 = echarts.init(document.getElementById('cp-timeseries'));
line_chart_1.setOption(
    {
        calculable: true,
        title: {
            text: 'CP'
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
                saveAsImage: {title: 'Save'}
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: data['cex-cp-by-time'].buckets,
                axisLabel: {
                    rotate: 30,
                    // interval: false,
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
            axisLabel: {
                formatter: convertToMil
            }
        },],
        series: [
            {
                name: 'CEX',               
                type: 'line',
                // areaStyle: {},
                symbol: 'circle',
                data: cumulative_sum(data['cex-cp-by-time'].values),
                markPoint: markPoint_style 
            },
            {
                name: 'CEY',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['cey-cp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'RMW',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['rmw-cp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'RMV',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['rmv-cp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'Total',               
                type: 'line',
                areaStyle: {},
                yAxisIndex: 1,
                // symbol: 'circle',
                data: cumulative_sum(data['all-cp-by-time'].values),
                markPoint: markPoint_style         
            },                   
        ]        
    }
)

let line_chart_2 = echarts.init(document.getElementById('ncp-timeseries'));
line_chart_2.setOption(
    {
        calculable: true,
        title: {
            text: 'NCP'
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
                saveAsImage: {title: 'Save'}
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: data['cex-cp-by-time'].buckets,
                axisLabel: {
                    rotate: 30,
                    // interval: false,
                }
            }
        ],
        yAxis: [ {
            type: 'value',
            axisLabel: {
                formatter: convertToMil
            }
        },
        {
            type: 'value',
            axisLabel: {
                formatter: convertToMil
            }
        },],
        series: [
            {
                name: 'CEX',               
                type: 'line',
                // areaStyle: {},
                symbol: 'circle',
                data: cumulative_sum(data['cex-ncp-by-time'].values),
                markPoint: markPoint_style 
            },
            {
                name: 'CEY',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['cey-ncp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'RMW',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['rmw-ncp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'RMV',               
                type: 'line',
                // areaStyle: {},
                // symbol: 'circle',
                data: cumulative_sum(data['rmv-ncp-by-time'].values),
                markPoint: markPoint_style         
            },
            {
                name: 'All',               
                type: 'line',
                areaStyle: {},
                yAxisIndex: 1,
                tooltip: {
                    formatter: (params) => {return tooltip_formatter_1(params)}
                },
                // symbol: 'circle',
                data: cumulative_sum(data['all-ncp-by-time'].values),
                markPoint: markPoint_style         
            },                   
        ]        
    }
)

let chart_5 = echarts.init(document.getElementById('cp-by-tpn-bar'));
chart_5.setOption({
    calculable: true,
    title: {
        text: 'Top 20 CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.cp_by_tpn.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',            
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_tpn.values.cp_qty     
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_tpn.values.ncp_qty     
        },
        {
            name: 'Yield',               
            type: 'line',
            yAxisIndex: 1,
            data: (data.cp_by_tpn.values.yield).map((e,i)=> {return (e*100).toFixed(2)})
        },]
    
});

let chart_6 = echarts.init(document.getElementById('ncp-by-tpn-bar'));
chart_6.setOption({
    calculable: true,
    title: {
        text: 'Top 20 NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.ncp_by_tpn.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.ncp_by_tpn.values.cp_qty      
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.ncp_by_tpn.values.ncp_qty      
        },{
            name: 'Yield',               
            type: 'line',
            yAxisIndex: 1,
            data: (data.ncp_by_tpn.values.yield).map((e,i)=> {return (e*100).toFixed(2)})
        },
    ]
    
});

let chart_7 = echarts.init(document.getElementById('cp-by-equip-bar'));
chart_7.setOption({
    calculable: true,
    title: {
        text: 'Top 20 CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.cp_by_equip.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_equip.values.cp_qty     
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_equip.values.ncp_qty     
        },
        {
            name: 'Yield',               
            type: 'line',
            yAxisIndex: 1,
            data: (data.cp_by_equip.values.yield).map(function(e,i){return (e * 100).toFixed(2)})
        },
    ]    
});

let chart_8 = echarts.init(document.getElementById('ncp-by-equip-bar'));
chart_8.setOption({
    calculable: true,
    title: {
        text: 'Top 20 NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.ncp_by_equip.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            data: data.ncp_by_equip.values.cp_qty      
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            data: data.ncp_by_equip.values.ncp_qty      
        },
        {
            name: 'Yield',
            yAxisIndex: 1,              
            type: 'line',
            data: (data.ncp_by_equip.values.yield).map(function(e,i){return (e * 100).toFixed(2)})
        },
    ]
    
});

let chart_a = echarts.init(document.getElementById('cp-by-equip-timeseries'));
chart_a.setOption({
    calculable: true,
    title: {
        text: 'CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_equip_t.values.cp)
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
            data: data.qty_by_equip_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_equip_t.values.cp)    
});

let chart_d = echarts.init(document.getElementById('ncp-by-equip-timeseries'));
chart_d.setOption({
    calculable: true,
    title: {
        text: 'NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_equip_t.values.ncp)
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
            data: data.qty_by_equip_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_equip_t.values.ncp)    
});

let chart_b = echarts.init(document.getElementById('cp-by-worker-timeseries'));
chart_b.setOption({
    calculable: true,
    title: {
        text: 'CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_worker_t.values.cp)
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
            data: data.qty_by_equip_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_worker_t.values.cp)    
});

let chart_c = echarts.init(document.getElementById('ncp-by-worker-timeseries'));
chart_c.setOption({
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
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_worker_t.values.ncp)
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
            data: data.qty_by_equip_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_worker_t.values.ncp)    
});

let chart_9 = echarts.init(document.getElementById('cp-by-worker-bar'));
chart_9.setOption({
    calculable: true,
    title: {
        text: 'Top 20 CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.cp_by_worker.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            data: data.cp_by_worker.values.cp_qty      
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            data: data.cp_by_worker.values.ncp_qty      
        },
        {
            name: 'Yield',
            yAxisIndex: 1,              
            type: 'line',
            data: (data.cp_by_worker.values.yield).map(function(e,i){return (e * 100).toFixed(2)})    
        },
    ]
    
});

let chart_10 = echarts.init(document.getElementById('ncp-by-worker-bar'));
chart_10.setOption({
    calculable: true,
    title: {
        text: 'Top 20 NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.ncp_by_worker.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
series: [
            {
                name: 'CP',               
                type: 'bar',
                areaStyle: {},
                data: data.ncp_by_worker.values.cp_qty      
            },
            {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            data: data.ncp_by_worker.values.ncp_qty      
            },
            {
            name: 'Yield',
            yAxisIndex: 1,              
            type: 'line',
            data: (data.ncp_by_worker.values.yield).map(function(e,i){return (e * 100).toFixed(2)})
            },
        ]
});

let chart_11 = echarts.init(document.getElementById('cp-by-item-type-bar'));
chart_11.setOption({
    calculable: true,
    title: {
        text: 'Top 20 CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.cp_by_item_type.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Qty',
            axisLabel: {
                formatter: convertToMil
            },
        },
        {
            type: 'value',
            name: 'Yield',
            max: 100,
            min: 90,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: (value,index) => { return(value + '%') }
            }
        },
    ],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_item_type.values.cp_qty     
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            // symbol: 'circle',
            data: data.cp_by_item_type.values.ncp_qty     
        },
        {
            name: 'Yield',               
            type: 'line',
            yAxisIndex: 1,
            data: (data.cp_by_item_type.values.yield).map(function(e,i){return (e * 100).toFixed(2)})
        },
    ]    
});

let chart_12 = echarts.init(document.getElementById('ncp-by-item-type-bar'));
chart_12.setOption({
    calculable: true,
    title: {
        text: 'Top 20 NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['CP','NCP','Yield']
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
            data: data.ncp_by_item_type.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: [
        {
            name: 'CP',               
            type: 'bar',
            data: data.ncp_by_item_type.values.cp_qty      
        },
        {
            name: 'NCP',               
            type: 'bar',
            areaStyle: {},
            data: data.ncp_by_item_type.values.ncp_qty      
        },
        {
            name: 'Yield',
            yAxisIndex: 1,              
            type: 'line',
            data: (data.ncp_by_item_type.values.yield).map(function(e,i){return (e * 100).toFixed(2)})
        },
    ]
    
});

let chart_e = echarts.init(document.getElementById('cp-by-item-type-timeseries'));
chart_e.setOption({
    calculable: true,
    title: {
        text: 'CP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_item_type_t.values.cp)
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
            data: data.qty_by_item_type_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_item_type_t.values.cp)    
});

let chart_f = echarts.init(document.getElementById('ncp-by-item-type-timeseries'));
chart_f.setOption({
    calculable: true,
    title: {
        text: 'NCP'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        width: '50%',
        // show: false,
        data: Object.keys(data.qty_by_item_type_t.values.ncp)
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
            data: data.qty_by_item_type_t.buckets,
            axisLabel: {
                rotate: 30,
                interval: false,
                fontSize: 8
            }
        }
    ],
    yAxis: [{
                type: 'value',
                name: 'Qty',
                axisLabel: {
                    formatter: convertToMil
                },
            },
            {
                type: 'value',
                name: 'Yield',
                axisLabel: {
                    formatter: (value,index) => { return(value + '%') }
                }
            },],
    series: get_scatter(data.qty_by_item_type_t.values.ncp)    
});


function zip(a,b){
    let c = a.map(function(e,i){
        return {value:b[i], name: e}
    });
    return c
}

function divide_array(a,b){
    let c = a.map(function(e,i){
        return e/b[i]
    });
    return c
}

function tooltip_formatter_1(params){
    return params.seriesName + '<br>' + params.name + ': ' +convertToMil(params.value) + '(' + params.percent + '%' + ')'
}

function cumulative_sum(a){
    let cum_sum = [];
    a.reduce(function(a,b,i){return cum_sum[i] = a+b;},0)
    return cum_sum
}

function pieOption(_data,_title=null){
    console.log([zip(_data.buckets,_data.values)])
    let option = {
        title : {
            text: _title,
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: _data.buckets
        },
        series: [
            {
                name:'CP QTY',
                type:'pie',
                radius: ['50%', '70%'],
                // avoidLabelOverlap: false,
                label: {
                    normal: {
                        // show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        // show: false
                    }
                },
                data:zip(_data.buckets,_data.values)
            }
        ]
    };
    return option
}

function barChartOption(_legend,_buckets, _yAxis, _series, _title) {
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
            data: _legend
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
                data: _buckets,
                axisLabel: {
                    rotate: 30,
                    interval: false,
                }
            }
        ],
        yAxis: _yAxis,
        series: _series
    };
    return option;
}

function get_scatter(data){
    let key = Object.keys(data);
    let series = new Array();
    for(let i = 0; i<key.length; i++){
        series.push(
            {
                name: key[i],               
                type: 'scatter',
                areaStyle: {},
                data: data[key[i]]
            }
        )
       
    };
    return series
}




