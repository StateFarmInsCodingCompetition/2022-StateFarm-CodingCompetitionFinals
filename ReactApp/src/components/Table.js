
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '../ag-theme-custom.css';

import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Typography} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/More';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Button, MenuItem } from '@mui/material';

function ViewTable(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [columns, setCols] = useState([]);
    const [rows, setRows] = useState([[]]);
	const [formValues, setFormValues] = useState([]);
	const [ogRow, setOGRow] = useState([]);
	const [moreOpen, setMoreOpen] = useState(false);
	const [success, setSuccess] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [currentRow, setCurrentRow] = useState(["","","","","","","","","",""]);
	const keyspace = "Hi";
	const table = "Bye";

	const handleClickOpen = (inputRow) => {
		setFormValues(inputRow);
		setOpen(true);
	};
	const handleEditClickOpen = () => {
		setEditOpen(true);
	};
	const handleMoreClickOpen = () => {
		setMoreOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleEditClose = () => {
		setEditOpen(false);
	};
	const handleMoreClose = () => {
		setMoreOpen(false);
	};
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };
	const handleCurrent = (event) => {
		console.log(event);
        setCurrentRow(rows[event.rowIndex]);
    };

	let navigate = useNavigate();

	function getRows() {
		setIsLoaded(true);
		setCols(["First Name", "Last Name", "Email", "Status (Relationship)", "DoB", "Address", "Gender", "Profession", "Relationship Start", "Relationship End"]);
		setRows([["Alisa", "Aldins", "aaldins0@payments.ex", "current", "1966","22947art", "female", "please", "1990-10", ""], ["BAlisa", "BAldins", "aaldins0@payments.ex", "current", "1966","22947art", "female", "please", "1990-10", ""]]);
		// const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/rows'
		// axios.get(query)
		// .then(
		// 	(result) => {
		// 		setIsLoaded(true);
		// 		setRows(result.data);
		// 	},
		// 	(error) => {
		// 		setIsLoaded(true);
		// 		setError(error);
		// 	}
		// )
	}

	useEffect(() => {getRows();
	// 	const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/rows'
	// 	axios.get(query)
	// 	.then(
	// 		(result) => {
	// 			setIsLoaded(true);
	// 			setRows(result.data);
	// 		},
	// 		(error) => {
	// 			setIsLoaded(true);
	// 			setError(error);
	// 		}
	// 	)
	 }, [])
    // useEffect(() => {
	// 	const query = 'http://localhost:8080/api/keyspaces/'+keyspace+'/tables/'+table+'/columnNames'
	// 	axios.get(query)
	// 	.then(
	// 		(result) => {
	// 			setIsLoaded(true);
	// 			setCols(result.data);
	// 		},
	// 		(error) => {
	// 			setIsLoaded(true);
	// 			setError(error);
	// 		}
	// 	)
	// }, [])

	function addRow(inputRow) {
		rows.push(inputRow);
		console.log(rows);
	}

	function editRow(oldRow, inputRow) {
		const edittRow = rows.findIndex(object => { return object === oldRow});
		setRows(rows.splice(edittRow, 1, inputRow));
	}

	function deleteRow(inputRow) {
		const delRow = rows.findIndex(object => { return object === inputRow});
		setRows(rows.splice(delRow));
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const list = formValues.map(x => x);
		
		list[name] = value;
		console.log(list);
		setFormValues(list);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = '\'' + formValues[index] + '\'';
			}
		})
		addRow(formValues);
		setFormValues(formValues.map(x => ''));
		var frm = document.getElementsByName('addForm')[0];
		frm.reset();
	};
	const handleEditSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = '\'' + formValues[index] + '\'';
			}
		})
		editRow(ogRow,formValues);
		columns.map((column, index) => {
			if (column.includes('int')) {}
			else if (column.includes('text')) {
				formValues[index] = formValues[index].substring(1, formValues[index].length - 1);
			}
		})
	};

	class EditBtnCellRenderer extends Component {
		constructor(props) {
			super(props);
			this.btnClickedHandler = this.btnClickedHandler.bind(this);
		}
		btnClickedHandler() {
			this.props.clicked(this.props.value);
		}
		render() {
			return (
				<Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={this.btnClickedHandler} sx={{
				  fontWeight: 'bold',fontFamily: [
					  'Open Sans',
					  'sans-serif'
				  ].join(',')
				}}>
          			edit
        		</Button>
			)
		}
	}
	class BtnCellRenderer extends Component {
		constructor(props) {
			super(props);
			this.btnClickedHandler = this.btnClickedHandler.bind(this);
		}
		btnClickedHandler() {
			this.props.clicked(this.props.value);
		}
		render() {
			return (
				<Button variant="contained" color="primary" startIcon={<PlaylistRemoveIcon />} onClick={this.btnClickedHandler} sx={{
				  fontWeight: 'bold',fontFamily: [
					  'Open Sans',
					  'sans-serif'
				  ].join(',')
				}}>
          			delete
        		</Button>
			)
		}
	}
	class MoreBtnCellRenderer extends Component {
		constructor(props) {
			super(props);
			this.btnClickedHandler = this.btnClickedHandler.bind(this);
		}
		btnClickedHandler() {
			this.props.clicked(this.props.value);
		}
		render() {
			return (
				<Button variant="contained" color="primary" startIcon={<MoreIcon />} onClick={this.btnClickedHandler} sx={{
				  fontWeight: 'bold',fontFamily: [
					  'Open Sans',
					  'sans-serif'
				  ].join(',')
				}}>
          			more
        		</Button>
			)
		}
	}
	console.log(rows);
	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		const colsFormatted = [];
		const rowsFormatted = [];

		columns.forEach((column, index) => (index < 4) ? colsFormatted.push({ field: column, sortable: true, resizable: true, filter: true }) : null);
		colsFormatted.push({
			field: 'view more',
			width: 160,
			cellRenderer: MoreBtnCellRenderer,
			cellRendererParams: {
				clicked: function (field) {
					setCurrentRow(field);
					handleMoreClickOpen();
					console.log(field);
				},
			},
		});
		colsFormatted.push({
			field: 'edit info',
			width: 140,
			cellRenderer: EditBtnCellRenderer,
			cellRendererParams: {
				clicked: function (field) {
					setFormValues(field);
					handleEditClickOpen();
					console.log(field);
				},
			},
		});
		colsFormatted.push({
			field: 'delete customer',
			width: 160,
			cellRenderer: BtnCellRenderer,
			cellRendererParams: {
				clicked: function (field) {
					deleteRow(keyspace, table, field);
					console.log(field);
				},
			},
		});
		rows.forEach(row => {
			const temp = {};
			for (let i = 0; i < columns.length; i++) {
				temp[columns[i]] = row[i];
			}
			temp["delete row"] = row;
			temp["edit row"] = row;
			rowsFormatted.push(temp);
		});
		console.log(colsFormatted);
		console.log(rowsFormatted);
		return (
			<Box sx={{
				mt: '5px'
			}}>
				<div id="myGrid" className="ag-theme-material ag-theme-custom" style={{
					height: 700, width: '100%', fontFamily: [
						'Open Sans',
						'sans-serif'
					].join(','), fontWeight: 'bold',fontSize: 13}}>
				
					<AgGridReact
						rowData={rowsFormatted}
						columnDefs={colsFormatted}
						animateRows={true}
						pagination={true}
						paginationPageSize={rowsPerPage}
						onCellClicked={handleCurrent}
					>
					</AgGridReact>	
					
					<Box sx={{mt: '-55px',  }}>
						<TextField
							id="field1-input"
							name='Rows Per Page'
							label='Rows Per Page'
							type="number"
							value={rowsPerPage}
							onChange={handleChangeRowsPerPage}
							sx={{ width: '12%',  maxWidth: '110px', height: '50px'}}
						/>	
						<Button variant="contained" startIcon={<PlaylistAddIcon />} sx={{
							width: '9%', mx: '5px', my: '9px', fontWeight: 'bold', fontFamily: ['Open Sans','sans-serif'].join(',') }} onClick= {handleClickOpen}>add
						</Button>
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>Enter Data</DialogTitle>
							<DialogContent align='center'>
								<DialogContentText sx={{ my: 2, fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')}}>
									To add data to this row, please enter data for each column and press submit.
          						</DialogContentText>
								<form name='addForm' onSubmit={handleEditSubmit} fullWidth>
									<Grid container fullWidth alignItems="center" justify="center" direction="column">
										{
											<Stack direction='column' FullWidth>
												{columns.map((column, index) => {
													if (column.includes('int'))
														return (
															<MenuItem FullWidth>
																<Grid item fullWidth>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="number"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else if (column.includes('text'))
														return (
															<MenuItem>
																<Grid item>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="text"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else
														return (
															<MenuItem>
																<Grid item>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="text"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
												})}
											</Stack>
										}
									</Grid>
								</form>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<Button onClick={handleSubmit}>Submit</Button>
							</DialogActions>
						</Dialog>
						<Dialog open={editOpen} onClose={handleEditClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>Edit Data</DialogTitle>
							<DialogContent align='center'>
								<DialogContentText sx={{ my: 2, fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',')}}>
									To edit data for this row, please change data and press submit.
          						</DialogContentText>
								<form name='editForm' onSubmit={handleSubmit} fullWidth>
									<Grid container fullWidth alignItems="center" justify="center" direction="column">
										{
											<Stack direction='column' FullWidth>
												{columns.map((column, index) => {
													if (column.includes('int'))
														return (
															<MenuItem FullWidth>

																<Grid item fullWidth>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="number"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else if (column.includes('text'))
														return (
															<MenuItem>

																<Grid item>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="text"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
													else
														return (
															<MenuItem>

																<Grid item>
																	<TextField
																		id="field1-input"
																		name={index}
																		label={column}
																		type="text"
																		value={(formValues)?formValues[index]:""}
																		onChange={handleInputChange}
																	/>
																</Grid>
															</MenuItem>
														);
												})}
											</Stack>
										}
										
									</Grid>
								</form>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleEditClose}>Cancel</Button>
								<Button onClick={handleEditSubmit}>Submit</Button>
							</DialogActions>
						</Dialog>
						<Dialog open={moreOpen} onClose={handleMoreClose}>
							<DialogTitle align='center' sx={{fontWeight: 'bold', fontFamily: ['Open Sans', 'sans-serif'].join(',') }}>More Information</DialogTitle>
							<DialogContent align='center'>
									<Grid container fullWidth alignItems="center" justify="center" direction="column">
										{
											<Stack direction='column' FullWidth>
												{columns.map((column, index) => {
													if (column.includes('int'))
														return (
															<MenuItem FullWidth>
																<Grid item fullWidth>
																	<Typography
																		id="field1-input"
																		
																	>{column} : {currentRow[index]} </Typography>
																</Grid>
															</MenuItem>
														);
													else if (column.includes('text'))
														return (
															<MenuItem>

																<Grid item>
																<Typography
																		id="field1-input"
																		
																	>{column} : {currentRow[index]} </Typography>
																</Grid>
															</MenuItem>
														);
													else
														return (
															<MenuItem>
																<Grid item>
																<Typography
																		id="field1-input">{column} : {currentRow[index]} </Typography>
																</Grid>
															</MenuItem>
														);
												})}
											</Stack>
										}
										
									</Grid>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleMoreClose}>Done</Button>
							</DialogActions>
						</Dialog>		
					</Box>
				</div>
			</Box>
		);
	}
}

export default ViewTable;