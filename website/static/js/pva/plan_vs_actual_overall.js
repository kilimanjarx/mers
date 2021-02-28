let chart_0 = echarts.init(document.getElementById('process_achievement_chart'));
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
            type: 'bar',
            data: (data.pva.cex.query.values.sum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'CEY',
            type: 'bar',
            data: (data.pva.cey.query.values.sum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMW',
            type: 'bar',
            data: (data.pva.rmw.query.values.sum.achievement).map(function(e,i){return e.toFixed(1)})           
        },
        {
            name: 'RMV',
            type: 'bar',
            data: (data.pva.rmv.query.values.sum.achievement).map(function(e,i){return e.toFixed(1)})            
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
    ]
});