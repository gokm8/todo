import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        white: {
            light: "#f9f9f9",
            main: "#e5e7eb",
            dark: "#9ca3af",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        h1: {
            fontSize: "2rem",
        },
        h2: {
            fontSize: "1.75rem",
        },
        h3: {
            fontSize: "1.5rem",
        },
        h4: {
            fontSize: "1.25rem",
        },
        h5: {
            fontSize: "1rem",
        },
        h6: {
            fontSize: "0.875rem",
        },
        subtitle1: {
            fontSize: "0.875rem",
        },
        body1: {
            fontSize: "0.875rem",
        },
        body2: {
            fontSize: "0.75rem",
        },
    },
});

export default theme;
