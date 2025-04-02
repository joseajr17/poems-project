import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "O título não pode ser vazio.",
    }),
    content: z.string().min(1, {
        message: "O conteúdo não pode ser vazio.",
    }),
    poemDate: z.object({
        day: z.string().optional(),
        month: z.string().optional(),
        year: z.string().optional(),
    })
})

type FormData = z.infer<typeof formSchema>;

const generateDays = () => Array.from({ length: 31 }, (_, i) => (i + 1).toString());

const generateMonths = () => [
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

const generateYears = (numYears: number) => {
    const anoAtual = new Date().getFullYear();
    return Array.from({ length: numYears }, (_, i) => (anoAtual - i).toString());
};

export function PoemForm() {

    const { handleSubmit, register, formState, setValue } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const days = generateDays();
    const months = generateMonths();
    const years = generateYears(100);



    function onSubmit(data: FormData) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(data)
    }

    return (
        <div className="flex items-center justify-center h-screen w-full text-black ">
            <div className="w-full max-w-2xl max-h-[600px] rounded-md shadow bg-white p-8 overflow-y-auto">
                <h1 className="text-xl font-bold text-center">Cadastro de Poemas</h1>
                <form
                    className="flex gap-6 flex-col mt-8"
                    onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-4">

                        <div>
                            <Label>Título</Label>
                            <Input
                                type="text"
                                {...register('title')}
                            />
                            {formState.errors.title?.message && <span className="text-red-500 text-xs">{formState.errors.title?.message}</span>}
                        </div>
                        <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                                {...register('content')}
                            />
                            {formState.errors.content?.message && <span className="text-red-500 text-xs">{formState.errors.content?.message}</span>}
                        </div>

                    </div>

                    <div>
                        <Label className="">Data em que o poema foi escrito</Label>
                        <div className="grid grid-cols-3 gap-4 items-end pt-0">

                            <div>
                                <Select onValueChange={(value) => setValue('poemDate.day', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Dia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {days.map((day) => (
                                            <SelectItem key={day} value={day.toString()}>
                                                {day}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formState.errors.poemDate?.day?.message && <span className="text-red-500 text-xs">{formState.errors.poemDate?.day?.message}</span>}
                            </div>

                            <div>
                                <Select onValueChange={(value) => setValue('poemDate.month', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Mês" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map((month) => (
                                            <SelectItem key={month.value} value={month.value}>
                                                {month.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formState.errors.poemDate?.month?.message && <span className="text-red-500 text-xs">{formState.errors.poemDate?.month?.message}</span>}
                            </div>

                            <div>
                                <Select onValueChange={(value) => setValue('poemDate.year', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Ano" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formState.errors.poemDate?.year?.message && <span className="text-red-500 text-xs">{formState.errors.poemDate?.year?.message}</span>}
                            </div>

                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="mt-8"
                    >Salvar novo poema</Button>
                </form>
            </div>
        </div>
    )
}