import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { FormTarifasType } from "./types";
import { TarifasEmissaoSession } from "./TarifasEmissaoSession";
import { SwitchSession } from "./SwitchSession";
import { TarifasLiquidacaoSession } from "./TarifasLiquidacaoSession";

function Tarifas() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormTarifasType>({ mode: "onChange" });

  const navigate = useNavigate();

  const cadastrarTarifas = (values: FormTarifasType) => {
    console.log(values);
    sessionStorage.setItem("tarifas", JSON.stringify(values));
  };

  const watchPermiteEmissao = watch("permiteEmissao");
  const watchPermiteLiquidacao = watch("permiteLiquidacao");
  const watchPermiteAutoContratacao = watch("permiteAutoContratacao");

  const switchsEmissaoELiquidacaoDesligados = () => {
    return !watchPermiteEmissao && !watchPermiteLiquidacao;
  };

  const handleZerarTarifas = () => {
    setValue("emissaoPix", 0);
    setValue("emissaoBoleto", 0);
    setValue("emissaoCredito", 0);
    setValue("liquidacaoPix", 0);
    setValue("liquidacaoBoleto", 0);
  };

  const handlePermiteAutoContratacao = () => {
    if (!watchPermiteAutoContratacao) {
      setValue("permiteAutoContratacao", true);
      setValue("permiteEmissao", false);
      setValue("permiteLiquidacao", false);

      setValue("emissaoPix", 12, { shouldValidate: true });
      setValue("emissaoBoleto", 9, { shouldValidate: true });
      setValue("emissaoCredito", 23, { shouldValidate: true });
      setValue("liquidacaoPix", 1.99, { shouldValidate: true });
      setValue("liquidacaoBoleto", 5.23, { shouldValidate: true });
    } else {
      setValue("permiteAutoContratacao", false);
      handleZerarTarifas();
    }
  };

  const handlePermiteEmissao = () => {
    if (!watchPermiteEmissao) {
      setValue("permiteEmissao", true);
      setValue("permiteAutoContratacao", false);
      setValue("permiteLiquidacao", false);

      // setValue("emissaoPix", 12, { shouldValidate: true });
      // setValue("emissaoBoleto", 9, { shouldValidate: true });
      // setValue("emissaoCredito", 20, { shouldValidate: true });
      setValue("liquidacaoPix", 0, { shouldValidate: true });
      setValue("liquidacaoBoleto", 0, { shouldValidate: true });
    } else {
      setValue("permiteEmissao", false);
      handleZerarTarifas();
    }
  };

  const handlePermiteLiquidacao = () => {
    if (!watchPermiteLiquidacao) {
      setValue("permiteLiquidacao", true);
      setValue("permiteAutoContratacao", false);
      setValue("permiteEmissao", false);

      setValue("emissaoPix", 0, { shouldValidate: true });
      setValue("emissaoBoleto", 0, { shouldValidate: true });

      if (!watchPermiteEmissao && watchPermiteLiquidacao) {
        setValue("emissaoCredito", 0);
      }
    } else {
      setValue("permiteLiquidacao", false);
      handleZerarTarifas();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(cadastrarTarifas)}
        style={{ maxWidth: "400px" }}
      >
        <Typography variant="h3">Tarifas</Typography>
        <br />

        {/* Inicio sessão switch */}
        <SwitchSession
          {...{
            control,
            handlePermiteAutoContratacao,
            handlePermiteEmissao,
            handlePermiteLiquidacao,
          }}
        />
        {/* Inicio sessão switch */}

        {/* Inicio sessão tarifas emissão */}
        <TarifasEmissaoSession
          {...{
            control,
            watchPermiteEmissao,
            errors,
            watchPermiteAutoContratacao,
            switchsEmissaoELiquidacaoDesligados,
          }}
        />
        {/* Final sessão tarifas emissão */}

        {/* Inicio sessão tarifas liquidação */}
        <TarifasLiquidacaoSession
          {...{
            control,
            errors,
            watchPermiteAutoContratacao,
            watchPermiteEmissao,
            watchPermiteLiquidacao,
            switchsEmissaoELiquidacaoDesligados,
          }}
        />
        {/* Final sessão tarifas liquidação */}

        <Button variant="contained" size="large" type="submit" fullWidth>
          Cadastrar
        </Button>
        <DevTool control={control} />
      </form>

      <br />
      <Button variant="text" onClick={() => navigate("/busca")}>
        Voltar
      </Button>
    </>
  );
}
export default Tarifas;
