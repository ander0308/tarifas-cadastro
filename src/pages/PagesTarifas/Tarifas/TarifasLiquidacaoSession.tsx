import { Box, TextField, Typography } from "@mui/material";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { FormTarifasType } from "./types";
import useCustomTarifas from "../../../hooks/useCustomTarifas";
import { getValidationRules } from "./utilsFunction";

type TarifasLiquidacaoSessionProps = {
  watchPermiteEmissao: boolean;
  watchPermiteLiquidacao: boolean;
  switchsEmissaoELiquidacaoDesligados: () => boolean;
  control: Control<FormTarifasType, any>;
  errors: FieldErrors<FormTarifasType>;
  watchPermiteAutoContratacao: boolean;
};

export const TarifasLiquidacaoSession = ({
  control,
  errors,
  watchPermiteAutoContratacao,
  watchPermiteEmissao,
  watchPermiteLiquidacao,
  switchsEmissaoELiquidacaoDesligados,
}: TarifasLiquidacaoSessionProps) => {

  const keyLiquidacao = watchPermiteLiquidacao
    ? "tarifasSomenteLiquidacao"
    : "tarifasLiquidacao";

  const liquidacaoPixCustom = useCustomTarifas(keyLiquidacao, "liquidacaoPix");
  const liquidacaoBoletoCustom = useCustomTarifas(
    keyLiquidacao,
    "liquidacaoBoleto"
  );
  const emissaoCreditoCustom = useCustomTarifas(
    "tarifasEmissao",
    "emissaoCredito"
  );

  if (!watchPermiteLiquidacao && !switchsEmissaoELiquidacaoDesligados()) {
    return <br />;
  }

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Typography variant="h5">Tarifas de Liquidação</Typography>
      <Controller
        control={control}
        name="liquidacaoPix"
        defaultValue={0}
        rules={getValidationRules(
          watchPermiteAutoContratacao,
          liquidacaoPixCustom
        )}
        render={({ field: { name, onChange, value } }) => (
          <TextField
            placeholder="Tarifa Liquidação Pix"
            type="number"
            size="small"
            fullWidth
            disabled={watchPermiteAutoContratacao}
            name={name}
            value={value}
            onChange={onChange}
            error={!!errors.liquidacaoPix}
            helperText={errors.liquidacaoPix?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="liquidacaoBoleto"
        defaultValue={0}
        rules={getValidationRules(watchPermiteAutoContratacao, liquidacaoBoletoCustom)}
        render={({ field: { name, onChange, value } }) => (
          <TextField
            placeholder="Tarifa Liquidação Boleto"
            type="number"
            size="small"
            fullWidth
            disabled={watchPermiteAutoContratacao}
            name={name}
            value={value}
            onChange={onChange}
            error={!!errors.liquidacaoBoleto}
            helperText={errors.liquidacaoBoleto?.message}
          />
        )}
      />
      {!watchPermiteEmissao && watchPermiteLiquidacao && (
        <Controller
          control={control}
          name="emissaoCredito"
          defaultValue={0}
          rules={getValidationRules(
            watchPermiteAutoContratacao,
            emissaoCreditoCustom
          )}
          render={({ field: { name, onChange, value } }) => (
            <TextField
              placeholder="Tarifa Emissão Crédito"
              size="small"
              type="number"
              fullWidth
              disabled={watchPermiteAutoContratacao}
              name={name}
              value={value}
              // value={value ?? 0} // essa forma resolve o problema de erro no console.
              onChange={onChange}
              error={!!errors.emissaoCredito}
              helperText={errors.emissaoCredito?.message}
            />
          )}
        />
      )}
      <br />
    </Box>
  );
};
