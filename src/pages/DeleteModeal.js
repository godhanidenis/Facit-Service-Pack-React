import React, { useState } from 'react'
import Button from '../components/bootstrap/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../components/bootstrap/Modal';
import Icon from '../components/icon/Icon';

const DeleteModeal=(props)=> {
    // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    console.log("modeal?????",props)
  return (
    <Modal isOpen={props.setdeleteModalOpen} setIsOpen={props.issetDeleteModalOpen} size='lg' isScrollable isCentered={true}>
				<ModalHeader>
					<ModalTitle>
					<div>
					<Icon
							size='3x'
							icon='Cancel'
							color='danger'
							style={{
								cursor: 'pointer',
								marginLeft: '10px',
							}}
						/>
						<span style={{color:'OrangeRed' , fontSize:25 , marginLeft:"10px"}}><b>{props.alertLable || 'Alert'} </b></span>
					</div>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<h4 style={{marginLeft:"20px"}}>Do you really want to delete <b>{props.agentName}</b>?</h4>
				</ModalBody>

				<ModalFooter>
				<Button color='dark' onClick={() => props.issetDeleteModalOpen(false)}>
						cancle
					</Button>
					<Button color='danger' onClick={props.sethandleDeleteOpration}>
						Delete
					</Button>
				</ModalFooter>
			</Modal>
  );
};

export default DeleteModeal