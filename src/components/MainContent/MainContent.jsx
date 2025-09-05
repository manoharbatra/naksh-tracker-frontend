/* eslint-disable react/prop-types */
import React, { useState } from "react"
import PortfolioForm from "../PortfolioForm/PortfolioForm"
import DataTable from "../DataTable/DataTable"
import * as XLSX from "xlsx"
import {
    Box,
    Paper,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    IconButton,
    Tooltip,
    Divider,
    Popover,
    Button,
} from "@mui/material"
import { Add, FileDownload } from "@mui/icons-material"
import { createClassData, updateClassDataById } from "../../api/classDataApi"
import "./MainContent.css"

const MainContent = ({ apiFailed, rows, fetchRows, selected }) => {
    const [editRow, setEditRow] = useState(null) // ✅ store row to edit
    const [anchorEl, setAnchorEl] = useState(null)
    const [filters, setFilters] = useState({
        school: true,
        personal: true,
    })

    // Checkbox filter handler
    const handleChange = (e) => {
        const { name, checked } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }

    // Export to Excel
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredRows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
        XLSX.writeFile(workbook, "portfolio_data.xlsx")
    }

    // Popover handlers
  const handleOpenAdd = (event) => {
    setEditRow(null) // clear edit state for add
    setAnchorEl(event.currentTarget)
  }
  const handleOpenEdit = (row) => {
    setEditRow(row) // set row for editing
    setAnchorEl(document.body) // force open popover
  }

    const handleClose = () => {
        setEditRow(null)
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    // Apply filters
    const filteredRows = rows?.filter((row) => {
        if (row.type === "school" && filters.school) return true
        if (row.type === "personal" && filters.personal) return true
        return false
    })

    return (
        <main className='main-content'>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                }}
            >
                {/* Header */}
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' fontWeight={600}>
                        Portfolio Records
                    </Typography>

                    {/* Add button */}
                    {!apiFailed && (
                        <Button
                            variant='contained'
                            size='small'
                            sx={{ ml: 2 }}
                            startIcon={<Add />}
                            onClick={handleOpenAdd}
                        >
                            Add
                        </Button>
                    )}
                    {/* Filters + Export */}
                    {rows?.length > 0 && (
                        <Box
                            ml='auto'
                            display='flex'
                            alignItems='center'
                            gap={2}
                        >
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.school}
                                            onChange={handleChange}
                                            name='school'
                                            color='primary'
                                        />
                                    }
                                    label='School'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filters.personal}
                                            onChange={handleChange}
                                            name='personal'
                                            color='primary'
                                        />
                                    }
                                    label='Personal'
                                />
                            </FormGroup>

                            <Divider
                                orientation='vertical'
                                flexItem
                                sx={{ mx: 1 }}
                            />

                            <Tooltip title='Export to Excel'>
                                <IconButton
                                    color='primary'
                                    onClick={handleExport}
                                    sx={{
                                        bgcolor: "primary.light",
                                        "&:hover": {
                                            bgcolor: "primary.main",
                                            color: "white",
                                        },
                                    }}
                                >
                                    <FileDownload />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>

                {/* DataTable */}
                <Box flex={1} overflow='auto'>
                    <DataTable rows={filteredRows} fetchRows={fetchRows} onEdit={handleOpenEdit}/>
                </Box>
            </Paper>

            {/* Popover with form */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <PortfolioForm
                initialValues={editRow} // ✅ prefill when editing
                    onSubmitForm={async (data) => {
                        try {
                            if(editRow) {
                                const payload = { ...data, class: selected }
                                // update existing record
                                await updateClassDataById(editRow.id, payload)
                                
                            }   else {  
                            
                            // attach class number
                            const payload = { ...data, class: selected }
                            await createClassData(payload)
                            }
                            // refresh rows after successful create
                            await fetchRows()

                            handleClose()
                        } catch (error) {
                            console.error("Error creating record:", error)
                        }
                    }}
                    onCancel={handleClose}
                />
            </Popover>
        </main>
    )
}

export default MainContent
