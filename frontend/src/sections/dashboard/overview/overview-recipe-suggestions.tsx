import type { FC } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import type { SxProps } from '@mui/system/styleFunctionSx';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const sliderSettings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

interface Tip {
  title: string;
  content: string;
}

interface OverviewRecipeSuggestionsProps {
  sx?: SxProps;
  suggestions: Tip[];
}

export const OverviewRecipeSuggestions: FC<OverviewRecipeSuggestionsProps> = (props) => {
  const { sx, suggestions } = props;

  return (
    <Card sx={sx}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ mb: 6 }}>
          <img src="/assets/next-tip.svg" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            '& .slick-slider': {
              cursor: 'grab'
            },
            '& .slick-slider, & .slick-list, & .slick-track': {
              height: '100%'
            },
            '& .slick-dots': {
              top: -50,
              bottom: 'unset',
              left: -10,
              textAlign: 'left'
            }
          }}
        >
          <Slider {...sliderSettings}>
            {suggestions.map((suggestion) => (
              <div key={suggestion.title}>
                <Typography variant="h6">
                  {suggestion.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                  variant="body1"
                >
                  {suggestion.content}
                </Typography>
              </div>
            ))}
          </Slider>
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewRecipeSuggestions.propTypes = {
  // @ts-ignore
  sx: PropTypes.object,
  suggestions: PropTypes.array.isRequired
};
