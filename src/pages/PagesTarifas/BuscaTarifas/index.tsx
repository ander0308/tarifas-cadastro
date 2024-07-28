import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BuscaTarifas() {

  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h3">Buscar tarifas</Typography>
      <br />
      <Typography variant="body1" style={{marginBottom: "10px"}}>
        Clique no botão para fazer a requisição.
      </Typography>
      <Button variant="contained">Buscar tarifas</Button>
      <br />
      <br />
      <div>
        <Button variant="text" onClick={() => navigate("/tarifas")}>Avançar</Button>
      </div>
    </>
  );
}

export default BuscaTarifas;
