// import React, { Component, Fragment } from "react";
// import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import NewGenreForm from "./new_genre_form";

// class NewGenreModal extends Component {
//   state = {
//     modal: false
//   };

//   toggle = () => {
//     this.setState(previous => ({
//       modal: !previous.modal
//     }));
//   };

//   render() {
//     const create = this.props.create;

//     var title = "Editing Gerne";
//     var button = <Button onClick={this.toggle}>Edit</Button>;
//     if (create) {
//       title = "Creating New Genre";

//       button = (
//         <Button
//           color="primary"
//           className="float-right"
//           onClick={this.toggle}
//           style={{ minWidth: "200px" }}
//         >
//           Create New
//         </Button>
//       );
//     }

//     return (
//       <Fragment>
//         {button}
//         <Modal isOpen={this.state.modal} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

//           <ModalBody>
//             <NewGenreForm
//               resetState={this.props.resetState}
//               toggle={this.toggle}
//               genre={this.props.genre}
//             />
//           </ModalBody>
//         </Modal>
//       </Fragment>
//     );
//   }
// }

// export default NewGenreModal;