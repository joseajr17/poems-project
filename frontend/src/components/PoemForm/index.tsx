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
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDays, generateMonths, generateYears } from "./dateUtils";
import { formSchema, FormData } from "../schemas/poemFormSchema";
import { api } from '../../services/api';
import { useState } from "react";

type PoemFormProps = {
    getPoems: () => Promise<void>;
};

export function PoemForm({ getPoems }: PoemFormProps) {

    const { handleSubmit, register, formState, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            poemDate: {
                day: "",
                month: "",
                year: "",
            },
        },
    });

    const [day, setDay] = useState<string | undefined>();
    const [month, setMonth] = useState<string | undefined>();
    const [year, setYear] = useState<string | undefined>();


    const days = generateDays();
    const months = generateMonths();
    const years = generateYears(100);

    async function onSubmitPoem(data: FormData) {
        const { day, month, year } = data.poemDate;

        let timestamp: number;
        if (year && month && day) {
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            timestamp = date.getTime();
        } else {
            timestamp = new Date().getTime();
        }

        const payload = {
            title: data.title,
            author: "Severino Cavalcanti de Albuquerque",
            content: data.content,
            date: timestamp,
        };

        try {
            await api.post("http://localhost:8080/api/poem", payload);
            getPoems();
            reset();
            setDay(undefined);
            setMonth(undefined);
            setYear(undefined);
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

        console.log(payload);
    }

    return (
        <section className="flex items-center justify-center h-screen w-full text-black ">
            <div className="w-full max-w-2xl max-h-[600px] rounded-md border-gray-300 border shadow bg-white p-8 overflow-y-auto">
                <h1 className="text-xl font-bold text-center">Cadastro de Poemas</h1>
                <form
                    className="flex gap-6 flex-col mt-8"
                    onSubmit={handleSubmit(onSubmitPoem)} noValidate >
                    <div className="flex flex-col gap-4">

                        <div>
                            <Label>Título</Label>
                            <Input
                                type="text"
                                placeholder="Digite o título do Poema"
                                {...register('title')}
                            />
                            {formState.errors.title?.message && <span className="text-red-500 text-xs">{formState.errors.title?.message}</span>}
                        </div>
                        <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                                placeholder="Digite o conteúdo do Poema"
                                {...register('content')}
                            />
                            {formState.errors.content?.message && <span className="text-red-500 text-xs">{formState.errors.content?.message}</span>}
                        </div>

                    </div>

                    <div>
                        <Label className="">Data em que o poema foi escrito</Label>
                        <div className="grid grid-cols-3 gap-4 items-end pt-0">

                            <div>
                                <Select value={day || ""} onValueChange={(value) => setDay(value)}>
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
                                <Select value={month || ""} onValueChange={(value) => setMonth(value)}>
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
                                <Select
                                    value={year || ""}
                                    onValueChange={(value) => setYear(value)}>
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
                        className="mt-8 bg-green-500 hover:bg-green-500/90 cursor-pointer"
                    >Salvar novo poema</Button>
                </form>
            </div>
        </section>
    )
}