import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  InputWrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    width:'100%',
    fontFamily:'Poppins , sans-serif'
  },
  InputField:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
  },
  inputText:{
    border:'none',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '36px',
    color:'#161414',
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    opacity: 1,
    fontFamily:'Poppins , sans-serif'
  },
  placeholderText: {
   border:'none',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '36px',
    color:'#161414',
    width: '100%',
    opacity: 1,
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontFamily:'Poppins , sans-serif'
  },
  Label:{
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    color:'#979797',
    fontFamily:'Poppins , sans-serif'
  }
}));

