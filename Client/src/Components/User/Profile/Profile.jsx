import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../actions/auth";
import DestinationCard from "../../Destination/DestinationCard/Destination";
import SavedEventCard from "../../Event/Saved/SavedEventCard";
import Post from "../../Posts/Post/post";
import LocationCard from "../../Location/LocationCard/LocationCard";
import PostCard from "../../Posts/PostCard/PostCard";
import CountryCard from "../../Country/CountryCard/CountryCard";
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

const Profile = ({ id }) => {
  const { user, isLoading } = useSelector((state) => state?.auth);
  console.log("ny user", user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
    console.log("my user ", user);
  }, []);
  const classes = useStyles();
  const [likedvalue, setLikedValue] = React.useState(0);
  const handleLikeChange = (event, newValue) => {
    setLikedValue(newValue);
  };
  const [savedValue, setSavedValue] = React.useState(0);
  const handleSaveChange = (event, newValue) => {
    setSavedValue(newValue);
  };
  if (!user) return <div>test</div>;
  const likedPostMessages = user?.user?.likedStories;
  const likedLocations = user?.user?.likedLocations;
  const likedCountries = user?.user?.likedCountries;
  const LikedCities = user?.user?.likedCities;
  const LikedEvents = user?.user?.likedEvents;
  const savedPostMessages = user?.user?.savedStories;
  const savedLocations = user?.user?.savedLocations;
  const savedCountries = user?.user?.savedCountries;
  const savedCities = user?.user?.savedCities;
  const savedEvents = user?.user?.savedEvents;
  console.log(
    "my likes",
    likedPostMessages,
    likedLocations,
    likedCountries,
    LikedCities,
    LikedEvents,
  );
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              className={classes.avatar}
              src={user?.user?.avatar}
              alt={user?.user?.name}
            />
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
          <Tabs
            value={likedvalue}
            onChange={handleLikeChange}
            aria-label="basic tabs example"
            className={classes.tabs}
            variant={"fullWidth"}
            TabIndicatorProps={{
              style: { backgroundColor: "#1CA0E3" }, // Change this color to the desired underline color
            }}
          >
            <Tab label="Stories" />
            <Tab label="Locations" />
            <Tab label="Cities" />
            <Tab label="Countries" />
            <Tab label="event" />
          </Tabs>
          {user?.user?.savedResources?.length > 0 ? (
            <>
              <TabPanel value={likedvalue} index={0}>
                <Grid container spacing={3}>
                  {likedPostMessages.length > 0 ? (
                    likedPostMessages?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <PostCard post={res} small />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">
                      No Liked PostMessage
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={likedvalue} index={1}>
                <Grid conatiner spacing={3}>
                  {likedLocations.length > 0 ? (
                    likedLocations?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <LocationCard location={res} small />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">No Liked Locations</Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={likedvalue} index={2}>
                <Grid container spacing={3}>
                  {LikedCities.length > 0 ? (
                    LikedCities.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <DestinationCard
                            destination={res}
                            userId={user.user._id}
                            small
                          />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">No Liked Cities</Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={likedvalue} index={3}>
                <Grid spacing={2} container>
                  {likedCountries.length > 0 ? (
                    likedCountries?.map((res) => {
                      console.log("my res", res);
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <CountryCard
                            country={res}
                            userId={user?.user._id}
                            small
                          />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">No Liked Countries</Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={likedvalue} index={4}>
                <Grid container spacing={3}>
                  {LikedEvents.length > 0 ? (
                    LikedEvents?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <SavedEventCard event={res} />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">No Liked Events</Typography>
                  )}
                </Grid>
              </TabPanel>
            </>
          ) : (
            <TabPanel>No Liked Resources</TabPanel>
          )}
          <Typography variant="h6">Saved Resources</Typography>
          <Tabs
            value={savedValue}
            onChange={handleSaveChange}
            aria-label="basic tabs example"
            variant={"fullWidth"}
            TabIndicatorProps={{
              style: { backgroundColor: "#1CA0E3" }, // Change this color to the desired underline color
            }}
          >
            <Tab label="Stories" />
            <Tab label="Locations" />
            <Tab label="Cities" />
            <Tab label="Countries" />
            <Tab label="Events" />
          </Tabs>
          {user?.user?.savedResources?.length > 0 ? (
            <>
              <TabPanel value={savedValue} index={0}>
                <Grid container spacing={3}>
                  {savedPostMessages.length > 0 ? (
                    savedPostMessages?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <PostCard post={res} small />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">
                      No Saved PostMessage
                    </Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={savedValue} index={1}>
                <Grid container spacing={3}>
                  {savedLocations.length > 0 ? (
                    savedLocations?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <LocationCard location={res} small />
                        </Grid>
                      );
                    })
                  ) : (
                    <Typography variant="body2">No Saved Locations</Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={savedValue} index={2}>
                <Grid container spacing={3}>
                  {savedCities.length > 0 ? (
                    savedCities?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <DestinationCard
                            destination={res}
                            userId={user.user._id}
                            small
                          />
                        </Grid>
                      );
                      return null; // Skip rendering if the resource name is not "PostMessage"
                    })
                  ) : (
                    <Typography variant="body2">No Saved Cities</Typography>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={savedValue} index={3}>
                {savedCountries.length > 0 ? (
                  user?.user?.savedResources?.map((res) => {
                    if (res.type === "country") {
                      return (
                        <Card
                          key={res._id}
                          style={{ width: "50%", margin: "auto" }}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="p"
                            >
                              {res.title} {/* Display the title */}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {res.description} {/* Display the description */}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    }
                    return null; // Skip rendering if the resource name is not "PostMessage"
                  })
                ) : (
                  <Typography variant="body2">No Saved Countries</Typography>
                )}
              </TabPanel>
              <TabPanel value={savedValue} index={4}>
                <Grid container spacing={3}>
                  {savedEvents.length > 0 ? (
                    savedEvents?.map((res) => {
                      return (
                        <Grid key={res._id} item xs={12} sm={6} md={4} lg={3}>
                          <SavedEventCard event={res} />
                        </Grid>
                      );
                      return null; // Skip rendering if the resource name is not "PostMessage"
                    })
                  ) : (
                    <Typography variant="body2">No Saved Events</Typography>
                  )}
                </Grid>
              </TabPanel>
            </>
          ) : (
            <TabPanel>No Liked Resources</TabPanel>
          )}
        </div>
      </Paper>
    </>
  );
};

export default Profile;
