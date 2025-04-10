import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Form() {
    return (
        <div className='grid grid-cols-2 gap-6 py-4'>
            {/* Left Column */}
            <div className='space-y-4'>
                {/* Nome do equipamento */}
                <div className='space-y-2'>
                    <Label htmlFor='equipamento'>Nome do equipamento:</Label>
                    <Input id='equipamento' placeholder='Nome do equipamento' />
                </div>

                {/* Marca */}
                <div className='space-y-2'>
                    <Label htmlFor='marca'>Marca:</Label>
                    <Input id='marca' placeholder='Marca do equipamento' />
                </div>

                {/* Modelo */}
                <div className='space-y-2'>
                    <Label htmlFor='modelo'>Modelo:</Label>
                    <Input id='modelo' placeholder='Modelo do equipamento' />
                </div>
            </div>

            {/* Right Column */}
            <div className='space-y-4'>
                {/* Número de série */}
                <div className='space-y-2'>
                    <Label htmlFor='numero-serie'>Número de série:</Label>
                    <Input id='numero-serie' placeholder='Número de série do equipamento' />
                </div>

                {/*Patrimônio*/}
                <div className='space-y-2'>
                    <Label htmlFor='patrimonio'>Patrimônio:</Label>
                    <Input id='patrimonio' placeholder='Patrimônio do equipamento' />
                </div>

                {/* Lote */}
                <div className='space-y-2'>
                    <Label htmlFor='lote'>Lote:</Label>
                    <Input id='lote' placeholder='Lote do equipamento' />
                </div>
            </div>
        </div>
    )
}