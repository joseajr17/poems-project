import { FaArrowDownAZ, FaArrowUpAZ } from "react-icons/fa6";
import { CgOptions } from "react-icons/cg";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FilterMenu } from "../FilterMenu";

type PoemListHeaderProps = {
  isAdmin: boolean;
  ordemCrescente: boolean;
  setOrdemCrescente: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  getFilteredPoems: (start: string, end: string) => void;
};

export function PoemListHeader({
  isAdmin,
  ordemCrescente,
  setOrdemCrescente,
  open,
  setOpen,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  getFilteredPoems,
}: PoemListHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative w-full ">
      
      {/* className="text-center sm:text-left text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100 w-full" */}
      {/* className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100" */}
      <h1 className="text-center sm:text-left text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        {isAdmin ? "Gerenciador de Poemas" : "Galeria de Poemas"}
      </h1>

      <div className="ml-auto">
        {/* Segunda DIV */}
        <div className="flex justify-end w-full ">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="az-asc"
                checked={ordemCrescente}
                onChange={(e) => setOrdemCrescente(e.target.checked)}
                className="hidden peer"
              />
              <label
                htmlFor="az-asc"
                className={`cursor-pointer px-4 py-2 rounded-md transition ${ordemCrescente
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
                  }`}
              >
                <FaArrowDownAZ />
              </label>

              <input
                type="checkbox"
                id="az-desc"
                checked={!ordemCrescente}
                onChange={(e) => setOrdemCrescente(!e.target.checked)}
                className="hidden peer"
              />
              <label
                htmlFor="az-desc"
                className={`cursor-pointer px-4 py-2 rounded-md transition ${!ordemCrescente
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
                  }`}
              >
                <FaArrowUpAZ />
              </label>
            </div>

            <Dialog
              open={open}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setStartDate("");
                  setEndDate("");
                }
                setOpen(isOpen);
              }}
            >
              <DialogTrigger asChild>
                <Button className="text-white hover:text-blue-500 cursor-pointer">
                  <CgOptions /> Filtros
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[455px]">
                <DialogTitle>Filtros de Poema</DialogTitle>
                <DialogDescription>Use filtros para encontrar poemas.</DialogDescription>

                <FilterMenu
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  closeDialog={() => setOpen(false)}
                  onApplyFilter={(startDate, endDate) => getFilteredPoems(startDate, endDate)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}