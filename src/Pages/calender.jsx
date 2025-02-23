import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    useTheme,
    ThemeProvider,
    createTheme
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight
} from '@mui/icons-material';

// Create a custom theme with yellow and black
const theme = createTheme({
    palette: {
        primary: {
            main: '#008000', // green
        },
        background: {
            default: '#000000',
            paper: '#121212',
        },
        text: {
            primary: '#008000',
            secondary: '#008000',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    transition: 'all 0.3s ease',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        transform: 'scale(1.02)',
                    },
                },
            },
        },
    },
});

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Sample activity data
    const activityData = {
        '2025-02-20': 5,
        '2025-02-21': 3,
        '2025-02-22': 8,
        '2025-02-23': 2
    };

    // Date utility functions
    const formatDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    const formatMonthYear = (date) => {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];
        for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        return days;
    };

    const isToday = (date) => {
        const today = new Date();
        return formatDate(date) === formatDate(today);
    };

    const isSameMonth = (date1, date2) => {
        return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const getActivityLevel = (date) => {
        const dateString = formatDate(date);
        return activityData[dateString] || 0;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const days = getDaysInMonth(currentDate);
    const firstDayOfMonth = days[0].getDay();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add padding days at the start
    const paddingDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        const prevDate = new Date(days[0]);
        prevDate.setDate(prevDate.getDate() - (firstDayOfMonth - i));
        paddingDays.push(prevDate);
    }

    // Add padding days at the end
    const lastDayOfMonth = days[days.length - 1].getDay();
    const endPaddingDays = [];
    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
        const nextDate = new Date(days[days.length - 1]);
        nextDate.setDate(nextDate.getDate() + i);
        endPaddingDays.push(nextDate);
    }

    const allDays = [...paddingDays, ...days, ...endPaddingDays];

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Full screen height
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: '800px',
                        margin: 'auto',
                        p: 3,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <IconButton onClick={handlePrevMonth} color="primary">
                            <ChevronLeft />
                        </IconButton>

                        <Typography variant="h5" color="primary" fontWeight="bold">
                            {formatMonthYear(currentDate)}
                        </Typography>

                        <IconButton onClick={handleNextMonth} color="primary">
                            <ChevronRight />
                        </IconButton>
                    </Box>

                    <Grid container spacing={1} sx={{ mb: 2 }}>
                        {weekDays.map((day) => (
                            <Grid item xs={12 / 7} key={day}>
                                <Typography
                                    color="text.secondary"
                                    align="center"
                                    sx={{ fontWeight: 'medium', fontWeight: '900' }}
                                >
                                    {day}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={1}>
                        {allDays.map((day, index) => {
                            const activityLevel = getActivityLevel(day);
                            const isSelected = selectedDate && formatDate(selectedDate) === formatDate(day);

                            return (
                                <Grid item xs={12 / 7} key={index}>
                                    <Card
                                        onClick={() => handleDateClick(day)}
                                        sx={{
                                            cursor: 'pointer',
                                            opacity: !isSameMonth(day, currentDate) ? 0.3 : 1,
                                            bgcolor: isToday(day) ? 'rgba(255, 215, 0, 0.2)' : 'background.paper',
                                            border: isSelected ? '2px solid' : 'none',
                                            borderColor: 'primary.main',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Typography color="text.primary">
                                                    {day.getDate()}
                                                </Typography>
                                                {activityLevel > 0 && (
                                                    <Box
                                                        sx={{
                                                            mt: 1,
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            bgcolor: 'primary.main',
                                                            opacity: Math.min(activityLevel / 10, 1),
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {selectedDate && (
                        <Paper
                            elevation={1}
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: 'rgba(255, 215, 0, 0.1)',
                            }}
                        >
                            <Typography color="primary" fontWeight="medium">
                                Activity for {selectedDate.toLocaleDateString('default', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Activity Level: {getActivityLevel(selectedDate)} events
                            </Typography>
                        </Paper>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default Calendar;