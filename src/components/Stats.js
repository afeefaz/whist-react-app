import React, {Component} from 'react';
import { observer, inject } from "mobx-react"
import { Container, Col  } from "react-bootstrap"

class Stats extends Component {
  constructor() {
    super()
    this.state = {
      top5 : [],
      last5Days : [],
      top5Unique : []
    }
  }

  componentDidMount = async () => {
    let top5 = await this.props.productStore.getTop5()
    let last5Days = await this.props.productStore.getLast5Days()
    let top5Unique = await this.props.productStore.getTop5Unique()

    let tempArr = []
    for (const prod of last5Days) {
      for (const key in prod) {
        tempArr.push(prod[key])
      }
    }
    this.setState({top5 : top5, last5Days : tempArr, top5Unique : top5Unique})
  }

  render = () => {
    return (
      <Container fluid className="">
        <h1 className="text-center">Stats</h1>

        <Container fluid className="d-flex justify-content-center">
            <Container className="stats d-inline-block border p-5 m-5">
              <h1 className="pb-5">Top 5</h1>
              {
                this.state.top5.map((prod) => {
                  return (
                  <Col key={prod.name}>
                  <p className="d-inline-block p-2">{prod.name} - </p>
                  <p className="d-inline-block p-2">{prod.value}</p>
                  </Col>
                )
              })
              }
            </Container>

            <Container className="stats d-inline-block border p-5 m-5 align-top">
              <h1 className="pb-5">Top 5 Unique</h1>
              {
                this.state.top5Unique.map((prod, index) => {
                  return (
                  <Col key={index}>
                  <p className="d-inline-block p-2">{prod.name} - </p>
                  <p className="d-inline-block p-2">{prod.value}</p>
                  </Col>
                )
              })
              }
            </Container>

            <Container className="stats d-inline-block border p-5 m-5 align-top">
              <h1 className="pb-5">Last 5 Days</h1>
              {
                this.state.last5Days.map((prod, index) => {
                  return (
                  <Col key={index}>
                  <p className="d-inline-block p-2">{prod.date} - </p>
                  <p className="d-inline-block p-2">{prod.total}$</p>
                  </Col>
                )
              })
              }
            </Container>

          </Container>
      </Container>
    )
  }
}

export default inject("productStore")(observer(Stats))