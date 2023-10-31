import React, { useState } from 'react';
import Modal from "./Modal"
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData'
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import ContactForm  from './CarForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: "Vehicle ID", width: 90, },
    { field: 'make', headerName: "Car Make", flex: 1},
    { field: 'model', headerName: "Car Model", flex: 1},
    { field: 'year', headerName: "Year", width: 90, flex: 1},
    { field: 'color', headerName: "Color", flex: 1},
];

interface gridData {
    data: {
        id?:string
    }
  }

export const DataTable = () => {
    let { contactData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}});
    const [selectionModel, setSelectionModel] = useState<string[]>([]);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout( () => {window.location.reload()}, 500)
    }


 
    return (
        <>
            <Modal 
                id={selectionModel}
                open={open}
                onClose={() => handleClose}
            />
        <div className="flex flex-row bg-gray-200">
            <div>
                <button
                    className="p-3 bg-pink-200 font-semibold rounded m-5 hover:bg-slate-800 hover:text-white"
                    onClick={() => handleOpen()}
                >Add Car to Your Collection</button>
            </div> 
            <div>
                <button
                    className="p-3 bg-pink-200 rounded m-5 font-semibold hover:bg-slate-800 hover:text-white"
                    onClick={() => handleOpen()}
                >Update An Entry</button>
            </div> 
            <div>
                <button
                    className="p-3 bg-pink-200 rounded m-5 font-semibold hover:bg-slate-800 hover:text-white"
                    onClick={() => deleteData()}
                >Delete Car from Your Collection</button>
            </div> 
        </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
            style={{ height: 400, width: '100%'}}
        >
            <h2 className="p-3 bg-pink-200 my-4 text-center font-bold rounded">My Vehicles</h2>
            <DataGrid rows={contactData} columns={columns}
            checkboxSelection={true} 
            onSelectionModelChange={ (item:any) => {
                setSelectionModel(item);
            }}
            componentsProps={{
                pagination: {
                    rowsPerPageOptions: [10]
                    
                }
            }}
            />
            <p className="">&copy; Digital Dealership 2023</p>
        </div>
    </>
  )
}

export default DataTable