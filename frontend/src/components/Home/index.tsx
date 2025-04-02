import { PoemForm } from "../PoemForm";
import { PoemList } from "../PoemList";

export function Home() {
    return(
        <div className="min-h-screen min-w-screen">
            <PoemForm />
            {/* <PoemList /> */}
        </div>
    )
}