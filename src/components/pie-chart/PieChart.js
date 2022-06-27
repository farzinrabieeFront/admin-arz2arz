import Chart from "react-apexcharts";
import { useTheme } from "../../context";

const PieChartComp = ({ data, colors, labels }) => {
  const { theme } = useTheme()


  let options;
  options = {
    series: data,
    // labels: labels,
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "60%",
          background: "transparent"
        },
        track: {
          background : "#f0f0f0",
          background :`${theme === "light" ? "#f0f0f0" : "#141b2c"}`,
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 10,
            color: `${theme === "light" ? "#293450" : "#ffffff"}`,
            fontSize: "26px",
            show: true
          }
        }
      }
    },
    fill: {
      colors: colors,

      type: 'solid',
      pattern: {
        style: 'verticalLines',
        width: 6,
        height: 6,
        strokeWidth: 2,
      },
    },
    stroke: {
      lineCap: "round"
    },
    
  };
  return (
    <Chart
      options={options}
      series={options.series}
      type="radialBar"
      width="250px"
      height="250px"
    />
  );
};

export default PieChartComp;
