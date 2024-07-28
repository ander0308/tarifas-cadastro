import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

type FormType = {
  emissaoPix: number;
  emissaoBoleto: number;
  emissaoCredito: number;
  liquidacaoPix: number;
  liquidacaoBoleto: number;
  permiteEmissao: boolean;
  permiteLiquidacao: boolean;
  permiteEmissaoELiquidacao: boolean;
  permiteAutoContratacao: boolean;
};

function Tarifas() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>({ mode: "onChange" });

  const cadastrarTarifas = (values: FormType) => {
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

      setValue("emissaoPix", 12, { shouldValidate: true });
      setValue("emissaoBoleto", 9, { shouldValidate: true });
      setValue("emissaoCredito", 20, { shouldValidate: true });
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
      } else {
        setValue("emissaoCredito", 4);
      }

      setValue("liquidacaoPix", 4, { shouldValidate: true });
      setValue("liquidacaoBoleto", 10, { shouldValidate: true });
    } else {
      setValue("permiteLiquidacao", false);
      handleZerarTarifas();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(cadastrarTarifas)}
      style={{ maxWidth: "400px" }}
    >
      <Typography variant="h3">Tarifas</Typography>
      <br />

      {/* Inicio sessão switchs */}
      <Controller
        control={control}
        name="permiteAutoContratacao"
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  field.onChange;
                  handlePermiteAutoContratacao();
                }}
                checked={field.value}
              />
            }
            label="Permite auto contratacao"
          />
        )}
      />
      <Controller
        control={control}
        name="permiteEmissao"
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  field.onChange;
                  handlePermiteEmissao();
                }}
                checked={field.value}
              />
            }
            label="Permite somente emissão"
          />
        )}
      />
      <Controller
        control={control}
        name="permiteLiquidacao"
        defaultValue={false}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  field.onChange;
                  handlePermiteLiquidacao();
                }}
                checked={field.value}
              />
            }
            label="Permite somente liquidação"
          />
        )}
      />
      <br />
   {/* Final sessão switchs */}

   {/* Inicio sessão tarifas emissão */}
      <br />
      {(watchPermiteEmissao || switchsEmissaoELiquidacaoDesligados()) && (
        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h5">Tarifas de Emissão</Typography>
          <Controller
            control={control}
            defaultValue={0}
            name="emissaoPix"
            rules={{
              required: "O campo é obrigatório",
              min: {
                value: 1.56,
                message: "O Valor não pode ser maior do que 1.56",
              },
              max: {
                value: 20,
                message: "O Valor não pode ser maior do que 20",
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
                value: 1.21,
                message: "O Valor não pode ser maior do que 1.21",
              },
              max: {
                value: 10,
                message: "O Valor não pode ser maior do que 10",
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
                value: 3,
                message: "O Valor não pode ser maior do que 3",
              },
              max: {
                value: 30,
                message: "O Valor não pode ser maior do que 30",
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
      )}
   {/* Final sessão tarifas emissão */}

   {/* Inicio sessão tarifas liquidação */}
      {(watchPermiteLiquidacao || switchsEmissaoELiquidacaoDesligados()) && (
        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h5">Tarifas de Liquidação</Typography>
          <Controller
            control={control}
            name="liquidacaoPix"
            defaultValue={0}
            rules={{
              required: "O campo é obrigatório",
              min: {
                value: 1.67,
                message: "O Valor não pode ser maior do que 1.67",
              },
              max: {
                value: 20,
                message: "O Valor não pode ser maior do que 20",
              },
            }}
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
            rules={{
              required: "O campo é obrigatório",
              min: {
                value: 1.56,
                message: "O Valor não pode ser maior do que 1.56",
              },
              max: {
                value: 10,
                message: "O Valor não pode ser maior do que 10",
              },
            }}
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
              rules={{
                required: "O campo é obrigatório",
                min: {
                  value: 3,
                  message: "O Valor não pode ser maior do que 3",
                },
                max: {
                  value: 30,
                  message: "O Valor não pode ser maior do que 30",
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
      )}
   {/* Final sessão tarifas liquidação */}

      <Button
        variant="contained"
        style={{ height: "54px" }}
        size="large"
        type="submit"
        fullWidth
      >
        Cadastrar
      </Button>
      <DevTool control={control} />
    </form>
  );
}
export default Tarifas;
