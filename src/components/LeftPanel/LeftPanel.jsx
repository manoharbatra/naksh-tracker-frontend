/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { dropdownClassOptions } from "../../utils/constants"
import { Button, Popover, TextField, Autocomplete, Box } from "@mui/material"
import { useClassCategories } from "../../hooks/useClassCategories"
import { deleteData, postData } from "../../api/classCategoryApi"
import "./LeftPanel.css"

const LeftPanel = ({ selected, setSelected }) => {
    const { categories, loading, error, refetch } = useClassCategories()

    const [addCat, setAddCat] = useState(null) // for add autocomplete
    const [deleteCat, setDeleteCat] = useState(null) // for delete autocomplete
    const [anchorEl, setAnchorEl] = useState(null)
    const [actionType, setActionType] = useState(null) // add or delete

    const handleOpen = (e, type) => {
        setAnchorEl(e.currentTarget)
        setActionType(type)
        setAddCat(null) // reset addCat when opening
        setDeleteCat(null) // reset deleteCat when opening
    }

    const handleClose = () => {
        setAnchorEl(null)
        setActionType(null)
    }

    const handleAdd = async () => {
        if (!addCat) return
        try {
            const data = await postData("/class-categories", {
                name: addCat.name,
                order: addCat.order,
            })
            alert(data.message || "Category added successfully")
            await refetch() // ✅ refresh categories
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || "Failed to add category")
        }
        handleClose()
    }

    const handleDelete = async () => {
        if (!deleteCat) return
        try {
            const data = await deleteData(
                `/class-categories/${deleteCat.order}`
            )
            alert(data.message || "Category deleted successfully")
            await refetch() // ✅ refresh categories
        } catch {
            console.error(err)
            alert(err.response?.data?.message || "Failed to delete category")
        }
        handleClose()
    }

    // if (loading) return <div>Loading...</div>
    // if (error) return <p style={{ color: "red" }}>Error...</p>

    return (
        <aside className='left-panel'>
            <div className='title-box'>
                <span>Class</span>
                {!error && (
                    <>
                        <Button
                            sx={{ padding: 0 }}
                            size='small'
                            onClick={(e) => handleOpen(e, "add")}
                        >
                            Add
                        </Button>

                        {categories?.length > 0 && (
                            <Button
                                sx={{ padding: 0 }}
                                size='small'
                                onClick={(e) => handleOpen(e, "delete")}
                            >
                                Delete
                            </Button>
                        )}
                    </>
                )}
            </div>
            <div className='options'>
                {categories?.length > 0 ? (
                    categories.map((cat) => (
                        <label key={cat.id} className='option-box'>
                            <input
                                type='radio'
                                name='class'
                                value={cat.order}
                                checked={selected === cat.order}
                                onChange={() => setSelected(cat.order)}
                            />
                            {cat.name}
                        </label>
                    ))
                ) : (
                    // <p>No categories found</p>
                    <>
                        {dropdownClassOptions.map((opt) => (
                            <label key={opt.order} className='option-box'>
                                <input
                                    type='radio'
                                    name='class'
                                    value={opt.order}
                                    checked={selected === opt.order}
                                    onChange={() => setSelected(opt.order)}
                                />
                                {opt.name}
                            </label>
                        ))}
                    </>
                )}

                {/* {error && dropdownClassOptions.map((opt) => (
                <label key={opt.order} className="option-box">
                  <input
                    type="radio"
                    name="class"
                    value={opt.order}
                    checked={selected === opt.order}
                    onChange={() => setSelected(opt.order)}
                  />
                  {opt.name}
                </label>
              ))} */}
            </div>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                {" "}
                <Box sx={{ p: 2, width: 300 }}>
                    {actionType === "add" && (
                        <>
                            <Autocomplete
                                options={dropdownClassOptions}
                                getOptionLabel={(option) => `${option.name}`}
                                value={addCat}
                                onChange={(_, value) => setAddCat(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size='small'
                                        label='Select class'
                                    />
                                )}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleAdd}
                                disabled={!addCat}
                            >
                                Add Class
                            </Button>
                        </>
                    )}
                    {actionType === "delete" && (
                        <>
                            <Autocomplete
                                options={categories || []}
                                getOptionLabel={(option) => option.name}
                                value={deleteCat}
                                onChange={(_, value) => setDeleteCat(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size='small'
                                        label='Select category'
                                    />
                                )}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleDelete}
                                color='error'
                                disabled={!deleteCat}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </Box>
            </Popover>
        </aside>
    )
}

export default LeftPanel
