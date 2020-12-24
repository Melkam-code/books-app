import React, { Component } from 'react';
import { Table, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    books: [],
    newBookModal: false,
    newBookData: {
      title: '',
      rating: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/books')
    .then((response) => { this.setState({
      books: response.data
    })
  }); 
  }

  toggleNewBookModal(){
    this.setState({
      newBookModal: true
    })
  }

  render(){
    let books = this.state.books.map((book) => {
      return(
        <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.rating}</td>
            <td>
              <Button color="success" size="sm" className="mr-2">Edit</Button>
              <Button color="danger" size="sm">Delete</Button>
            </td>
        </tr>
      );
    })

  return (
    <div className="App container">
     <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add New Book</Button>
      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a New Book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input name="title" id="title" placeholder="Enter a title" />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input name="rating" id="rating" placeholder="Enter a rating" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books}
        </tbody>
      </Table>
    </div>
  );
  }
}

export default App;
