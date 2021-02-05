// import React from "react";
// import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// import axios from "axios";

// import { API_URL } from "../constants";

// class NewAuthorForm extends React.Component {
//   state = {
//     pk: 0,
//     first_name: "",
//     last_name: ""
//   };

//   componentDidMount() {
//     if (this.props.book) {
//       const { pk, first_name, last_name } = this.props.author;
//       this.setState({ pk, first_name, last_name });
//     }
//   }

//   onChange = e => {
//     this.setState({ [e.target.last_name]: e.target.value });
//   };

//   createAuthor = e => {
//     e.preventDefault();
//     axios.post(API_URL, this.state).then(() => {
//       this.props.resetState();
//       this.props.toggle();
//     });
//   };

//   editAuthor = e => {
//     e.preventDefault();
//     axios.put(API_URL + 'authors/detail/' + this.state.pk, this.state).then(() => {
//       this.props.resetState();
//       this.props.toggle();
//     });
//   };

//   defaultIfEmpty = value => {
//     return value === "" ? "" : value;
//   };

//   render() {
//     return (
//       <Form onSubmit={this.props.book ? this.editAuthor : this.createAuthor}>
//         <FormGroup>
//           <Label for="first_name">First_name:</Label>
//           <Input
//             type="text"
//             name="first_name"
//             onChange={this.onChange}
//             value={this.defaultIfEmpty(this.state.title)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="last_name">Last_name:</Label>
//           <Input
//             type="text"
//             name="last_name"
//             onChange={this.onChange}
//             value={this.defaultIfEmpty(this.state.notes)}
//           />
//         </FormGroup>
//         <Button>Send</Button>
//       </Form>
//     );
//   }
// }

// export default NewAuthorForm;