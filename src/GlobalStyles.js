import { makeStyles } from "@material-ui/core";




const useGlobalStyles = makeStyles(theme => ({
    placeholder:{
        fontSize: theme.typography.body2.fontSize
    }
}))

export default useGlobalStyles;