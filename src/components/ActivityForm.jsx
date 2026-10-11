import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';

import React, { useState } from 'react';
import { addActivity } from '../services/api';

const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: '',
    caloriesBurned: '',
    additionalMetrics: {}
  });

  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      activity.duration.trim() === '' ||
      activity.caloriesBurned.trim() === ''
    ) {
      setPopupMessage('Please enter duration and calories burned.');
      setPopupOpen(true);
      return; // Backend API call nahi hogi
    }

    // Negative values aur zero validate karo
    if (
      Number(activity.duration) <= 0 ||
      Number(activity.caloriesBurned) <= 0
    ) {
      setPopupMessage('Duration and calories burned must be greater than 0.');
      setPopupOpen(true);
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      await addActivity(activity);

      await onActivityAdded();

      setActivity({
        type: "RUNNING",
        duration: '',
        caloriesBurned: '',
        additionalMetrics: {}
      });

    } catch (error) {
      console.error('Failed to add activity:', error);
      setPopupMessage('Failed to add activity. Please try again.');
      setPopupOpen(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit}>

        <FormControl fullWidth sx={{ mb: 2 }} disabled={loading}>
          <InputLabel>Activity Type</InputLabel>

          <Select
            label="Activity Type"
            value={activity.type}
            onChange={(e) =>
              setActivity({ ...activity, type: e.target.value })
            }
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          required
          label="Duration (Minutes)"
          type="number"
          sx={{ mb: 2 }}
          disabled={loading}
          slotProps={{ htmlInput: { min: 1 } }}
          value={activity.duration}
          onChange={(e) =>
            setActivity({ ...activity, duration: e.target.value })
          }
        />

        <TextField
          fullWidth
          required
          label="Calories Burned"
          type="number"
          sx={{ mb: 2 }}
          disabled={loading}
          slotProps={{ htmlInput: { min: 1 } }}
          value={activity.caloriesBurned}
          onChange={(e) =>
            setActivity({ ...activity, caloriesBurned: e.target.value })
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          {loading ? 'Adding...' : 'Add Activity'}
        </Button>
      </Box>

      {/* Validation and error popup */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      >
        <DialogTitle>Activity Validation</DialogTitle>

        <DialogContent>
          <Alert severity="warning">
            {popupMessage}
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setPopupOpen(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivityForm;