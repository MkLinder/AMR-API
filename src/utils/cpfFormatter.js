const formatCpf = (cpf) => {
  const formattedCpf = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  );

  return formattedCpf;
};

module.exports = formatCpf;
