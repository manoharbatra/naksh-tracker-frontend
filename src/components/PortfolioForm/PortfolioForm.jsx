/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

const PortfolioForm = ({ initialValues = {}, onSubmitForm, onCancel }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: dayjs(), // default today
            event: "",
            type: "",
            place: "",
            city: "",
            state: "",
            outcome: "",
            link: "",
            class: "",
        },
    })

    // ✅ whenever initialValues change (edit mode), update form
    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            reset({
                date: initialValues.date ? dayjs(initialValues.date) : dayjs(),
                event: initialValues.event || "",
                type: initialValues.type || "",
                place: initialValues.place || "",
                city: initialValues.city || "",
                state: initialValues.state || "",
                outcome: initialValues.outcome || "",
                link: initialValues.link || "",
                class: initialValues.class || "",
            })
        }
    }, [initialValues, reset])

    const onSubmit = (data) => {
        const finalData = {
            ...data,
            type: data.type.toLowerCase(),
            date: dayjs(data.date).format("YYYY-MM-DD"), // formatted output
            class: Number(data.class),
        }
        onSubmitForm(finalData)
        reset({
            date: dayjs(),
            event: "",
            type: "",
            place: "",
            city: "",
            state: "",
            outcome: "",
            link: "",
            class: "",
        })
    }

    return (
        <Box p={2} sx={{ width: 400 }}>
            <Typography variant='h6' mb={2}>
                {initialValues?.id
                    ? "Edit Portfolio Record"
                    : "Add Portfolio Record"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name='date'
                        control={control}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                label='Date'
                                value={field.value || null}
                                onChange={(newValue) =>
                                    field.onChange(newValue)
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.date,
                                        helperText: errors.date?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>

                <Controller
                    name='event'
                    control={control}
                    rules={{ required: "Event is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Event'
                            fullWidth
                            margin='normal'
                            error={!!errors.event}
                            helperText={errors.event?.message}
                        />
                    )}
                />

                {/* New Autocomplete field */}
                <Controller
                    name='type'
                    control={control}
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={["School", "Personal"]}
                            value={field.value || ""}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Type'
                                    margin='normal'
                                    fullWidth
                                    error={!!errors.type}
                                    helperText={errors.type?.message}
                                />
                            )}
                        />
                    )}
                />

                <Controller
                    name='place'
                    control={control}
                    rules={{ required: "Place is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Place'
                            fullWidth
                            margin='normal'
                            error={!!errors.place}
                            helperText={errors.place?.message}
                        />
                    )}
                />

                <Controller
                    name='city'
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='City'
                            fullWidth
                            margin='normal'
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    )}
                />
                <Controller
                    name='state'
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='State'
                            fullWidth
                            margin='normal'
                            error={!!errors.state}
                            helperText={errors.state?.message}
                        />
                    )}
                />

                <Controller
                    name='outcome'
                    control={control}
                    rules={{ required: "Outcome is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Outcome'
                            fullWidth
                            margin='normal'
                            error={!!errors.outcome}
                            helperText={errors.outcome?.message}
                        />
                    )}
                />

                <Controller
                    name='link'
                    control={control}
                    rules={{ required: "Link is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Link'
                            fullWidth
                            margin='normal'
                            error={!!errors.link}
                            helperText={errors.link?.message}
                        />
                    )}
                />

                {/* Buttons */}
                <Box mt={3} display='flex' justifyContent='space-between'>
                    <Button
                        variant='outlined'
                        color='warning'
                        onClick={() =>
                            reset({
                                date: dayjs(),
                                event: "",
                                type:"",
                                place: "",
                                city:"",
                                state: "",
                                outcome: "",
                                link: "",
                                class: "",
                            })
                        }
                    >
                        Clear All
                    </Button>
                    <Box display='flex' gap={1}>
                        <Button variant='outlined' onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default PortfolioForm
