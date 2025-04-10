export const generateDays = () => Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

export const generateMonths = () => [
    { name: "Janeiro", value: "01" },
    { name: "Fevereiro", value: "02" },
    { name: "Março", value: "03" },
    { name: "Abril", value: "04" },
    { name: "Maio", value: "05" },
    { name: "Junho", value: "06" },
    { name: "Julho", value: "07" },
    { name: "Agosto", value: "08" },
    { name: "Setembro", value: "09" },
    { name: "Outubro", value: "10" },
    { name: "Novembro", value: "11" },
    { name: "Dezembro", value: "12" },
];

export const generateYears = (numYears: number) => {
    const anoAtual = new Date().getFullYear();
    return Array.from({ length: numYears }, (_, i) => (anoAtual - i).toString());
};