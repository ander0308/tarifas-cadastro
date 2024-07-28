import { FormControlLabel, Switch } from "@mui/material";
import { type Control, Controller } from "react-hook-form";
import type { FormTarifasType } from "./types";

type SwitchSessionProps = {
  control: Control<FormTarifasType, any>;
  handlePermiteAutoContratacao: () => void;
  handlePermiteEmissao: () => void;
  handlePermiteLiquidacao: () => void;
};

export const SwitchSession = ({
  control,
  handlePermiteAutoContratacao,
  handlePermiteEmissao,
  handlePermiteLiquidacao,
}: SwitchSessionProps) => {
  return (
    <>
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
    </>
  );
};
