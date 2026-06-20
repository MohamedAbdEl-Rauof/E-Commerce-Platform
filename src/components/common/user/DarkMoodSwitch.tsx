"use client"

import * as React from "react"
import {useTheme} from "next-themes"
import dynamic from "next/dynamic"

// `react-dark-mode-toggle` pulls in `lottie-web`, which touches `document` at
// module load and crashes server-side prerendering. Load it client-side only.
const DarkModeSwitch = dynamic(() => import("react-dark-mode-toggle"), {
    ssr: false,
    loading: () => <div style={{width: 50, height: 28}}/>,
})

export default function DarkMoodSwitch() {
    const {resolvedTheme, setTheme} = useTheme()
    const isDarkMode = resolvedTheme === "dark"

    const toggleTheme = () => {
        setTheme(isDarkMode ? "light" : "dark")
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