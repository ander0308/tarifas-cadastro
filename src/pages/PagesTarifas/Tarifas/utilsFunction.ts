import type { FormularioReturnProps, FormularioValidateProps } from "./types";

export const getValidationRules = (
  watchPermiteAutoContratacao: boolean,
  tarifaCustom: FormularioValidateProps
): FormularioReturnProps => {

  let rules: FormularioReturnProps = {
    required: "O campo é obrigatório",
    min: {
      value: tarifaCustom?.min?.value || 0,
      message: tarifaCustom?.min?.message || "Msg Padrão",
    },
    max: {
      value: tarifaCustom?.max?.value || 0,
      message: tarifaCustom?.max?.message || "Msg Padrão",
    },
  }

  if (watchPermiteAutoContratacao) {
    rules =  {
      required: "O campo é obrigatório",
    };
  }

  return rules;
};
