import React from 'react';
import Box from '../../components/Box/Box';
import './Home.css';

const Home: React.FC = () => {
  return (
    
      <div className="boxes-container">
        <Box 
          title="Satsang Schedule" 
          subtitle="Set the language and timing for satsang"
          link="/satsang1"
          variant="primary"
        />
        {/* <Box 
          title="Mobile Apps" 
          subtitle="iOS and Android application development"
          link="/satsang2"
          variant="secondary"
        />
        <Box 
          title="UI/UX Design" 
          subtitle="Beautiful and intuitive user interfaces"
          link="/satsang3"
          variant="tertiary"
        /> */}
      </div>
    
  );
};

export default Home;