import React, { useEffect } from "react";
import Chart from 'react-apexcharts'
import { useTheme } from "../../context";

const ApexChart = () => {
    const { theme } = useTheme()

    // useEffect(() => {
    //     console.log('theme chaged');
    // }, [theme])

    let options;
    let series;
    series = [{
        name: 'مقدار',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
    options = {
        chart: {
            background: `${theme === "light" ? "#fff" : "#1F2940"}`,
            style: {
                direction: 'rtl', 
            },
            toolbar: {
                show: true,
                align: "left"
            },
            zoom: {
                enabled: false
            },

        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false,
        },
        title: {
            text: 'سود‌ صرافی',
            align: 'right'
        },

        subtitle: {
            text: 'نمودار سودهای صرافی در یک ماه گذشته',
            align: 'right'
        },
        xaxis: {
            type: 'datetime',
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        },
        // fill: {
        //     type: 'gradient',
        //     colors: ['#F2C3D0', '#F2C3D0', '#F2C3D0'],
        //     gradient: {
        //         shadeIntensity: 1,
        //         opacityFrom: 0.7,
        //         shadeTo: 'dark',
        //         opacityTo: 0.9,
        //         stops: [0, 100]
        //     }
        // },
        // stroke: {
        //     show: true,
        //     curve: 'smooth',
        //     lineCap: 'butt',
        //     colors: ['#F2C3D0', '#F2C3D0', '#F2C3D0'],
        //     width: 3,
        //     dashArray: 0,
        // },

        theme: {
            mode: `${theme === "light" ? "light" : "dark"}`,
            palette: 'palette10',
            monochrome: {
                enabled: false,
                color: '#ffe3f4',
                shadeTo: `${theme === "light" ? "light" : "dark"}`,
                shadeIntensity: 0.65
            },
        }

    }

    return (
        <Chart
            options={options}
            series={series}
            type='area'
            width="100%"
            height="100%"
        />
    )
}
export default ApexChart

