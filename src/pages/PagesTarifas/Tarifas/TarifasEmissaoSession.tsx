import { Box, TextField, Typography } from "@mui/material";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { FormTarifasType } from "./types";
import useCustomTarifas from "../../../hooks/useCustomTarifas";

type TarifasEmissaoSessionProps = {
  watchPermiteEmissao: boolean;
  switchsEmissaoELiquidacaoDesligados: () => boolean;
  control: Control<FormTarifasType, any>;
  errors: FieldErrors<FormTarifasType>;
  watchPermiteAutoContratacao: boolean;
};

export const TarifasEmissaoSession = ({
  watchPermiteEmissao,
  switchsEmissaoELiquidacaoDesligados,
  control,
  errors,
  watchPermiteAutoContratacao,
}: TarifasEmissaoSessionProps) => {


  const keyEmissao = watchPermiteEmissao ? "tarifasSomenteEmissao" : "tarifasEmissao"


  const emissaoPixCustom = useCustomTarifas(keyEmissao, "emissaoPix")
  const emissaoBoletoCustom = useCustomTarifas(keyEmissao, "emissaoBoleto")
  const emissaoCreditoCustom = useCustomTarifas(keyEmissao, "emissaoCredito")


  if (!watchPermiteEmissao && !switchsEmissaoELiquidacaoDesligados()) {
    return <br />;
  }


  return (
    <>
      <br />
      <Box display="flex" gap={2} flexDirection="column">
        <Typography variant="h5">Tarifas de Emissão</Typography>
        <Controller
          control={control}
          defaultValue={0}
          name="emissaoPix"
          rules={{
            required: "O campo é obrigatório",
            min: {
              value: emissaoPixCustom.min?.value,
              message: emissaoPixCustom.min?.message || "Msg padrão",
            },
            max: {
              value: emissaoPixCustom.max?.value,
              message: emissaoPixCustom.max?.message || "Msg padrão",
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <TextField
              placeholder="Tarifa Emissão Pix"
              size="small"
              type="number"
              fullWidth
              disabled={watchPermiteAutoContratacao}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              error={!!errors.emissaoPix}
              helperText={errors.emissaoPix?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="emissaoBoleto"
          defaultValue={0}
          rules={{
            required: "O campo é obrigatório",
            min: {
              value: emissaoBoletoCustom.min?.value,
              message: emissaoBoletoCustom.min?.message || "Msg padrão",
            },
            max: {
              value: emissaoBoletoCustom.max?.value,
              message: emissaoBoletoCustom.max?.message || "Msg padrão",
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <TextField
              placeholder="Tarifa Emissão Boleto"
              size="small"
              type="number"
              fullWidth
              disabled={watchPermiteAutoContratacao}
              name={name}
              value={value}
              onChange={onChange}
              error={!!errors.emissaoBoleto}
              helperText={errors.emissaoBoleto?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="emissaoCredito"
          defaultValue={0}
          rules={{
            required: "O campo é obrigatório",
            min: {
              value: emissaoCreditoCustom.min?.value,
              message: emissaoCreditoCustom.min?.message || "Msg padrão",
            },
            max: {
              value: emissaoCreditoCustom.max?.value,
              message: emissaoCreditoCustom.max?.message || "Msg padrão",
            },
          }}
          render={({ field: { name, onChange, value } }) => (
            <TextField
              placeholder="Tarifa Emissão Crédito"
              size="small"
              type="number"
              fullWidth
              disabled={watchPermiteAutoContratacao}
              name={name}
              value={value}
              onChange={onChange}
              error={!!errors.emissaoCredito}
              helperText={errors.emissaoCredito?.message}
            />
          )}
        />
        <br />
      </Box>
    </>
  );
};
