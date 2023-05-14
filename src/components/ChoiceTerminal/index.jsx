import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";

import {
  Search
} from "@mui/icons-material";

import api from "../../services/api";
import React, { useEffect, useState } from "react";
import TableTerminals from "./TableTerminals";

const classes = {
  cardRoot: {
    margin: 20
  }
};

export default function ChoiceTerminal({ onChoosing, useFilter = true, title }) {

  const [searchValue, setSearchValue] = useState('');
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    let filter = {
      order: 'name',
      where: {role: "Cliente"}
    };


    api.get(`/clients?filter=${JSON.stringify(filter)}`).then((response) => {
      setTerminals(response.data);
    })
  }, []);

  const getOnlyNumbers = (value) => {
    return value.replace(/[^\d,]/g, '');
  }

  function loadTerminals() {
    let filter = {
      order: 'name',
      where: {role: "Cliente"},
    };

    const searchValueOnlyNumbers = getOnlyNumbers(searchValue);

    if (searchValueOnlyNumbers) {
      filter.where = {
        ...filter.where,
        or: [
          { name: { like: `.*${searchValue}.*`, options: 'i' } },
        ]
      };

    } else {//Se for um nome
      filter.where = {
        ...filter.where,
        name: { like: `.*${searchValue.trim()}.*`, options: 'i' }
      };
    }

    api.get(`/clients?filter=${JSON.stringify(filter)}`).then((response) => {
      setTerminals(response.data);
    })
  }

  const handleChangeSearch = (e) => {
    const newValue = e.target.value;

    setSearchValue(newValue);

    if (!newValue) {
      api.get(`/clients`).then((response) => {
        setTerminals(response.data);
      })
    }
  }

  const filter = () => (
    <Grid container justifyContent='center' spacing={2} style={{ marginBottom: 30 }}>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <TextField
          size='small'
          label='Totem'
          required
          fullWidth
          value={searchValue}
          onChange={handleChangeSearch}
        />
      </Grid>

      <Grid item xs={12} sm={2} md={2} lg={2}>
        <Button
          variant='outlined'
          fullWidth
          size='small'
          style={{ backgroundColor: '#AA4A44', color: 'white', height: 40 }}
          onClick={() => loadTerminals()}
        >
          <Search />
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Card style={classes.cardRoot}>
      <CardContent style={{ margin: 20 }}>

        <Typography variant='h5' align='center' style={{ fontWeight: 'bold', marginBottom: 30 }}>
          {title}
        </Typography>

        {useFilter ? filter() : false}

        <TableTerminals handleClickRow={onChoosing} terminals={terminals} />

      </CardContent>
    </Card >
  );
}