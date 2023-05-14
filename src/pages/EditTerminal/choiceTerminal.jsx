import { useHistory } from "react-router-dom";
import ChoiceTerminal from "../../components/ChoiceTerminal";

export default function ChoiceTerminalEdit() {
  const history = useHistory();

  const onChoosing = (terminal) => {
    history.push(`/edit-terminal/${terminal.id}`);
  };

  return (
    <ChoiceTerminal
      title="Selecione o Totem que deseja editar"
      onChoosing={onChoosing}
    />
  );
}
