const useCustomTarifas = (type: string, field: string) => {
  const { data: {tarifas = {}} } = JSON.parse(
    sessionStorage.getItem("tarifas.data") || "{}"
  );

  if (!tarifas) return {};

  if(!tarifas[type]) return {};

  if(!tarifas[type][field]) return {};

  const customTarifas = tarifas[type][field];

  return {
    min: {
      value: customTarifas.minima,
      message: `O Valor não pode ser menor do que ${customTarifas.minima}`,
    },
    max: {
      value: customTarifas.maxima,
      message: `O Valor não pode ser maior do que ${customTarifas.maxima}`,
    },
  }
};

export default useCustomTarifas;
