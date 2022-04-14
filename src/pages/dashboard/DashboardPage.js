/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import { useTour } from '@reactour/tour';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';

import Page from '../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';

import Icon from '../../components/icon/Icon';

import { demoPages } from '../../menu';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';

const TableRow = ({ id, username, email, phone_number: phoneNumber }) => {
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>{username}</td>
			<td>{email}</td>
			<td>{phoneNumber}</td>
		</tr>
	);
};

const DashboardPage = () => {
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	const [tableData, setTableDta] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const { items, requestSort, getClassNamesFor } = useSortableData(tableData);

	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown') {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const AllUsers = async () => {
		await fetch('http://3.215.147.147/admin_panel/users/')
			.then((response) => response.json())
			.then((dta) => {
				setTableDta(dta.data);
				// eslint-disable-next-line no-console
				console.log('data', dta.data);
			});
	};

	useEffect(() => {
		AllUsers();
	}, []);
	// eslint-disable-next-line no-console
	console.log('data table', tableData);
	// eslint-disable-next-line no-console
	console.log('items', items);

	return (
		<PageWrapper title={demoPages.sales.subMenu.dashboard.text}>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-xxl-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle tag='h4' className='h5'>
										All Users
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
											<th
												scope='col'
												onClick={() => requestSort('id')}
												className='cursor-pointer text-decoration-underline'>
												ID
												<Icon
													size='lg'
													className={getClassNamesFor('id')}
													icon='FilterList'
												/>
											</th>

											<th
												scope='col'
												onClick={() => requestSort('username')}
												className='cursor-pointer text-decoration-underline'>
												UserName
												<Icon
													size='lg'
													className={getClassNamesFor('username')}
													icon='FilterList'
												/>
											</th>

											<th
												scope='col'
												onClick={() => requestSort('phone_number')}
												className='cursor-pointer text-decoration-underline'>
												Email
												<Icon
													size='lg'
													className={getClassNamesFor('phone_number')}
													icon='FilterList'
												/>
											</th>
											<th
												scope='col'
												onClick={() => requestSort('email')}
												className='cursor-pointer text-decoration-underline'>
												Phone Number
												<Icon
													size='lg'
													className={getClassNamesFor('email')}
													icon='FilterList'
												/>
											</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i) => (
											// eslint-disable-next-line react/jsx-props-no-spreading
											<TableRow key={i.id} {...i} />
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={items}
								label='items'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
