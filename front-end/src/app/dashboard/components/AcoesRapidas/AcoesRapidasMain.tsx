import { Card } from "@/components/ui/card";
import { AcoesRapidasText } from "./_components/AcoesRapidasText";
import { AcoesRapidasCard } from "./_components/AcoesRapidasCard";

export function AcoesRapidasMain() {
    return (
        <div className="">
            <Card className="p-6 bg-white shadow-md rounded-lg">
                <AcoesRapidasText />
                <AcoesRapidasCard />
            </Card>
        </div>
    )
}
