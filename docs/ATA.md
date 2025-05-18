Etapa 2 

**Lucas Brandão Guedes - Etapa 2**
Fui responsável por desenvolver os protocolos FTP e NFS, contudo antes de definirmos o que cada membro do grupo iria fazer, tentei fazer a criação do webserver na nuvem para familiarização com o sistema de virtualização EC2 da Amazon.
Após ter definido o que cada um teria que fazer, foquei no FTP Server, onde tive dificuldades para aprender a configurar por linhas de comando, tive também muita instabilidade no funcionamento, fazendo com que a comunicação entre o servidor cliente caisse. Este problema foi solucionado iniciando uma maquina virtual nova e começando a configuração do zero.
Para o protocolo NFS não foi tão dificil, mas configurações foram mais simples tanto no computador servidor como no cliente.
Praticamente não nos reunimos para atuar juntos o que prejudicou o desenvolvimento, mas no penultimo dia consegui me reuni por umas 5 horas com o Gabriel para preenchimento do documento, criação dos videos, e para nos ajudarmos nos detalhes das atividades de nossa competência.
Se caso não lembrar de preencher, ainda falta para o uultimo dia a edição dos videos para uni-los em um, e conferencia do documento para ajustes pontuais.

**Gabriel Amorim Santos Maia - Etapa 2**
Fui responsável pela configuração dos serviços de Active Directory, DHCP e DNS, seguindo as orientações da documentação do projeto GreenTECH. Durante a execução, enfrentei uma pequena dificuldade na configuração do Gateway, devido à ausência de um equipamento dedicado; entretanto, a situação foi corrigida ao configurar o servidor 192.168.2.254 como Gateway, separando-o do DNS, que permaneceu em 192.168.2.10.

Embora tenham ocorrido pequenos contratempos que limitaram minha participação direta em algumas reuniões, estive presente sempre que possível, prestando apoio contínuo à equipe. Auxiliei a colega Daniela na configuração do banco de dados e participei de chamadas de alinhamento do projeto com o Lucas.

Também fui responsável pela edição do vídeo de apresentação e pelo envio dos documentos correspondentes a esta etapa do projeto.

**Daniela Sofia Fernandes de Assis - Etapa 2**
Na etapa 2, eu criei o banco de dados no AWS Aurora, configurando-o de maneira adequada para a comunicação com outros serviços. Em seguida, criei uma instância EC2, que funcionará como o servidor de aplicação. Para garantir que a instância EC2 pudesse acessar o banco de dados, realizei a configuração necessária para permitir a comunicação entre eles. Após isso, acessei a instância EC2 remotamente e instalei o MySQL, conectando-a ao banco de dados RDS. Com isso, garanti que o servidor e o banco de dados estivessem integrados e prontos para as próximas etapas do projeto.

A experiência foi desafiadora, com muitos erros e acertos ao longo do processo. Para superar as dificuldades, busquei tutoriais no YouTube, estudei o conteúdo no Canvas da PUC, recorri às IAs e assisti as aulas extras. Além disso, a ajuda dos meus colegas foi fundamental para tornar o processo mais fácil e facilitar a resolução dos problemas que surgiram.

**João**
Na etapa 2 ajudei a configurar o AD e o GPO. Criando domínios e e configurando as políticas para determinados grupos. Também configurei um server DHCP em linux Ubuntu, uma implementação não tão completa com todos os ranges como a do Gabriel.

**Tales Hein**
Configurei o servidor HTTP em uma instância EC2 na AWS usando Nginx e docker para o deploy. Também escrevi a documentação expondo como foi feito o setup e o vídeo que demonstra como isso foi feito.

______________________________________________________________________________________________________________________________________________________________________________________________________________________________

Etapa 3 
**Gabriel Amorim Santos Maia - Etapa 3**

Durante esta etapa do projeto, fui responsável pela configuração e implementação do Zabbix Server em ambiente AWS (EC2) e configuração do Zabbix-Agent na VM Servidor Active Directoru, garantindo sua correta comunicação com os demais Hosts criados em máquinas virtuais (VMs) pelos demais integrantes do grupo. A criação e disponibilização desses Hosts para integração ao ambiente de monitoramento foi definida como responsabilidade individual de cada membro do grupo. Cada integrante ficou encarregado de configurar seu ambiente para estabelecer comunicação com o servidor Zabbix.

Mantive-me disponível durante todo o processo para prestar suporte técnico, orientações e esclarecimentos de dúvidas relacionadas à configuração dos agentes Zabbix e integração dos Hosts.

Atuei diretamente na criação do ambiente de visualização de monitoramento, realizando a integração com o Grafana para desenvolvimento de dashboards personalizados, As ações tomadas seguiram o plano definido em reunião com o professor orientador do projeto.
