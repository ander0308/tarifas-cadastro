import type { ValidationRule } from "react-hook-form";

export type FormTarifasType = {
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

export type FormularioValidateProps = {
  min?: {
    value: string | number;
    message: string;
  };
  max?: {
    value: string | number;
    message: string;
  };
};

export type FormularioReturnProps = {
  required?: string;
  min?: ValidationRule<string | number> | undefined;
  max?: ValidationRule<string | number> | undefined;
};
