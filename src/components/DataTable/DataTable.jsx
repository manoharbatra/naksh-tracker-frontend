import * as React from "react"
import PropTypes from "prop-types"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid } from "@mui/x-data-grid"
import { Link } from "@mui/material"
import { Box, IconButton } from "@mui/material"
import { deleteClassDataById, updateClassDataById } from "../../api/classDataApi"

const DataTable = ({ rows, fetchRows, onEdit }) => {
    // const editClassDataById = async (row) => {
    //     try {
    //         // Call your API to update the row
    //         await updateClassDataById(row.id, row)
    //         // Refresh the data
    //         fetchRows()
    //     } catch (error) {
    //         console.log("Error updating row:", error)
    //     }
    // }
    const handleDelete = async (id) => {
        try {
            // Call your API to delete the row
            await deleteClassDataById(id)
            // Refresh the data
            fetchRows()
        } catch (error) {
            console.log("Error deleting row:", error)
        }
    }
    const columns = [
        { field: "date", headerName: "Date", flex: 1 },
        { field: "event", headerName: "Event", flex: 2 },
        { field: "place", headerName: "Place", flex: 2 },
        { field: "outcome", headerName: "Outcome", flex: 1 },
        {
            field: "link",
            headerName: "Link",
            flex: 0.5,
            renderCell: (params) => (
                <Link href={params.value} target='_blank' rel='noopener'>
                    View
                </Link>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color='primary'
                        onClick={() => onEdit(params.row)} // use onEdit prop
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color='error'
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (
        <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sortingOrder={['asc', 'desc']}
            />
        </div>
    )
}

// ✅ Add PropTypes validation
DataTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            event: PropTypes.string.isRequired,
            place: PropTypes.string.isRequired,
            outcome: PropTypes.string.isRequired,
            link: PropTypes.string,
        })
    ).isRequired,
    fetchRows: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired, // ✅ new prop for edit action
}

export default DataTable
