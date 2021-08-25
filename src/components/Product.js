import React, {Component} from 'react'
import { Col, Image, Button } from "react-bootstrap"
import { observer, inject } from "mobx-react"

class Product extends Component {
  handleBuy = async (e) => {
    let product = await this.props.productStore.getProduct(e.target.value)
    this.props.handleBuy(product.data[0])
  }

  render = () => {
    let prod = this.props.product
    let count = 0
    return (
        <Col key={count++} xxl={4} xl={4} md={6} sm={12} xs={12} className="mb-5 text-center">
            <Image src={prod.Image} className="w-50 h-50 rounded"/>
            <p>{prod.Title}</p>
            <p>Price : {prod.Price}$</p>
            <p>Descreption : {prod.Descreption}</p>
            <Button value={prod._id} onClick={this.handleBuy}>Buy</Button>
        </Col>
    )
  }
}

export default inject("productStore")(observer(Product))