import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemText, ListItem } from "@mui/material";
import { useHistory } from "react-router-dom";

const classes = {
  nested: {
    paddingLeft: 32,
    color: "#000",
  },
  cor: {
    color: "#000",
  },
};

export default function ListItems({ handleDrawerClose, isMobile }) {
  const history = useHistory();
  const [isOpenToten, setIsOpenToten] = useState(false);
  const [isOpenEmployee, setIsOpenEmployee] = useState(false);

  function ListItemLink({ href, ...props }) {
    return (
        <ListItem
            onClick={() => {
              history.push(href);
              isMobile && handleDrawerClose();
            }}
            component="button"
            {...props}
        />
    );
  }

  const handleClickToten = () => setIsOpenToten((prev) => !prev);
  const handleClickEmployee = () => setIsOpenEmployee((prev) => !prev);

  return (
      <div>
        <>
          <ListItem button onClick={handleClickToten}>
            <ListItemText primary="Totem" style={classes.cor} />
            {isOpenToten ? <ExpandLess /> : <ExpandMore />}
          </ListItem>


          <Collapse in={isOpenToten} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink button href="/registerterminal" style={classes.nested}>
                <ListItemText primary="Cadastro" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-terminal-edit"
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-raspberry-reports"
                  style={classes.nested}
              >
                <ListItemText primary="Excluir" />
              </ListItemLink>
            </List>
          </Collapse>
        </>

        <>
          <ListItem button onClick={handleClickEmployee}>
            <ListItemText primary="Funcionário" style={classes.cor} />
            {isOpenEmployee ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenEmployee} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemLink
                  button href="/registermodule" // TODO: Mudar rota para cadastro
                  style={classes.nested}>
                <ListItemText primary="Cadastro" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-raspberry-edit" // TODO: Mudar rota para edição
                  style={classes.nested}
              >
                <ListItemText primary="Editar" />
              </ListItemLink>

              <ListItemLink
                  button
                  href="/choice-module-monitoring" // TODO: Mudar rota para excluir
                  style={classes.nested}
              >
                <ListItemText primary="Excluir" />
              </ListItemLink>
            </List>
          </Collapse>
        </>
      </div>
  );
}
