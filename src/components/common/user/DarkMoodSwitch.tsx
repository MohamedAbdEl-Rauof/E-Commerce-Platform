"use client"

import * as React from "react"
import {useTheme} from "next-themes"
import DarkModeSwitch from "react-dark-mode-toggle"

export default function DarkMoodSwitch() {
    const {theme, setTheme} = useTheme()
    const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark")

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        setIsDarkMode(newTheme === "dark")
    }

    return (
        <div>
            <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleTheme}
                size={50}
            />
        </div>
    )
}