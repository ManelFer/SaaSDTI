
import { NovaOrdem } from "./acoesRapidasRefatorado/NovaOrdem";
import { CadastrarEquipamentoEstoque } from "./acoesRapidasRefatorado/CadastrarEquipamentoEstoque";
export function AcoesRapidasCard() {
  return (
    <div>
      <NovaOrdem />

      <CadastrarEquipamentoEstoque />
    </div>
  );
}
