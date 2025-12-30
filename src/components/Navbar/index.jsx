import * as React from 'react';
import { useState, useEffect } from 'react'; // Added hooks
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, InputBase, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';

// --- STYLED COMPONENTS (Chrome Look) ---
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '999px', 
  backgroundColor: '#303134', 
  '&:hover': {
    backgroundColor: '#3c4043',
  },
  '&:focus-within': {
    backgroundColor: '#3c4043',
    boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    flex: 1, 
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9aa0a6', 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#e8eaed', 
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '16px', 
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // FIX: Local state for immediate typing feedback
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

  // 1. SYNC URL -> INPUT (Handles Browser Back Button)
  useEffect(() => {
    const queryFromUrl = searchParams.get('q') || '';
    // Only update if different to avoid conflicting with your typing
    if (queryFromUrl !== inputValue) {
      setInputValue(queryFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 2. SYNC INPUT -> URL (Debounced handles "Fast Typing")
  useEffect(() => {
    // Wait 300ms after you stop typing to update the URL
    const timer = setTimeout(() => {
      const queryFromUrl = searchParams.get('q') || '';
      
      if (inputValue !== queryFromUrl) {
        if (inputValue.trim()) {
           navigate({
             pathname: '/search',
             search: `?${createSearchParams({ q: inputValue, oq: inputValue })}`
           });
        } else {
           // If cleared, go back to home
           if (window.location.pathname !== '/') {
             navigate('/');
           }
        }
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup timer if you type again
  }, [inputValue, navigate, searchParams]);


  const onSearchChange = (e) => {
    // Update local state INSTANTLY so letters never disappear
    setInputValue(e.target.value); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#202124', boxShadow: 'none', borderBottom: '1px solid #3c4043' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontFamily: '"Arial Black", sans-serif',
              color: '#fff',
              cursor: 'pointer',
              minWidth: '150px'
            }}
            onClick={() => navigate('/')}
          >
            MOVIES APP
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search movies..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearchChange}
              value={inputValue} // Controlled by Local State now
              autoComplete="off" 
            />
          </Search>

          <Box sx={{ display: 'flex', gap: 1, minWidth: '120px', justifyContent: 'flex-end' }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <FavoriteIcon sx={{ color: '#9aa0a6' }} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon sx={{ color: '#9aa0a6' }} />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit">
              <PersonIcon sx={{ color: '#9aa0a6' }} />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}