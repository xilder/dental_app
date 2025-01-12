import React, { useState } from 'react';
// import { Container } from '@mui/joy';
import {
  Box,
  Button,
  Container,
  Typography,
  Skeleton,
  useTheme,
  Grid,
  Divider,
  Icon,
  Input,
  IconButton,
} from '@mui/material';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import {
  homepageStats,
  homepageServices,
  homepageSteps,
  homepageInfo,
} from '../../constants/nav';
import ChatIcon from '@mui/icons-material/Chat';
import ChatUI from '../../components/chatUI';

const Home = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <Container
        component='section'
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          // border: '1px solid red',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            ...theme.mixins.toolbar,
          }}
        ></Box>
        <Box
          sx={{
            mt: '2%',
            display: 'grid',
            placeItems: 'center',
            mb: '30px',
            // border: '1px solid red',
          }}
        >
          <Typography
            component='h2'
            sx={{
              // border: '1px solid red',
              textAlign: 'center',
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: '60px',
            }}
          >
            Get Dental Care From The
            <br />
            Comfort of Your Home Today
          </Typography>
          <Typography
            variant='body2'
            gutterBottom={true}
            sx={{ textAlign: 'center' }}
          >
            Schedule a virtual appointment to receive expert advice,
            personalised treatment
            <br />
            plans, and continuous support without an in-person visit
          </Typography>
          <Button
            variant='contained'
            size='small'
            sx={{
              borderRadius: '20px',
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            Schedule Now
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <Skeleton key={'why'} variant='rectangular' sx={{ height: '100%' }}></Skeleton>
        </Box>
        <Grid
          container
          spacing={0}
          columns={4}
          sx={{
            width: '90%',
            height: '50px',
            backgroundColor: '#f2f7f8',
            my: '5px',
            borderRadius: '5px',
            border: '1px solid black',
          }}
        >
          {homepageStats.map((stat, index) => (
            <>
              <Grid
                key={stat.label}
                container
                sx={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: '10px',
                }}
              >
                <Grid item>
                  <Typography sx={{ fontSize: '16px' }}>
                    {stat.label}
                  </Typography>
                </Grid>
                <Grid item>
                  {' '}
                  <Typography sx={{ fontSize: '32px' }}>
                    {stat.value}
                  </Typography>
                </Grid>
              </Grid>
              {index < homepageStats.length - 1 && (
                <Divider orientation='vertical' flexItem />
              )}
            </>
          ))}
        </Grid>
      </Container>
      <Container
        component='section'
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          // border: '1px solid red',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            ...theme.mixins.toolbar,
          }}
        ></Box>
        <Grid container columns={2} sx={{ flex: 1, width: '90%' }}>
          <Box
            sx={{
              flex: 9,
              pl: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ height: 'auto' }}>
              <Typography
                gutterBottom
                sx={{ fontSize: '40px', lineHeight: '52px' }}
              >
                Convenient Expert Care,
                <br />
                Anywhere
              </Typography>
              <Typography sx={{ fontSize: '16px', lineHeight: ' 24px' }}>
                Our online dental telemedicine app allows you to easily connect
                <br />
                with a dentist from the comfort off your home. Get expert and
                advice
                <br />
                and treatment recommendations without the need
                <br />
                for an in-person visit
              </Typography>
              <Button
                variant='contained'
                size='small'
                sx={{
                  borderRadius: '20px',
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            <Skeleton
              variant='rectangular'
              sx={{ height: '40%', width: '80%' }}
            ></Skeleton>
          </Box>
        </Grid>
      </Container>
      <Container
        component='section'
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          // border: '1px solid red',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            ...theme.mixins.toolbar,
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            mt: '5%',
            alignItems: 'center',
            justifyContent: 'left',
            // border: '1px solid white',
            width: '90%',
          }}
        >
          <Typography
            sx={{
              lineHeight: '56px',
              fontSize: '44px',
              color: 'white',
              flex: 1,
              // borderTop: '5px solid white',
              // borderRight: '5px solid white',
            }}
          >
            We Offer The Best
            <br />
            Dental Services
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              lineHeight: '26px',
              flex: 1,
              color: 'white',
              // borderBottom: '5px solid white',
              height: '100%',
              pr: '80px',
              alignItems: 'center',
              textAlign: 'right',
            }}
          >
            Experience seamless journey to better dental health
            <br />
            with our easy-to-follow process designed to bring
            <br />
            expert care to directly to you.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            my: '2%',
            // border: '1px solid white',
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            flexDirection: 'row',
            pb: '100px',
          }}
        >
          {homepageServices.map((service) => (
            <Box
              key={service.type}
              sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                height: '60%',
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pl: '15px',
                py: '25px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: '10px',
                  mb: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 59, 69, 0.1)',
                }}
              >
                <Icon
                  component={service.icon}
                  sx={{ color: theme.palette.primary.main, fontSize: '20px' }}
                ></Icon>
              </Box>
              <Typography
                gutterBottom
                sx={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: 'black',
                }}
              >
                {service.type}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'black',
                }}
              >
                {service.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
      <Container
        component='section'
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          // border: '1px solid red',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            ...theme.mixins.toolbar,
          }}
        ></Box>
        <Box
          sx={{
            // border: '1px solid red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: '2%',
            width: '90%',
            // px: '20px',
          }}
        >
          <Typography sx={{ fontSize: '40px', flex: 1 }}>
            Your Guide to Online
            <br />
            Dental Consultation
          </Typography>
          <Typography sx={{ fontSize: '14px', flex: 1 }}>
            Follow these simple steps to access top-quality
            <br />
            dental care from the comfort of your home.
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'stretch',
            alignItems: 'center',
            // border: '1px solid red',
            width: '90%',
          }}
        >
          <Box
            sx={{
              // border: '1px solid brown',
              flex: 1,
              height: '70%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {homepageSteps.map((step) => (
              <Box
                key={step.label}
                sx={{
                  // border: '1px solid red',
                  flex: 1,
                  width: '60%',
                  ml: '20px',
                  display: 'flex',
                  justifyItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    // border: '1px green solid',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: '9px',
                  }}
                >
                  <RadioButtonCheckedOutlinedIcon
                    sx={{
                      fontSize: '9px',
                      color: theme.palette.primary.main,
                      my: '3px',
                    }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                  <CircleIcon
                    sx={{ fontSize: '5px', color: '#A9A9A9', fontWeight: 900 }}
                  />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    pl: '15px',
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{
                      fontSize: '24px',
                      lineHeight: '24px',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      mt: '5px',
                      textAlign: 'end',
                      width: '100%',
                      mb: '15px',
                    }}
                  >
                    {step.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              justifyContent: ' center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                height: '70%',
                borderRadius: '10px',
                backgroundColor: '#F5F5F5',
                width: '300px',
                display: 'flex',
                justifyContent: ' center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  border: '2px solid #D5D5D5',
                  height: '80%',
                  width: '80%',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    alignSelf: 'center',
                    backgroundColor: '#D5D5D5',
                    height: '16px',
                    width: '80px',
                    mt: '5px',
                    borderRadius: '4px',
                  }}
                ></Box>
                <Box
                  sx={{
                    flex: 1,
                    width: '90%',
                    alignSelf: 'center',
                    mt: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    mx: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      flex: 1,
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '16px',
                        width: '45%',
                        borderRadius: '4px',
                        mb: '5px',
                      }}
                    ></Box>
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '24px',
                        width: '100%',
                        borderRadius: '4px',
                      }}
                    ></Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      flex: 1,
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '16px',
                        width: '45%',
                        borderRadius: '4px',
                        mb: '5px',
                      }}
                    ></Box>
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '24px',
                        width: '100%',
                        borderRadius: '4px',
                      }}
                    ></Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      flex: 1,
                      width: '100%',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '16px',
                        width: '45%',
                        borderRadius: '4px',
                        mb: '5px',
                      }}
                    ></Box>
                    <Box
                      sx={{
                        backgroundColor: '#D5D5D5',
                        height: '24px',
                        width: '100%',
                        borderRadius: '4px',
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        component='section'
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          // border: '1px solid red',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {' '}
        <Box
          sx={{
            ...theme.mixins.toolbar,
          }}
        ></Box>
        <Box
          sx={{
            backgroundColor: '#005C6D40',
            display: 'flex',
            alignItems: 'center',
            // border: '1px solid red',
            flexDirection: 'column',
            width: '90%',
            mt: '20px',
            borderRadius: '10px',
            pt: '3%',
            pb: '2%',
          }}
        >
          <Typography
            gutterBottom
            sx={{ fontSize: '40px', textAlign: 'center' }}
          >
            Experience Top-Quality Dental
            <br />
            Care From Home
          </Typography>
          <Typography
            sx={{ fontSize: '14px', textAlign: 'center', mb: '10px' }}
          >
            Schedule your virtual consultation with Epitome today and enjoy the
            best dental services and
            <br />
            convenience of professional dental care at your fingertips
          </Typography>
          <Button
            variant='contained'
            size='small'
            sx={{ fontSize: 11, borderRadius: '20px', fontWeight: 900 }}
          >
            Book Consultation
          </Button>
        </Box>
        <Box
          sx={{
            // border: '1px solid black',
            flex: 1,
            mt: '50px',
            width: '90%',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              width: '300px',
              // border: '1px solid red',
              ml: '20px',
            }}
          >
            <Typography
              sx={{
                fontSize: '18px',
                color: theme.palette.primary.main,
                mb: '20px',
              }}
            >
              Epitome
            </Typography>
            <Typography sx={{ fontSize: '12px', mb: '5px', textAlign: 'left' }}>
              Get the dental tips and our latest special offers
            </Typography>
            <Input
              fullWidth
              placeholder='Enter Your Email'
              value={email}
              margin='none'
              sx={{
                height: '32px',
                borderRadius: '16px',
                fontSize: '12px',
                pl: '16px',
                pr: 0,
                backgroundColor: '#005C6D40',
                border: 'none',
              }}
              disableUnderline
              onChange={(e) => setEmail(e.target.value)}
              endAdornment={
                <Button
                  variant='contained'
                  sx={{
                    fontSize: '11px',
                    height: '32px',
                    borderRadius: '16px',
                    m: 0,
                  }}
                >
                  Subscribe
                </Button>
              }
            ></Input>
          </Box>
          <Box
            sx={{
              // border: '1px solid red',
              flex: 1,
              ml: '300px',
              display: 'flex',
            }}
          >
            {homepageInfo.map((info) => (
              <Box
                key={info.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // border: '1px solid black',
                  flex: 1,
                  ml: '15px',
                  alignItems: 'flex-start',
                }}
              >
                <Typography sx={{ fontSize: '14px', mb: '10px' }}>
                  {info.label}
                </Typography>
                {info.infoLinks.map((infoLink) => (
                  <Typography
                    key={infoLink.name}
                    sx={{ mb: '5px', fontSize: '14px' }}
                  >
                    {infoLink.name}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: '2px solid #F5F5F5',
            height: '60px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '14px', ml: '50px' }}>
            &copy; 2024 EpitomeSecure. All Rights Reserved
          </Typography>
        </Box>
      </Container>
      {!showChat && (
        <IconButton
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // height: '300px',
            border: '2px solid #005969',
            borderRadius: '10px',
            backgroundColor: '#F5F5F5DD',
            // width: '300px',
            position: 'fixed',
            bottom: '20px',
            right: '5px',
          }}
          onClick={() => setShowChat(true)}
        >
          <ChatIcon fontSize='small' sx={{color: theme.palette.primary.main}}/>
        </IconButton>
      )}
    {showChat && <ChatUI setShowChat={setShowChat} />}
    </>
  );
};
export default Home;
