import { Box, TextField, Typography } from "@mui/material";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { FormTarifasType } from "./types";
import type { getValidationRules } from "./utilsFunction";

type TarifasEmissaoSessionProps = {
  watchPermiteEmissao: boolean;
  switchsEmissaoELiquidacaoDesligados: () => boolean;
  control: Control<FormTarifasType, any>;
  errors: FieldErrors<FormTarifasType>;
  watchPermiteAutoContratacao: boolean;
  emissaoPixRules: ReturnType<typeof getValidationRules>;
  emissaoBoletoRules: ReturnType<typeof getValidationRules>;
  emissaoCreditoRules: ReturnType<typeof getValidationRules>;
};

export const TarifasEmissaoSession = ({
  watchPermiteEmissao,
  switchsEmissaoELiquidacaoDesligados,
  control,
  errors,
  watchPermiteAutoContratacao,
  emissaoPixRules,
  emissaoBoletoRules,
  emissaoCreditoRules,
}: TarifasEmissaoSessionProps) => {


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
          rules={emissaoPixRules}
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
          rules={emissaoBoletoRules}
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
          rules={emissaoCreditoRules}
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
