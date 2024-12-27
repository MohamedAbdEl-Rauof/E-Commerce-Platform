"use client"

import * as React from "react"
import DarkMoodSwitch from "./DarkMoodSwitch"
import Header from "@/components/common/user/Header/Page"


export default function Navbar() {

    return (
        <div>
            <DarkMoodSwitch/>
            <Header/>
        </div>
    )
}