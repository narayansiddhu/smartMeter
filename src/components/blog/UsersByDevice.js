import React from "react";
import PropTypes from "prop-types";
import moment from 'moment'
import axios from 'axios';
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      getchartData : {}
    }

    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    var date1 = moment().subtract(7, 'days').toString()
    const startOfWeek = moment(date1).format('YYYY-MM-DD')+"T00:00:00.000+00:00";
    const endOfWeek   = moment().format('YYYY-MM-DD')+"T23:59:59.999+00:00"; 
    var startDate = moment(startOfWeek).format("x")
    var endDate =  moment(endOfWeek).format("x")
    var ebData = ""
    var dataArr = []
    var getData = await axios.get(`http://18.136.149.198:3071/api/meterDataSummaries?filter[where][Timestamp][between][0]=${startDate}&filter[where][Timestamp][between][1]=${endDate}`)
    getData.data.map((list,i)=>{
      if(i%2==0){
       var value = Math.round(list.EB_DAY * 100) / 100
       var oldValue = ebData
       if(oldValue!=""){
        ebData = parseInt(oldValue)+parseInt(value)
       }else{
        ebData = value
       }     
      }
    })
    dataArr.push(ebData)
    dataArr.push(10)
    var getchartData ={
      title: "Energy Overview",
      chartData: {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            data: dataArr,
            backgroundColor: [
              "rgba(0,123,255,0.9)",
              "rgba(0,123,255,0.5)",
            ]
          }
        ],
        labels: ["Electricity", "Generator"]
      }
    }
    this.setState({getchartData:getchartData})
    const chartConfig = {
      type: "pie",
      data: this.state.getchartData.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.state.getchartData
      }
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">Last Week</option>
                <option value="today">Today</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "Energy Overview",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
        ]
      }
    ],
    labels: ["Electricity", "Generator"]
  }
};

export default UsersByDevice;
