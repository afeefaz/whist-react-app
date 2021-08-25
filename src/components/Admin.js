import React, {Component} from 'react';
import { Modal, Container, Button, Table, Form } from "react-bootstrap"
import { observer, inject } from "mobx-react"

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      products : [],
      product : {
        0 : {
          Title: "",
          Price: 0,
          Descreption : "",
          Image : "https://picsum.photos/200/300?random=1"
        }
      },
      showEdit : false,
      showAdd : false,
      Title: "",
      Price: 0,
      Descreption : "",
      Image : "https://picsum.photos/200/300?random=1"
    }
  }

  componentDidMount = async () => {
   await this.getProducts()
  }

  getProducts = async () => {
    await this.props.productStore.getProducts()
    let tempData = await this.props.productStore.products
    this.setState({products : tempData.data})
  }

  addProduct = async () => {
    let Title = this.state.Title
    let Price = this.state.Price
    let Descreption = this.state.Descreption
    let Image = this.state.Image

    let obj = {
      Title : Title,
      Price : Price,
      Descreption : Descreption,
      Image : Image
    }
    await this.props.productStore.addProduct(obj)
    this.getProducts()

    this.setState({
      showAdd : !this.state.showAdd,
      Title: "",
      Price: 0,
      Descreption : "",
      Image : "https://picsum.photos/200/300?random=1"
    })
  }

  deleteProduct = async (e) => {
    let id = e.target.value
    this.props.productStore.deleteProduct(id)
    let tempArr = this.state.products
    tempArr = tempArr.filter((prod) => prod._id !== id)
    this.setState({products : tempArr})
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  getProduct = async (id) => {
    let product = await this.props.productStore.getProduct(id)
    return product.data
  }

  editProduct = async (e) => {
    let id = this.state.id

    console.log(this.state.product)

    let Title = this.state.Title || this.state.product[0].Title
    let Price = this.state.Price || this.state.product[0].Price
    let Descreption = this.state.Descreption || this.state.product[0].Descreption
    let Image = this.state.Image || this.state.product[0].Image


    await this.props.productStore.updateProduct(id, Title, Price, Descreption, Image)
    this.getProducts()

    this.setState({
      showEdit : !this.state.showEdit,
      Title: "",
      Price: 0,
      Descreption : "",
      Image : "https://picsum.photos/200/300?random=1",
      id : 0
    })
  }

  toggleEdit = async (e) => {
    if(e){
      let id = e.target.value
      let product = await this.getProduct(id)
      this.setState({
        showEdit : !this.state.showEdit,
        id : id,
        product : product
      })
    }
    else {
      this.setState({
        showEdit : !this.state.showEdit
      })
    }
  }

  toggleAdd = () => {
    this.setState({showAdd : !this.state.showAdd})
  }

  render = () => {
    return (
      <Container fluid className="d-flex flex-column mt-3 text-center">
        <h1>Admin Panel</h1>
        <Button className="align-self-end m-3" onClick={this.toggleAdd}>Add</Button>

          <Modal show={this.state.showAdd} onHide={this.toggleAdd}>
              <Modal.Header closeButton>
                <Modal.Title className="coach-info">Add Product</Modal.Title>
              </Modal.Header>
                <Modal.Body className="bodyModal">
                  <Form>
                  <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Title" value={this.state.Title} placeholder="Title" />
                  <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Price" value={this.state.Price} placeholder="Price" />
                  <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Descreption" value={this.state.Descreption} placeholder="Descreption" />
                  <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Image" value={this.state.Image} placeholder="Image URL" />
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="m-2" onClick={this.addProduct}>Add</Button>
                  <Button className="m-2 btn-danger" onClick={this.toggleAdd} >Cancel</Button>
              </Modal.Footer>
            </Modal>
            
          <Table responsive bordered hover>
      <thead>
        <tr className="text-center">
          <th>Title</th>
          <th>Price</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
          {
            this.state.products.map(prod => {
              return(
                <tr key={prod._id} className="text-center">
                <td>{prod.Title}</td>
                <td>{prod.Price}</td>
                <td>
                  <Button className="m-2" value={prod._id} onClick={this.toggleEdit}>Edit</Button>
                  <Button className="m-2 btn-danger" value={prod._id} onClick={this.deleteProduct}>Delete</Button>

                  <Modal show={this.state.showEdit} onHide={this.toggleEdit}>
                    <Modal.Header closeButton>
                      <Modal.Title className="coach-info">Update Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bodyModal">
                      <Form>
                      <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Title" value={this.state.Title} placeholder={this.state.product[0].Title} />
                      <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Price" value={this.state.Price} placeholder={this.state.product[0].Price} />
                      <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Descreption" value={this.state.Descreption} placeholder={this.state.product[0].Descreption} />
                      <Form.Control onChange={this.handleChange} className="mb-3" type="text" name="Image" value={this.state.Image} placeholder={this.state.product[0].Image} />
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="m-2" onClick={this.editProduct}>Update</Button>
                      <Button className="m-2 btn-danger" onClick={this.toggleEdit} >Cancel</Button>
                    </Modal.Footer>
                  </Modal>
                </td>
                </tr>
              )
            })
          }
      </tbody>
    </Table>
  </Container>
    )
  }
}

export default inject("productStore")(observer(Admin))