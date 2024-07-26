import { makeStyles } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

export default makeStyles((theme)=>({
    formControl:{
        margin: theme.spacing(1),
        minWidth:120,
        marginBottom:'30px',
    },
    selectEmpty:{
        marginTop: theme.spacing(2),
    },
    loading:{
        Height:'600px',
        display:'flex',
        justifyContent:'center',
        alignitems:'center',
    },
    conatiner:{
        padding:'25px',
    },
    marginBottom:{
        marginBottom:'30px',
    },
    list:{
        height:'75vh',
        overflow:'auto',
    },
}));