import React from "react";
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import moment from 'moment'
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

import './styles.css';


class Tables extends React.Component {
  state = {
    tableData: []
  }
  componentDidMount() {
    axios.get(`http://18.136.149.198:3071/api/meterDataSummaries?filter[order]=Timestamp%20DESC`)
      .then(res => {
        if (res.data.length > 0) {
          var arr = []
          res.data.map(list => {
            var obj = {}
            obj.date = moment(list.Timestamp).format('YYYY-MM-DD hh:mm')
            obj.EB = list.EB_DAY
            obj.DG = list.DG_DAY
            obj.TWM = list.TWM_DAY
            obj.GWM = list.MWM_DAY
            obj.GM = list.GM_DAY
            arr.push(obj)
          })
          this.setState({ tableData: arr })
        }
      })
  }
  render() {
    var tablesData = this.state.tableData
    const data = {
      columns: [
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'EB',
          field: 'EB',
          sort: 'asc',
          width: 270
        },
        {
          label: 'DG',
          field: 'DG',
          sort: 'asc',
          width: 200
        },
        {
          label: 'TWM',
          field: 'TWM',
          sort: 'asc',
          width: 100
        },
        {
          label: 'GWM',
          field: 'GWM',
          sort: 'asc',
          width: 150
        },
        {
          label: 'GM',
          field: 'GM',
          sort: 'asc',
          width: 100
        }
      ],
      rows: tablesData
    };
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" subtitle="SmartMeter Readings" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4 table-data">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Data</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3" >
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={data}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Tables;
