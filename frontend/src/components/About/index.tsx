import severinoImg1 from './severinoImg1.jpg';
import severinoImg2 from './severinoImg2.jpg';
import severinoImg3 from './severinoImg3.jpg';

export function About() {

    return (
        <section id="about" className="flex flex-col gap-4 w-full border h-full p-10">
            <div className="flex flex-col items-center gap-2">
                <h1 className='text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100'>Conheça um pouco sobre a história do Poeta</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
                <div className='flex items-stretch max-w-4xl gap-5'>
                    <img src={severinoImg1} className='w-[229px] h-[280px] object-cover rounded-lg max-h-[280px] transition-transform duration-300 hover:scale-110 hover:shadow-2xl'></img>
                    <p className='flex-1 text-justify leading-relaxed text-lg'>
                        Severino Cavalcanti de Albuquerque nasceu em 27 de novembro de 1926, em Remígio, Paraíba. Desde cedo demonstrou interesse pelos
                        estudos e destacou-se na escola, chegando a surpreender uma professora comunitária com seu nível avançado de leitura e matemática.
                        Seu contato com a poesia surgiu através de jornais e revistas velhas recolhidos por seus primos. Encantado com os poemas, passou a
                        recortá-los, decorá-los e declamá-los, despertando, aos dez anos, o dom de compor versos próprios — talento que cultivou ao longo
                        da vida, mesmo após perder a visão quase por completo.
                    </p>
                </div>
                <div className='flex items-stretch max-w-4xl gap-5'>
                    <p className='flex-1 text-justify leading-relaxed text-lg'>
                        Foi também uma figura ativa na vida política do município: atuou como vereador, presidente da Câmara e vice-prefeito entre 1977 
                        e 1983, filiado à UDN e, posteriormente, à ARENA-2. Participava das tradicionais cantorias de viola nos novenários, improvisando 
                        poemas em estilos como repente e martelo agalopado. No campo religioso, envolveu-se desde jovem com movimentos da Igreja Católica, 
                        como a Congregação Mariana, onde conheceu Maria Benevenuto, com quem se casou em 12 de fevereiro de 1951.
                    </p>
                    <img src={severinoImg2} className='w-[229px] h-[250px] object-cover rounded-lg max-h-[250px] transition-transform duration-300 hover:scale-110 hover:shadow-2xl'></img>
                </div>
                <div className='flex items-stretch max-w-4xl gap-5'>
                    <img src={severinoImg3} className='w-[460px] h-[250px] object-cover rounded-lg max-h-[250px] transition-transform duration-300 hover:scale-105 hover:shadow-2xl'></img>
                    <p className='flex-1 text-justify leading-relaxed text-lg'>
                        O casal teve 14 filhos, sendo que os quatro primeiros faleceram pouco após o nascimento.
                        São eles: Maria de Fátima, Maria Violeta, Severina de Lourdes, Manoel da Madre de Deus, Luiz Arcanjo, Lucia, Lucila do Patrocínio,
                        Maria Lucione, Licínia, Leonardo, Euzébio, Maria Aparecida, Lenira e Elizabeth Eva.
                    </p>
                </div>


                <div className="mt-10 text-center">
                    <p className="text-gray-700 text-lg">
                        Para saber mais sobre a história do Poeta, acesse
                        <a
                            href="https://dspace.bc.uepb.edu.br/jspui/handle/123456789/15119"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 font-semibold hover:text-sky-800 transition-colors">
                            {" "}este link
                        </a>, que contém o TCC de sua neta, intitulado</p>
                    <p className="text-gray-700 text-lg italic"> "Remígio, memórias e estórias contadas em poesia por Severino Cavalcanti de Albuquerque"</p>.
                </div>

            </div>
        </section>
    );
}