// context for light or dark mood
"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider} from "next-themes"

export function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props} attribute="class">{children}</NextThemesProvider>
}