import { createTheme } from '@mui/material/styles';
import { purple, red, green } from '@mui/material/colors';

const theme = createTheme({
    palette:{
        primary:{
            main: red[600],
            light: green[400]
        },
        secondary:{
            main: purple[400]
        },
    }
})

export default theme