import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomTarifas from "../../../hooks/useCustomTarifas";
import { SwitchSession } from "./SwitchSession";
import { TarifasEmissaoSession } from "./TarifasEmissaoSession";
import { TarifasLiquidacaoSession } from "./TarifasLiquidacaoSession";
import type { FormTarifasType, FormularioValidateProps } from "./types";

function Tarifas() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormTarifasType>({ mode: "onChange" });

  const navigate = useNavigate();

  const cadastrarTarifas = (values: FormTarifasType) => {
    const formattedValues = {
      ...values,
      emissaoPix: Number(values.emissaoPix),
      emissaoBoleto: Number(values.emissaoBoleto),
      emissaoCredito: Number(values.emissaoCredito),
      liquidacaoPix: Number(values.liquidacaoPix),
      liquidacaoBoleto: Number(values.liquidacaoBoleto),
    }
    console.log(values);
    console.log(formattedValues);
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

  useEffect(() => {
    if (
      watchPermiteAutoContratacao !== undefined ||
      watchPermiteEmissao !== undefined ||
      watchPermiteLiquidacao !== undefined
    ) {
      trigger();
    }
  }, [
    trigger,
    watchPermiteAutoContratacao,
    watchPermiteEmissao,
    watchPermiteLiquidacao,
  ]);

  // ------ INICIO Vars de sessão liquidacao
  const keyLiquidacao = watchPermiteLiquidacao
    ? "tarifasSomenteLiquidacao"
    : "tarifasLiquidacao";

  const liquidacaoPixCustom = useCustomTarifas(keyLiquidacao, "liquidacaoPix");
  const liquidacaoBoletoCustom = useCustomTarifas(
    keyLiquidacao,
    "liquidacaoBoleto"
  );
  const liquidacaoEmissaoCreditoCustom = useCustomTarifas(
    keyLiquidacao,
    "emissaoCredito"
  );

  const liquidacaoPixRules = getRules(liquidacaoPixCustom);
  const liquidacaoBoletoRules = getRules(liquidacaoBoletoCustom);
  const liquidacaoEmissaoCreditoRules = getRules(liquidacaoEmissaoCreditoCustom);
  // ------ FIM Vars de sessão liquidacao

  // ------ INICIO Vars de sessão emissao
  const keyEmissao = watchPermiteEmissao
    ? "tarifasSomenteEmissao"
    : "tarifasEmissao";

  const emissaoPixCustom = useCustomTarifas(keyEmissao, "emissaoPix");
  const emissaoBoletoCustom = useCustomTarifas(keyEmissao, "emissaoBoleto");
  const emissaoCreditoCustom = useCustomTarifas(keyEmissao, "emissaoCredito");

  const emissaoPixRules = getRules(emissaoPixCustom);
  const emissaoBoletoRules = getRules(emissaoBoletoCustom);
  const emissaoCreditoRules = getRules(emissaoCreditoCustom);
  // ------ FIM Vars de sessão emissao

  function getRules(tarifaCustom: FormularioValidateProps) {
    const MAX_VALUE = 9999999;
    const MIN_VALUE = 0;

    return {
      required: "O campo é obrigatório",
      min: watchPermiteAutoContratacao
        ? MIN_VALUE
        : {
            value: tarifaCustom?.min?.value || MIN_VALUE,
            message: tarifaCustom?.min?.message || "Msg Padrão",
          },
      max: watchPermiteAutoContratacao
        ? MAX_VALUE
        : {
            value: tarifaCustom?.max?.value || MAX_VALUE,
            message: tarifaCustom?.max?.message || "Msg Padrão",
          },
    };
  }

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
            emissaoPixRules,
            emissaoBoletoRules,
            emissaoCreditoRules,
          }}
        />
        {/* Final sessão tarifas emissão */}

        {/* Inicio sessão tarifas liquidação */}
        <TarifasLiquidacaoSession
          {...{
            control,
            errors,
            watchPermiteLiquidacao,
            switchsEmissaoELiquidacaoDesligados,
            liquidacaoPixRules,
            watchPermiteAutoContratacao,
            liquidacaoBoletoRules,
            watchPermiteEmissao,
            liquidacaoEmissaoCreditoRules,
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
