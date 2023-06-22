import React, { useEffect } from 'react';
import useStyles from './styles';
import { Typography, Avatar, Grid, Paper,Box,Card,CardContent,Tab,Tabs } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../actions/auth';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const Profile = ({ id}) => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  console.log('ny user',user)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUser(id))
  },[])
  const classes = useStyles();
  const [likedvalue, setLikedValue] = React.useState(0);
  const handleLikeChange = (event, newValue) => {
    setLikedValue(newValue);
  };
  const [savedValue, setSavedValue] = React.useState(0);
  const handleSaveChange = (event, newValue) => {
    setSavedValue(newValue);
  };
  if(!user) return(
    <div>test</div>
  )
  const likedPostMessages = user?.user?.likedResources?.filter(res => res.type === "PostMessage");
  const likedLocations = user?.user?.likedResources?.filter(res => res.type === "location");
  const likedCountries = user?.user?.likedResources?.filter(res => res.type === "countries");
  const LikedCities=user?.user?.likedResources?.filter(res => res.type === "destination");
  const LikedEvents=user?.user?.likedResources?.filter(res => res.type === "event");
  const savedPostMessages = user?.user?.savedResources?.filter(res => res.type === "PostMessage");
  const savedLocations = user?.user?.savedResources?.filter(res => res.type === "location");
  const savedCountries = user?.user?.savedResources?.filter(res => res.type === "countries");
  const savedCities=user?.user?.savedResources?.filter(res => res.type === "destination");
  const savedEvents=user?.user?.savedResources?.filter(res => res.type === "event");
  const likedResources = []; // Replace with an array of liked resources
  const savedResources = []; // Replace with an array of saved resources

  return (
    <>
    <Paper className={classes.root} elevation={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar className={classes.avatar} src={user?.user?.avatar} alt={user?.user?.name} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user?.user?.name}</Typography>
          <Typography variant="subtitle1">{user?.user?.email}</Typography>
        </Grid>
      </Grid>

      <div className={classes.userInfo}>
        <Typography variant="h6" className={classes.infoItem}>
          Age: {user?.user?.age}
        </Typography>
        <Typography variant="h6" className={classes.infoItem}>
          Address: {user?.user?.address}
        </Typography>
        <Typography variant="h6" className={classes.infoItem}>
          Type: {user?.user?.type}
        </Typography>
      </div>
   
    <div>
    <Typography variant="h6">Liked Resources</Typography>
    <Tabs value={likedvalue} onChange={handleLikeChange} aria-label="basic tabs example" className={classes.tabs} variant={'fullWidth'} TabIndicatorProps={{
        style: { backgroundColor: '#1CA0E3' }, // Change this color to the desired underline color
      }}> 
          <Tab label="Stories"  />
          <Tab label="Locations" />
          <Tab label="Cities"  />
          <Tab label="Countries"  />
          <Tab label="event"  />
      </Tabs>
      {user?.user?.savedResources?.length>0 ?(
         <><TabPanel value={likedvalue} index={0}>
              {likedPostMessages.length > 0 ? (
                user?.user?.likedResources?.map((res) => {
                  if (res.type === "PostMessage") {
                    return (
                      <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                        <CardContent>
                          <Typography gutterBottom variant="body2" component="p">
                            {res.title} {/* Display the title */}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {res.description} {/* Display the description */}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  }
                  return null; // Skip rendering if the resource name is not "PostMessage"
                })) : (
                <Typography variant="body2">No Liked PostMessage</Typography>
              )}
            </TabPanel><TabPanel value={likedvalue} index={1}>
                {likedLocations.length > 0 ? (
                  user?.user?.likedResources?.map((res) => {
                    if (res.type === "location") {
                      return (
                        <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="p">
                              {res.title} {/* Display the title */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {res.description} {/* Display the description */}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null; // Skip rendering if the resource name is not "PostMessage"
                  })) : (
                  <Typography variant="body2">No Liked Locations</Typography>
                )}
              </TabPanel><TabPanel value={likedvalue} index={2}>
                {LikedCities.length > 0 ? (
                  user?.user?.likedResources?.map((res) => {
                    if (res.type === "destination") {
                      return (
                        <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="p">
                              {res.title} {/* Display the title */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {res.description} {/* Display the description */}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null; // Skip rendering if the resource name is not "PostMessage"
                  })) : (
                  <Typography variant="body2">No Liked Cities</Typography>
                )}
              </TabPanel><TabPanel value={likedvalue} index={3}>
                {likedCountries.length > 0 ? (
                  user?.user?.likedResources?.map((res) => {
                    if (res.type === "country") {
                      return (
                        <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="p">
                              {res.title} {/* Display the title */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {res.description} {/* Display the description */}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null; // Skip rendering if the resource name is not "PostMessage"
                  })) : (
                  <Typography variant="body2">No Liked Countries</Typography>
                )}
              </TabPanel><TabPanel value={likedvalue} index={4}>
                {LikedEvents.length > 0 ? (
                  user?.user?.likedResources?.map((res) => {
                    if (res.type === "Event") {
                      return (
                        <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                          <CardContent>
                            <Typography gutterBottom variant="body2" component="p">
                              {res.title} {/* Display the title */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {res.description} {/* Display the description */}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null; // Skip rendering if the resource name is not "PostMessage"
                  })) : (
                  <Typography variant="body2">No Liked Events</Typography>
                )}
              </TabPanel></>
      ):(
        <TabPanel >
          No Liked Resources 
        </TabPanel>
      )}
      <Typography variant="h6">Saved Resources</Typography>
      <Tabs value={savedValue} onChange={handleSaveChange} aria-label="basic tabs example"  variant={'fullWidth'} TabIndicatorProps={{
        style: { backgroundColor: '#1CA0E3' }, // Change this color to the desired underline color
      }}>
          <Tab label="Stories"  />
          <Tab label="Locations" />
          <Tab label="Cities"  />
          <Tab label="Countries"  />
          <Tab label="Events"  />
      </Tabs>
      {user?.user?.savedResources?.length>0 ?(
      <><TabPanel value={savedValue} index={0}>
          {savedPostMessages.length > 0 ? (
            user?.user?.savedResources?.map((res) => {
              if (res.type === "PostMessage") {
                return (
                  <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                    <CardContent>
                      <Typography gutterBottom variant="body2" component="p">
                        {res.title} {/* Display the title */}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {res.description} {/* Display the description */}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              }
              return null; // Skip rendering if the resource name is not "PostMessage"
            })) : (
            <Typography variant="body2">No Saved PostMessage</Typography>
          )}
        </TabPanel><TabPanel value={savedValue} index={1}>
            {savedLocations.length > 0 ? (
              user?.user?.savedResources?.map((res) => {
                if (res.type === "location") {
                  return (
                    <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                      <CardContent>
                        <Typography gutterBottom variant="body2" component="p">
                          {res.title} {/* Display the title */}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {res.description} {/* Display the description */}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Skip rendering if the resource name is not "PostMessage"
              })) : (
              <Typography variant="body2">No Saved Locations</Typography>
            )}
          </TabPanel><TabPanel value={savedValue} index={2}>
            {savedCities.length > 0 ? (
              user?.user?.savedResources?.map((res) => {
                if (res.type === "destination") {
                  return (
                    <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                      <CardContent>
                        <Typography gutterBottom variant="body2" component="p">
                          {res.title} {/* Display the title */}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {res.description} {/* Display the description */}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Skip rendering if the resource name is not "PostMessage"
              })) : (
              <Typography variant="body2">No Saved Cities</Typography>
            )}
          </TabPanel><TabPanel value={savedValue} index={3}>
            {savedCountries.length > 0 ? (
              user?.user?.savedResources?.map((res) => {
                if (res.type === "country") {
                  return (
                    <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                      <CardContent>
                        <Typography gutterBottom variant="body2" component="p">
                          {res.title} {/* Display the title */}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {res.description} {/* Display the description */}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Skip rendering if the resource name is not "PostMessage"
              })) : (
              <Typography variant="body2">No Saved Countries</Typography>
            )}
          </TabPanel><TabPanel value={savedValue} index={4}>
            {savedEvents.length > 0 ? (
              user?.user?.savedResources?.map((res) => {
                if (res.type === "Event") {
                  return (
                    <Card key={res._id} style={{ width: '50%', margin: 'auto' }}>
                      <CardContent>
                        <Typography gutterBottom variant="body2" component="p">
                          {res.title} {/* Display the title */}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {res.description} {/* Display the description */}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                }
                return null; // Skip rendering if the resource name is not "PostMessage"
              })) : (
              <Typography variant="body2">No Saved Events</Typography>
            )}
          </TabPanel></>
      ):(
        <TabPanel >
          No Liked Resources 
        </TabPanel>
      )
}
    </div>
    </Paper></>
  );
};

export default Profile;
