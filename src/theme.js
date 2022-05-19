import { createTheme } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

const theme = createTheme({
    palette:{
        primary:{
            main: "#E1306C",
            light: grey[400]
        },
        secondary:{
            main: purple[400]
        },
    }
})

export default theme