import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import axios from 'axios';
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";


class BlogOverview extends React.Component {
  state = {
    charData: {}
  }
  componentDidMount() {
    // this.timer = setInterval(
    //   () => this.setState(prevState => ({ test: Math.random() })),
    //   1000,
    // );
    axios.get(`http://18.136.149.198:3071/api/meterDataSummaries?filter[order]=Timestamp%20DESC&filter[limit]=1`)
      .then(res => {
        this.setState({ charData: res.data[0] })
      })
  }
  componentWillUnmount() {
    // clearInterval(this.timer);
  }
  render() {
    const chartData = this.state.charData
    const smallStats = [
      {
        label: "Electricity (EB)",
        value: Math.round(chartData.EB_DAY * 100) / 100 || "0",
        percentage: "4.7%",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Generator (DG)",
        value: "182",
        percentage: "12.4",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "Tank water (TWM)",
        value: "817",
        percentage: "3.8%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: "Drinking Water (GWM)",
        value: Math.round(chartData.MWM_DAY * 100) / 100 || "0",
        percentage: "2.71%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: [1, 7, 1, 3, 1, 4, 8]
          }
        ]
      },
      {
        label: "Gas Meter (GM)",
        value: "172",
        percentage: "2.4%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      }
    ]
    const data = this.state.test
    console.log("checking the data####", data)
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Project" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

        </Row>
        <Row>
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}


        </Row>
      </Container>
    )
  }

}
export default BlogOverview;
