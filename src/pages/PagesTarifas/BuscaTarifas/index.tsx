import { Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BuscaTarifas() {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3002";

  const [dataTarifas, setDataTarifas] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const getDataTarifas = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(`${BASE_URL}/data-tarifas`);
      setDataTarifas(response);
      sessionStorage.setItem("tarifas.data", JSON.stringify(response));
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const nextTarifas = () => {
    if (!dataTarifas) return;
    navigate("/tarifas");
  };

  return (
    <>
      <Typography variant="h3">Buscar tarifas</Typography>
      <br />
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        Clique no botão para fazer a requisição.
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" onClick={getDataTarifas}>
            Buscar tarifas
          </Button>
        </>
      )}

      <br />
      <br />
      <div>
        <Button variant="text" onClick={nextTarifas}>
          Avançar
        </Button>
      </div>
    </>
  );
}

export default BuscaTarifas;
