import { useState } from "react";
import { Button } from "../ui/button";

interface FilterMenuProps {
    closeDialog: () => void;
}

interface FilterMenuProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    closeDialog: () => void;
    onApplyFilter: (startDate: string, endDate: string) => void;
}


export function FilterMenu({ startDate, endDate, setStartDate, setEndDate, closeDialog, onApplyFilter }: FilterMenuProps) {

    const [dateError, setDateError] = useState("");

    function clearDates() {
        setStartDate("");
        setEndDate("");
        setDateError("");
    }

    function closeMenu() {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (end < start) {
                setDateError("A data final deve ser igual ou posterior à data inicial.");
            } else {
                setDateError("");
                closeDialog();
            }
        } else {
            setDateError("");
        }
    }

    const isInvalid = dateError !== "";



    return (
        <div className="flex items-center justify-center w-full text-black">
            <div className="w-full max-w-2xl max-h-[600px] rounded-md bg-white p-4 overflow-y-auto">

                <div className="flex flex-col sm:flex-row justify-between gap-6 mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm font-medium mb-1">Data inicial:</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />

                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm font-medium mb-1">Data final:</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-4 gap-2 w-1/2 ml-auto mb-4">
                    <Button
                        className="text-white bg-gray-600 hover:bg-gray-600/80 cursor-pointer w-1/3"
                        onClick={clearDates}>Limpar</Button>
                    <Button
                        className="text-white hover:text-blue-500 cursor-pointer w-2/3"
                        onClick={() => {
                            onApplyFilter(startDate, endDate);
                            closeMenu();
                        }}>Concluir
                    </Button>
                </div>

                <div className="text-center">
                    {isInvalid && (
                        <span className="text-red-600 text-sm mt-2">{dateError}</span>
                    )}
                </div>
            </div>
        </div>
    );
}