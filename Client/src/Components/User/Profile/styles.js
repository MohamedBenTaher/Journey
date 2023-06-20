
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    userInfo: {
      marginTop: theme.spacing(2),
    },
    infoItem: {
      marginBottom: theme.spacing(1),
    },
    tabs:{
        width:'100%'
    }
  }));
  export default useStyles