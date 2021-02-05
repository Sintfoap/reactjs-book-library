// import React, { Component, Fragment } from "react";
// import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import NewSeriesForm from "./new_series_form";

// class NewSeriesModal extends Component {
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

//     var title = "Editing Series";
//     var button = <Button onClick={this.toggle}>Edit</Button>;
//     if (create) {
//       title = "Creating New Series";

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
//             <NewSeriesForm
//               resetState={this.props.resetState}
//               toggle={this.toggle}
//               series={this.props.series}
//             />
//           </ModalBody>
//         </Modal>
//       </Fragment>
//     );
//   }
// }

// export default NewSeriesModal;