import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";

import {
  Search, Send
} from "@mui/icons-material";

import api from "../../services/api";
import React, { useEffect, useState } from "react";
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';

const classes = {
  cardRoot: {
    margin: 20
  }
};

export default function ChoicePatient({ onChoosing, useFilter = true, title, onlyDischargedPatient, onlyActivePatients }) {

  const [searchValue, setSearchValue] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    let filter = {
      order: 'name',
      where: {}
    };

    if (onlyDischargedPatient) {
      filter.where = {
        dischargedFromHospital: { neq: null }
      };
    }

    api.get(`/patients?filter=${JSON.stringify(filter)}`).then((response) => {
      setPatients(response.data);
    })
  }, [onlyDischargedPatient]);

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;

    setSearchValue(newValue);

    if (!newValue) {
      api.get(`/patients`).then((response) => {
        setPatients(response.data);
      })
    }
  }

  return (
    <Card style={classes.cardRoot}>
      <CardContent style={{ margin: 20 }}>

        <Typography variant='h5' align='center' style={{ fontWeight: 'bold', marginBottom: 30 }}>
          {title}
        </Typography>

        <ChatMsg
            messages={[
              'Hi Jenny, How r u today?',
              'Did you train yesterday',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
              'Já era',
            ]}
        />
        <ChatMsg
            side={'right'}
            messages={[
              "Great! What's about you?",
              'Of course I did. Speaking of which check this out',
              'Caiu no meu papin',
            ]}
        />
        <ChatMsg
            messages={['Im good.', 'See u later.']} />

        <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30, marginTop: 30 }}>
          <Grid item xs={12} sm={10} md={10} lg={10}>
            <TextField
                size='small'
                label='Digite aqui'
                fullWidth
                value={searchValue}
                onChange={handleChangeSearch}
            />
          </Grid>

          <Grid item xs={6} sm={2} md={2} lg={2}>
            <Button
                variant='outlined'
                fullWidth
                size='small'
                style={{ backgroundColor: '#1B98E0', color: 'white', height: 40 }}
                onClick={() => loadPatients()}
            >
              <Send />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
}