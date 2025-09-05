import React, { useState, useEffect, useMemo } from "react"
import Header from "./components/Header/Header"
import LeftPanel from "./components/LeftPanel/LeftPanel"
import MainContent from "./components/MainContent/MainContent"
import Footer from "./components/Footer/Footer"
import LandingPage from "./components/LandingPage/LandingPage"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { getClassData } from "./api/classDataApi"
import { mapApiDataToRows } from "./utils/mapper"
import { rowsData } from "./dataTableRowsdata"
import "./App.css"

const App = () => {
    const [selected, setSelected] = useState(1) // Default class
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState(null)
    const [groupedRows, setGroupedRows] = useState({})
    const [apiFailed, setApiFailed] = useState(false)

    // fetchRows: fetches all data and updates groupedRows
    const fetchRows = async () => {
        try {
            const apiResponseData = await getClassData()
            const grouped = mapApiDataToRows(apiResponseData)
            setGroupedRows(grouped)
            setApiFailed(false) // ✅ API worked
        } catch (error) {
            console.error("Error fetching rows:", error)
            setApiFailed(true) // ❌ mark as failed
        }
    }

    // Call API only once on mount
    useEffect(() => {
        fetchRows()
    }, [])

    // ✅ Prefer API rows, else fallback to dummyData
    const rows = useMemo(() => {
        if (!apiFailed && groupedRows[selected]) {
            return groupedRows[selected]
        } 
        // else if (apiFailed) {
        //     console.warn("API fetch failed, using fallback data.")
        //     // console.warn("Using fallback data due to API failure.");
        //     return rowsData[selected] ?? []
        // }
    }, [groupedRows, selected, apiFailed])

    const theme = createTheme({
        palette: { mode: darkMode ? "dark" : "light" },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app-container'>
                {user ? (
                    <>
                        <Header
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                            user={user}
                            setUser={setUser}
                        />
                        <div className='content-wrapper'>
                            <LeftPanel
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <MainContent
                                apiFailed={apiFailed}
                                rows={rows}
                                fetchRows={fetchRows}
                                selected={selected}
                            />
                        </div>
                        <Footer />
                    </>
                ) : (
                    <div className='landing-content'>
                        <LandingPage setUser={setUser} />
                    </div>
                )}
            </div>
        </ThemeProvider>
    )
}

export default App
