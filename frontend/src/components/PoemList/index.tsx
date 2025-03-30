import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { mockPoems } from "./mock";

export function PoemList() {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center m-2 p-2">
            {mockPoems.map(poem => (
                <div key={poem.id} className='transition-transform transform hover:scale-101 hover:shadow-lg'>
                    <Card>
                        <CardHeader>
                            <CardTitle >{poem.title}</CardTitle>
                            <CardDescription>Poema escrito por: {poem.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre>{poem.content.split("\n").slice(0, 4).join("\n") + (poem.content.split("\n").length > 4 ? "..." : "")}</pre>

                            <div className="flex justify-end">
                                <button className="text-blue-500 hover:underline ">
                                    Ver mais
                                </button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            Poem escrito em: {poem.date}
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}