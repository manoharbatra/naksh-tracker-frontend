/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import { IconButton, Button } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import LaunchIcon from "@mui/icons-material/Launch"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { LINK_GDRIVE_GALLERY } from "../../utils/constants"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher"
import "./Header.css"

const Header = ({ darkMode, setDarkMode, user, setUser }) => {
    const { t } = useTranslation()
    const handleClick = () => {
        window.open(LINK_GDRIVE_GALLERY, "_blank")
    }

    return (
        <div className='header'>
            {/* App title */}
            <span className='header-title'>
                {user ? `${t("hello")} ${user?.given_name}` : `Digital Tracker`}
            </span>
            <Button
                variant='contained'
                color='primary'
                endIcon={<LaunchIcon />}
                onClick={handleClick}
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                Gallery
            </Button>
            {/* Right side controls */}
            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                {/* Theme toggle */}
                <IconButton onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
                {/* Language switcher */}
                <LanguageSwitcher />
                {/* Auth button */}
                {user ? (
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={() => setUser(null)} // ✅ logout clears user
                    >
                        Logout
                    </Button>
                ) : (
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(
                                credentialResponse.credential
                            )
                            setUser(decoded) // ✅ save user info
                        }}
                        onError={() => {
                            console.log("Login Failed")
                        }}
                    />
                )}
            </div>
        </div>
    )
}

Header.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.null]),
    setUser: PropTypes.func.isRequired,
}

export default Header
