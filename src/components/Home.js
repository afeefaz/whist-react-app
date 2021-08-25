import React, {Component} from 'react';
import { observer, inject } from "mobx-react"
import { Container, Row, Dropdown, Form, Button  } from "react-bootstrap"

import Product from './Product'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      products : [],
      cartProducts : []
    }
  }

  componentDidMount = async () => {
    await this.props.productStore.getProducts()
    let tempData = await this.props.productStore.products
    this.setState({products : tempData.data})
  }
  
  handleBuy = async (obj) => {
    let tempArr = this.state.cartProducts
    tempArr.push(obj)
    this.setState({cartProducts : tempArr}, async () => {
      await this.props.productStore.addToCart(obj)
    })
  }
  
  handlePay = async () => {
    await this.props.productStore.handlePay(this.state.cartProducts)
    this.setState({cartProducts : []})
  }

  render = () => {
    let total = 0
    return (
      <Container fluid className="d-flex flex-column text-center">
          <Dropdown className="align-self-end m-3">
            <Dropdown.Toggle>Cart {this.state.cartProducts.length > 0 ? "("+this.state.cartProducts.length+")" : null}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Form className="d-flex flex-column text-center justify-content-center align-items-center">
                    {
                    this.state.cartProducts.length > 0 ?
                    this.state.cartProducts.map((prod, index) => {
                        total += prod.Price 
                        return (
                            <Form.Label className="d-block text-center" key={index}>{prod.Title} - {prod.Price}$</Form.Label>
                        )
                    }) : null
                    }
                    <Form.Label className="d-block text-center mt-5">Total - {total}$</Form.Label>
                    <Button onClick={this.handlePay}>Pay</Button>
                </Form>
            </Dropdown.Menu>
        </Dropdown>

        <h1 className='pb-5'>Products</h1>
        <Row>
          {
            this.state.products.map((prod, index) => {
              return (
              <Product product={prod} key={index} handleBuy={this.handleBuy} />
            )
          })
          }
        </Row>
      </Container>
    )
  }
}

export default inject("productStore")(observer(Home))