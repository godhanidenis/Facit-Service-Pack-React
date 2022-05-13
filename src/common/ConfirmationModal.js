import React from 'react';
import Button from '../components/bootstrap/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../components/bootstrap/Modal';
import Icon from '../components/icon/Icon';

const DeleteModel = (props) => {
	const { deleteModalOpen, setDeleteModalOpen, handleDeleteOpration, name, alertLable } = props;

	return (
		<Modal
			isOpen={deleteModalOpen}
			setIsOpen={setDeleteModalOpen}
			size='lg'
			isScrollable
			isCentered>
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
						<span style={{ color: 'OrangeRed', fontSize: 25, marginLeft: '10px' }}>
							<b>{alertLable || 'Alert'} </b>
						</span>
					</div>
				</ModalTitle>
			</ModalHeader>

			<ModalBody>
				<h4 style={{ marginLeft: '20px' }}>
					Do you really want to delete <b>{name}</b>?
				</h4>
			</ModalBody>

			<ModalFooter>
				<Button color='dark' onClick={() => setDeleteModalOpen(false)}>
					cancle
				</Button>
				<Button color='danger' onClick={handleDeleteOpration}>
					Delete
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DeleteModel;
