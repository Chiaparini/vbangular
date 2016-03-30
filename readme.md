Vendra Books Front-End
Aplicação construida com a utilização de AngularJs.

Certifique-se de possuir "node.js" instalado em sua máquina, bem como o npm, pequeno gafanhoto. Você ira utilizar esses dois durante muuuito tempo!

Certifique-se também de possuir o BOWER, o bower é outro gerenciador de dependencias (packages) run 'npm install -g bower'

A pasta 'src' é aonde voce vai passar sua vida, então la voce vai encontrar uma estrutura base de como organizar os arquivos!

Preste atenção no arquivo ROUTES para inserir as views.

##LUMEN##

Antes de tudo, certifique-se de estar rodando o serviço do Diego para fazer as requests!!!

Clona ele, roda o 'composer install', e depois
'php artisan migrate'
 > php -S localhost:8888 -t public

##ATENÇÃO ->##

run 'npm install lite-server -g'

DICA: pode rodar um comandinho "npm -v" ou "node -v", para verificar as versões dos mesmos caso você não possua, o console mostrara um erro.

1-Step -> run 'npm install'

2-Step -> run 'bower install'

3-Step -> run 'gulp'

4-Step -> run 'lite-server'

>>>> TODA VEZ QUE ALTERAR UM ARQUIVO JS, HTML, CSS Rode o gulp denovo! Para ele gerar os arquivos para a pasta DIST!
(ENQUANTO O WATCH NAO ESTA PRONTO)


Pronto seu bananinha, agora você tem o client-side rodando localmente na sua máquina. Provavelmente em algum endereço local, o console ira te exibir e talvez abrira uma janela no seu navegador padrão.

##DEPENDENCIAS##

Preste atenção no seu package.json e bower.json, nesses arquivos, você contem as dependencias do seu projeto ou seja, as libs que ele utiliza, então verifique eles sempre, e sempre que for instalar uma dependencia nova 'npm install #dependencyname' use o prefixo --save para salvar no package.json e no bower.json automatico. e.g 'npm install angular-messages --save'
