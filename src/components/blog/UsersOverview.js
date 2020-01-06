import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import moment from 'moment'
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      charData : [],
      getAllChartData : {}
     
    }
    this.canvasRef = React.createRef();
  }

 async componentDidMount() {
  var date1 = moment().subtract(7, 'days').toString()
  var getPrevDays = []
  for(var j=1; j<8;j++){
  var newDate = moment().subtract(j, 'days').toString()
  getPrevDays.push(moment(newDate).format("D"))
  }
  const startOfWeek = moment(date1).format('YYYY-MM-DD')+"T00:00:00.000+00:00";
  const endOfWeek   = moment().format('YYYY-MM-DD')+"T23:59:59.999+00:00"; 
  var startDate = moment(startOfWeek).format("x")
  var endDate =  moment(endOfWeek).format("x")
  var newArr = []
  var ebData = []
  var dgData = []
  var getData = await axios.get(`http://18.136.149.198:3071/api/meterDataSummaries?filter[where][Timestamp][between][0]=${startDate}&filter[where][Timestamp][between][1]=${endDate}`)
  getData.data.map((list,i)=>{
    if(i%2==0){
     newArr.push(list)
     ebData.push(Math.round(list.EB_DAY * 100) / 100)
     dgData.push(list.DG_DAY)
    }
  }) 
  var getAllChartData  = {
    title: "Energy",
    chartData: {
      labels: getPrevDays.reverse(),
      datasets: [
        {
          label: "Electricity",
          fill: "start",
          data: ebData,
          backgroundColor: "rgba(0,123,255,0.1)",
          borderColor: "rgba(0,123,255,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgb(0,123,255)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        },
        {
          label: "Generator",
          fill: "start",
          data: dgData,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgba(255,65,105,1)",
          pointBackgroundColor: "#ffffff",
          pointHoverBackgroundColor: "rgba(255,65,105,1)",
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        }
      ]
    }
  }
  this.setState({getAllChartData:getAllChartData})

    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.state.getAllChartData
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.state.getAllChartData.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.state.getAllChartData.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
   
  }

  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{"Energy"}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            </Col>
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}


export default UsersOverview;
