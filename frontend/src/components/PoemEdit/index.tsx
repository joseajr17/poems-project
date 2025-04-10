import { useEffect } from "react";
import { PoemData } from "../interfaces/PoemData";
import { Button } from "../ui/button";
import { api } from "@/services/api";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { generateDays, generateMonths, generateYears } from "../PoemForm/dateUtils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "../schemas/poemFormSchema";


type PoemEditProps = {
    poem: PoemData;
    closeDialog: () => void;
    getPoems?: () => Promise<void>;
};

export function PoemEdit({ poem, closeDialog, getPoems }: PoemEditProps) {

    const days = generateDays();
    const months = generateMonths();
    const years = generateYears(100);

    const { handleSubmit, register, formState, setValue, watch } = useForm<FormData>({
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

    async function getPoem() {
        const response = await api.get(`/api/poem/${poem.id}`);
        const poemData = response.data;

        const poemDate = new Date(poemData.date);

        const day = poemDate.getDate().toString().padStart(2, '0');
        const month = (poemDate.getMonth() + 1).toString().padStart(2, '0');
        const year = poemDate.getFullYear().toString();

        setValue("title", poemData.title);
        setValue("content", poemData.content);
        setValue("poemDate.day", day);
        setValue("poemDate.month", month);
        setValue("poemDate.year", year);
    }

    async function onSubmitPoem(data: FormData) {
        const { day, month, year } = data.poemDate;

        let timestamp: number = 0;

        if (year && month && day) {
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            timestamp = date.getTime();
        }

        const payload = {
            title: data.title,
            content: data.content,
            date: timestamp,
        };

        await api.put(`/api/poem/${poem.id}`, payload);
        getPoems?.();
        closeDialog();
    }

    useEffect(() => {
        getPoem();
    }, []);

    return (
        <div className="flex items-center justify-center w-full text-black">
            <div className="w-full max-w-2xl max-h-[600px] rounded-md bg-white p-2 overflow-y-auto">
                <form
                    className="flex gap-6 flex-col mt-8"
                    onSubmit={handleSubmit(onSubmitPoem)} noValidate
                >

                    <div className="flex flex-col gap-4">

                        <div>
                            <Label>Título</Label>
                            <Input
                                type="text"
                                placeholder="Digite o título do Poema"
                                {...register('title')}
                            />
                            {formState.errors.title?.message && (
                                <span className="text-red-500 text-xs">{formState.errors.title.message}</span>
                            )}
                        </div>

                        <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                                placeholder="Digite o conteúdo do Poema"
                                {...register('content')}
                            />
                            {formState.errors.content?.message && (
                                <span className="text-red-500 text-xs">{formState.errors.content.message}</span>
                            )}
                        </div>

                    </div>

                    <div>
                        <Label>Data em que o poema foi escrito</Label>
                        <div className="grid grid-cols-3 gap-2 items-end pt-0">

                            <div>
                                <Select
                                    value={watch("poemDate.day")}
                                    onValueChange={(value) => {
                                        setValue('poemDate.day', value);
                                    }}
                                >
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
                                <Select
                                    value={watch("poemDate.month")}
                                    onValueChange={(value) => {
                                        setValue('poemDate.month', value);
                                    }}
                                >
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
                                    value={watch("poemDate.year")}
                                    onValueChange={(value) => {
                                        setValue('poemDate.year', value);
                                    }}
                                >
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
                        {formState.errors.poemDate?.message && (
                            <span className="text-red-500 text-xs">{formState.errors.poemDate.message}</span>
                        )}
                        <div className="flex justify-center">
                            <Button
                                type="button"
                                variant="outline"
                                className=" mt-1 text-xs cursor-pointer"
                                onClick={() => {
                                    setValue('poemDate.day', '');
                                    setValue('poemDate.month', '');
                                    setValue('poemDate.year', '');
                                }}
                            >
                                Limpar data
                            </Button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="mt-8 bg-green-500 hover:bg-green-500/90 cursor-pointer"
                    >
                        Salvar alterações
                    </Button>

                </form>
            </div>
        </div>
    );
}