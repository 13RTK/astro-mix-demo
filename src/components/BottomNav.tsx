import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import TableChartIcon from '@mui/icons-material/TableChart';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useEffect, useState } from 'react';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const routeMap: Record<number, string> = {
  0: '/',
  1: '/table',
  2: '/user',
};

function BottomNav() {
  const [value, setValue] = useState<number>(() => {
    // initialize based on current path
    const path = window.location.pathname;
    return Object.entries(routeMap).find(([k, v]) => v === path)?.[0]
      ? Number(Object.entries(routeMap).find(([k, v]) => v === path)?.[0])
      : 0;
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const to = routeMap[newValue];
    if (to) navigate(to, { history: 'push' });
  };

  useEffect(() => {
    const onLocationChange = () => {
      const path = window.location.pathname;
      const matched = Object.entries(routeMap).find(([k, v]) => v === path);
      if (matched) setValue(Number(matched[0]));
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  return (
    <Box className="bottom-0 fixed right-0 left-0 w-full">
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home(React)" icon={<HomeIcon />} />
        <BottomNavigationAction label="Table" icon={<TableChartIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;
