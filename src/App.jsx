import { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import schedule from "./data/schedule";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const patients = Object.keys(schedule);

function App() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
    setExpanded(false);
  };

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Plan zajęć
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="patient-label">Wybierz pacjenta</InputLabel>
          <Select
            labelId="patient-label"
            value={selectedPatient}
            label="Wybierz pacjenta"
            onChange={handlePatientChange}
          >
            {patients.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedPatient && (
          <Box>
            {Object.entries(schedule[selectedPatient]).map(([day, exercises]) => (
              <Accordion
                key={day}
                expanded={expanded === day}
                onChange={handleAccordionChange(day)}
                sx={{ mb: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 500 }}>{day}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {exercises.length === 0 ? (
                    <Typography color="text.secondary" variant="body2">
                      Brak zajęć
                    </Typography>
                  ) : (
                    <List dense disablePadding>
                      {exercises.map((ex, idx) => (
                        <ListItem key={idx} disableGutters>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <AccessTimeIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={ex.specialist}
                            secondary={ex.time}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
