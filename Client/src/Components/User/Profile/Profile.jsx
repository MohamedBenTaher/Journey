import React, { useEffect } from 'react';
import useStyles from './styles';
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
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../actions/auth';
import DestinationCard from '../../Destination/DestinationCard/Destination';
import SavedEventCard from '../../Event/Saved/SavedEventCard';
import LocationCard from '../../Location/LocationCard/LocationCard';
import PostCard from '../../Posts/PostCard/PostCard';
import CountryCard from '../../Country/CountryCard/CountryCard';
import CardCarousel from '../../CardCarousel/CardCarousel';
import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(id));
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
  if (!user && !isLoading) return <div>test</div>;
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
    'my likes',
    likedPostMessages,
    likedLocations,
    likedCountries,
    LikedCities,
    LikedEvents,
  );
  return (
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
        <Tabs
          value={likedvalue}
          onChange={handleLikeChange}
          aria-label="basic tabs example"
          className={classes.tabs}
          variant={'fullWidth'}
          TabIndicatorProps={{
            style: { backgroundColor: '#1CA0E3' }, // Change this color to the desired underline color
          }}>
          <Tab label="Stories" />
          <Tab label="Locations" />
          <Tab label="Cities" />
          <Tab label="Countries" />
          <Tab label="event" />
        </Tabs>
        {likedPostMessages?.length > 0 ? (
          <>
            <TabPanel value={likedvalue} index={0}>
              {!isLoading ? (
                likedPostMessages.length > 0 ? (
                  <CardCarousel
                    array={likedPostMessages}
                    CardComponent={PostCard}
                    small={true}
                    profile={true}
                  />
                ) : (
                  <Typography variant="body2">No Liked PostMessage</Typography>
                )
              ) : (
                <Grid container spacing={3}>
                  {Array.from(new Array(2)).map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                        <Skeleton variant="rounded" width={'100%'} height={300} />
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={likedvalue} index={1}>
              <Grid conatiner spacing={3}>
                {!isLoading ? (
                  likedLocations.length > 0 ? (
                    <CardCarousel
                      array={likedLocations}
                      CardComponent={LocationCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Liked Locations</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={likedvalue} index={2}>
              <Grid container spacing={3} sx={{ width: '100%' }}>
                {!isLoading ? (
                  LikedCities.length > 0 ? (
                    <CardCarousel
                      array={LikedCities}
                      CardComponent={DestinationCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Liked Cities</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={likedvalue} index={3}>
              <Grid spacing={2} container>
                {!isLoading ? (
                  likedCountries.length > 0 ? (
                    <CardCarousel
                      array={likedCountries}
                      CardComponent={CountryCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Liked Countries</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={likedvalue} index={4}>
              <Grid container spacing={3}>
                {!isLoading ? (
                  LikedEvents.length > 0 ? (
                    <CardCarousel
                      array={LikedEvents}
                      CardComponent={SavedEventCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Liked Events</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
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
          variant={'fullWidth'}
          TabIndicatorProps={{
            style: { backgroundColor: '#1CA0E3' }, // Change this color to the desired underline color
          }}>
          <Tab label="Stories" />
          <Tab label="Locations" />
          <Tab label="Cities" />
          <Tab label="Countries" />
          <Tab label="Events" />
        </Tabs>
        {savedLocations?.length > 0 ? (
          <>
            <TabPanel value={savedValue} index={0}>
              {!isLoading ? (
                savedLocations.length > 0 ? (
                  <CardCarousel
                    array={savedLocations}
                    CardComponent={LocationCard}
                    small={true}
                    profile={true}
                  />
                ) : (
                  <Typography variant="body2">No saved Locations</Typography>
                )
              ) : (
                <Grid container spacing={3}>
                  {Array.from(new Array(2)).map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                        <Skeleton variant="rounded" width={'100%'} height={300} />
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={savedValue} index={1}>
              {!isLoading ? (
                savedPostMessages.length > 0 ? (
                  <CardCarousel
                    array={savedPostMessages}
                    CardComponent={PostCard}
                    small={true}
                    profile={true}
                  />
                ) : (
                  <Typography variant="body2">No Saved Posts</Typography>
                )
              ) : (
                <Grid container spacing={3}>
                  {Array.from(new Array(2)).map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                      <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                        <Skeleton variant="rounded" width={'100%'} height={300} />
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </TabPanel>
            <TabPanel value={savedValue} index={2}>
              <Grid container spacing={3} sx={{ width: '100%' }}>
                {!isLoading ? (
                  savedCities.length > 0 ? (
                    <CardCarousel
                      array={savedCities}
                      CardComponent={DestinationCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No saved Cities</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={savedValue} index={3}>
              <Grid spacing={2} container>
                {!isLoading ? (
                  savedCountries.length > 0 ? (
                    <CardCarousel
                      array={savedCountries}
                      CardComponent={CountryCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Liked Countries</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={savedValue} index={4}>
              <Grid container spacing={3}>
                {!isLoading ? (
                  savedEvents.length > 0 ? (
                    <CardCarousel
                      array={savedEvents}
                      CardComponent={SavedEventCard}
                      small={true}
                      profile={true}
                    />
                  ) : (
                    <Typography variant="body2">No Saved Events</Typography>
                  )
                ) : (
                  <Grid container spacing={3}>
                    {Array.from(new Array(2)).map((item, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                          <Skeleton variant="rounded" width={'100%'} height={300} />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </TabPanel>
          </>
        ) : (
          <TabPanel>No Saved Resources</TabPanel>
        )}
      </div>
    </Paper>
  );
};

Profile.propTypes = {
  id: PropTypes.string,
};
export default Profile;
